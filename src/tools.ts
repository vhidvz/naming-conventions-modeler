import { NamingConvention } from './modeler';

export function convention(name: NamingConvention): {
  to: (str: string) => string;
  is: (str: string) => boolean;
} {
  let to: (str: string) => string;
  let is: (str: string) => boolean;

  switch (name) {
    case 'snake_case':
      to = toSnakeCase;
      is = isSnakeCase;
      break;
    case 'camelCase':
      to = toCamelCase;
      is = isCamelCase;
      break;
    case 'PascalCase':
      to = toPascalCase;
      is = isPascalCase;
      break;
    case 'kebab-case':
      to = toKebabCase;
      is = isKebabCase;
      break;
    case 'MACRO_CASE':
      to = toMacroCase;
      is = isMacroCase;
      break;
    case 'no case':
      to = toNoCase;
      is = isNoCase;
      break;

    default:
      throw new Error('Naming convention is not defined');
  }

  return { to, is };
}

export function toNoCase(str: string): string {
  return str
    .replace(/[A-Z][a-z]+/g, (m) => ' ' + m)
    .replace(/[A-Z][A-Z]+/g, (m) => ' ' + m)
    .replace(/[\s-_]+/g, ' ')
    .toLowerCase()
    .trim();
}

export function isNoCase(str: string): boolean {
  return toNoCase(str) === str;
}

export function toSnakeCase(str: string): string {
  return toNoCase(str).replace(/\s+/g, '_');
}

export function isSnakeCase(str: string): boolean {
  return toSnakeCase(str) === str;
}

export function toCamelCase(str: string): string {
  return toNoCase(str)
    .replace(/[^\w][a-z]/g, (m) => m.toUpperCase())
    .replace(/\s+/g, '');
}

export function isCamelCase(str: string): boolean {
  return toCamelCase(str) === str;
}

export function toPascalCase(str: string): string {
  return (' ' + toNoCase(str)).replace(/[^\w][a-z]/g, (m) => m.toUpperCase()).replace(/\s+/g, '');
}

export function isPascalCase(str: string): boolean {
  return toPascalCase(str) === str;
}

export function toMacroCase(str: string): string {
  return toNoCase(str)
    .replace(/[a-z]+/g, (m) => m.toUpperCase())
    .replace(/\s+/g, '_');
}

export function isMacroCase(str: string): boolean {
  return toMacroCase(str) === str;
}

export function toKebabCase(str: string): string {
  return toNoCase(str).replace(/\s+/g, '-');
}

export function isKebabCase(str: string): boolean {
  return toKebabCase(str) === str;
}
