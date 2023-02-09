/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  convention,
  toCamelCase,
  toKebabCase,
  toMacroCase,
  toNoCase,
  toPascalCase,
  toSnakeCase,
  toFlatCase,
  toTrainCase,
  Convention,
} from './tools';

export type NamingConvention =
  | 'snake_case'
  | 'camelCase'
  | 'PascalCase'
  | 'kebab-case'
  | 'MACRO_CASE'
  | 'Train-Case'
  | 'flatcase'
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
  if (prop in target || '_' + prop in target) return { key: prop, value: target[prop] ?? target['_' + prop] };

  for (const c of [
    toSnakeCase,
    toCamelCase,
    toPascalCase,
    toMacroCase,
    toKebabCase,
    toFlatCase,
    toTrainCase,
    toNoCase,
  ]) {
    const property = { key: c(prop), value: target[c(prop)] ?? target['_' + c(prop)] };
    if (property.value) return property;
  }

  return { key: '', value: undefined };
};

/**
 * It takes an object and a convention, and returns a new object with the same keys, but with the
 * values transformed by the convention
 *
 * @param {any} data - any - The data to be converted.
 * @param {Convention} $ - Convention
 *
 * @returns A function that takes two arguments, data and $, and returns a nested object.
 */
const nested = (data: any, $: Convention): any => {
  if (!!data && typeof data === 'object') {
    if (Array.isArray(data)) return data.map((val) => nested(val, $));
    else return build(data as object, $);
  } else return data;
};

/**
 * It takes an object and a convention, and returns a new object that uses the convention to access its
 * properties
 *
 * @param {object} data - object - The object to be converted.
 * @param {Convention} $ - Convention
 *
 * @returns A Proxy object
 */
const build = <T = any>(data: object, $: Convention): T => {
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
        return nested(value, $);
      } else return value;
    },
  }) as T;
};

/**
 * It takes a JSON object and a lookup table, and returns a new JSON object with the keys in the lookup
 * table replaced with their corresponding values
 *
 * @param {any} data - The data to be translated.
 * @param table - The table of replacements.
 *
 * @returns A function that takes two arguments, data and table, and returns a new object.
 */
export const lookup = <T = any>(data: any, table: { [x: string]: string }): T => {
  let str = JSON.stringify(data);

  for (const key in table) {
    str = str.replace(new RegExp(`"${key}":`, 'g'), `"${table[key]}":`);
  }

  return JSON.parse(str) as T;
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
  static build<T = any>(data: any, name: NamingConvention): T {
    const $: Convention = convention(name);
    return nested(data, $) as T;
  }

  /**
   * It takes an convention model and converts all properties
   *
   * @param {object} data - The data to be converted.
   */
  static convert<T = any>(data: any): T {
    JSON.stringify(data);
    return data;
  }
}
