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
  return toNoCase(str).replace(/\s/g, '_');
}

export function isSnakeCase(str: string): boolean {
  return toSnakeCase(str) === str;
}

export function toCamelCase(str: string): string {
  return toNoCase(str)
    .replace(/[^\w][a-z]/g, (m) => m.toUpperCase())
    .replace(/\s/g, '');
}

export function isCamelCase(str: string): boolean {
  return toCamelCase(str) === str;
}

export function toPascalCase(str: string): string {
  return toNoCase(' ' + str)
    .replace(/[^\w][a-z]/g, (m) => m.toUpperCase())
    .replace(/\s/g, '');
}

export function isPascalCase(str: string): boolean {
  return toPascalCase(str) === str;
}

export function toMacroCase(str: string): string {
  return toNoCase(str)
    .replace(/[a-z]+/g, (m) => m.toUpperCase())
    .replace(/\s/g, '_');
}

export function isMacroCase(str: string): boolean {
  return toMacroCase(str) === str;
}

export function toKebabCase(str: string): string {
  return toNoCase(str).replace(/\s/g, '-');
}

export function isKebabCase(str: string): boolean {
  return toKebabCase(str) === str;
}
