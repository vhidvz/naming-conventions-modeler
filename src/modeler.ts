/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  convention,
  toCamelCase,
  toKebabCase,
  toMacroCase,
  toNoCase,
  toPascalCase,
  toSnakeCase,
} from './tools';

export type NamingConvention =
  | 'snake_case'
  | 'camelCase'
  | 'PascalCase'
  | 'kebab-case'
  | 'MACRO_CASE'
  | 'no case';

/**
 * It takes a target object and a property name, and returns the property name and value of the
 * property that matches the given property name
 *
 * @param target - The object to search for the property.
 * @param {string | symbol} prop - The property name to find.
 *
 * @returns An object with a key and value.
 */
const find = (
  target: { [x: string | symbol]: any },
  prop: string | symbol,
): { key: string | symbol; value: any | undefined } => {
  if (typeof prop === 'symbol') return { key: prop, value: target[prop] };
  if (target[prop]) return { key: prop, value: target[prop] };

  for (const c of [toSnakeCase, toCamelCase, toPascalCase, toMacroCase, toKebabCase, toNoCase]) {
    const property = { key: c(prop), value: target[c(prop)] ?? target['_' + c(prop)] ?? target['_' + prop] };
    if (property.value) return property;
  }

  return { key: '', value: undefined };
};

/**
 * It takes an object and a naming convention, and returns a new object with the keys renamed according
 * to the naming convention
 *
 * @param {any} data - any - The data to be converted.
 * @param {NamingConvention} name - The name of the object you want to convert.
 *
 * @returns A function that takes two arguments, data and name.
 */
const nested = (data: any, name: NamingConvention): any => {
  if (typeof data === 'object') {
    if (Array.isArray(data)) return data.map((val) => nested(val, name));
    else return build(data as object, name);
  } else return data;
};

/**
 * It takes an object and a naming convention and returns a new object with the same properties but
 * with the naming convention applied
 *
 * @param {object} data - object - The object you want to convert.
 * @param {NamingConvention} name - NamingConvention
 *
 * @returns A Proxy object
 */
const build = <T = any>(data: object, name: NamingConvention): T => {
  const $ = convention(name);
  return new Proxy(data, {
    set(obj: { [x: string | symbol]: any }, prop: string | symbol, value: any) {
      if (typeof prop === 'symbol') obj[prop] = value;
      else obj[$.to(prop)] = value;
      return true;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    get(target: { [x: string | symbol]: any }, prop: string | symbol, receiver: any) {
      const { key, value } = find(target, prop);

      if (typeof key === 'string' && value && !$.is(key)) {
        delete target[key];
        target[$.to(key)] = value;
      }

      if (typeof value === 'object') {
        return nested(value, name);
      } else return value;
    },
  }) as T;
};

export class Modeler {
  /**
   * It takes an object and a naming convention and returns a new object with the same properties but
   * with the naming convention applied
   *
   * @param {object} data - The data object that you want to convert.
   * @param {NamingConvention} name - NamingConvention
   *
   * @returns The return value is the result of the nested function.
   */
  static build<T = any>(data: object, name: NamingConvention): T {
    return nested(data, name) as T;
  }

  /**
   * It takes an convention model and converts all properties
   *
   * @param {object} data - The data to be converted.
   */
  static convert(data: object) {
    JSON.stringify(data);
  }
}
