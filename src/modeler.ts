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

const find = (
  target: { [x: string | symbol]: unknown },
  prop: string | symbol,
): { key: string | symbol; value: unknown | undefined } => {
  if (typeof prop === 'symbol') return { key: prop, value: target[prop] };
  if (target[prop]) return { key: prop, value: target[prop] };

  for (const c of [toSnakeCase, toCamelCase, toPascalCase, toMacroCase, toKebabCase, toNoCase]) {
    const property = { key: c(prop), value: target[c(prop)] };
    if (property.value) return property;
  }

  return { key: '', value: undefined };
};

const nested = (data: unknown, name: NamingConvention): unknown => {
  if (typeof data === 'object') {
    if (Array.isArray(data)) return data.map((val) => nested(val, name));
    else return build(data as object, name);
  } else return data;
};

const build = <T = unknown>(data: object, name: NamingConvention): T => {
  const $ = convention(name);
  return new Proxy(data, {
    set(obj: { [x: string | symbol]: unknown }, prop: string | symbol, value: unknown) {
      if (typeof prop === 'symbol') obj[prop] = value;
      else obj[$.to(prop)] = value;
      return true;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    get(target: { [x: string | symbol]: unknown }, prop: string | symbol, receiver: unknown) {
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
  static build<T = unknown>(data: object, name: NamingConvention): T {
    return nested(data, name) as T;
  }

  static convert(data: object) {
    JSON.stringify(data);
  }
}
