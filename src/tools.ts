import { NamingConvention } from './modeler';

/**
 * It takes a naming convention and returns an object with two functions: `to` and `is`
 *
 * @param {NamingConvention} name - NamingConvention
 *
 * @returns An object with two properties: to and is.
 */
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

/**
 * It replaces all capital letters with a space and the capital letter, replaces all capital letter
 * sequences with a space and the capital letter sequence, replaces all spaces, underscores, and
 * hyphens with a space, converts the string to lowercase, and trims the string
 *
 * @param {string} str - The string to convert.
 *
 * @returns A string with no case.
 */
export function toNoCase(str: string): string {
  return str
    .replace(/[A-Z][a-z]+/g, (m) => ' ' + m)
    .replace(/[A-Z][A-Z]+/g, (m) => ' ' + m)
    .replace(/[\s-_]+/g, ' ')
    .toLowerCase()
    .trim();
}

/**
 * If the string is already in no case, return true, otherwise return false.
 *
 * @param {string} str - The string to check.
 *
 * @returns A boolean value.
 */
export function isNoCase(str: string): boolean {
  return toNoCase(str) === str;
}

/**
 * It converts a string to snake case by converting it to no case and replacing all spaces with
 * underscores
 *
 * @param {string} str - The string to convert.
 *
 * @returns A function that takes a string and returns a string with all the spaces replaced with
 * underscores.
 */
export function toSnakeCase(str: string): string {
  return toNoCase(str).replace(/\s+/g, '_');
}

/**
 * If the string is already in snake case, then return true.
 *
 * @param {string} str - The string to check.
 *
 * @returns A boolean value.
 */
export function isSnakeCase(str: string): boolean {
  return toSnakeCase(str) === str;
}

/**
 * Replace all non-word characters with a space, then replace all spaces with nothing, then replace all
 * lowercase letters that follow a non-word character with an uppercase letter, then replace all spaces
 * with nothing.
 *
 * @param {string} str - The string to convert.
 *
 * @returns A string with the first letter capitalized.
 */
export function toCamelCase(str: string): string {
  return toNoCase(str)
    .replace(/[^\w][a-z]/g, (m) => m.toUpperCase())
    .replace(/\s+/g, '');
}

/**
 * If the string is already camelCase, then return true, otherwise return false.
 *
 * @param {string} str - The string to check.
 *
 * @returns A boolean value.
 */
export function isCamelCase(str: string): boolean {
  return toCamelCase(str) === str;
}

/**
 * Convert a string to pascal case.
 *
 * @param {string} str - The string to convert to PascalCase.
 *
 * @returns A string with the first letter capitalized.
 */
export function toPascalCase(str: string): string {
  return (' ' + toNoCase(str)).replace(/[^\w][a-z]/g, (m) => m.toUpperCase()).replace(/\s+/g, '');
}

/**
 * It returns true if the string is already in PascalCase
 *
 * @param {string} str - The string to check.
 *
 * @returns A boolean value.
 */
export function isPascalCase(str: string): boolean {
  return toPascalCase(str) === str;
}

/**
 * It converts a string to a macro case string
 *
 * @param {string} str - The string to convert.
 *
 * @returns A string with all lowercase letters and spaces replaced with underscores.
 */
export function toMacroCase(str: string): string {
  return toNoCase(str)
    .replace(/[a-z]+/g, (m) => m.toUpperCase())
    .replace(/\s+/g, '_');
}

/**
 * Convert a string to MacroCase, and return true if the result is the same as the input.
 *
 * @param {string} str - The string to convert to MacroCase.
 *
 * @returns A boolean value.
 */
export function isMacroCase(str: string): boolean {
  return toMacroCase(str) === str;
}

/**
 * It takes a string, converts it to no case, and replaces all spaces with dashes
 *
 * @param {string} str - The string to convert.
 *
 * @returns A function that takes a string and returns a string.
 */
export function toKebabCase(str: string): string {
  return toNoCase(str).replace(/\s+/g, '-');
}

/**
 * It returns true if the input string is already in kebab case
 *
 * @param {string} str - The string to check.
 *
 * @returns true
 */
export function isKebabCase(str: string): boolean {
  return toKebabCase(str) === str;
}
