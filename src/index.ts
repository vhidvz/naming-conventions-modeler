export function toNoCase(str: string): string {
  return str
    .replace(/[A-Z][a-z]+/g, (m) => ' ' + m)
    .replace(/[A-Z][A-Z]+/g, (m) => ' ' + m)
    .replace(/[\s-_]+/g, ' ')
    .toLowerCase()
    .trim();
}

export function toSnakeCase(str: string): string {
  return toNoCase(str).replace(/\s/g, '_');
}

export function toCamelCase(str: string): string {
  return toNoCase(str)
    .replace(/[^\w][a-z]/g, (m) => m.toUpperCase())
    .replace(/\s/g, '');
}

export function toPascalCase(str: string): string {
  return toNoCase(' ' + str)
    .replace(/[^\w][a-z]/g, (m) => m.toUpperCase())
    .replace(/\s/g, '');
}

export function toMacroCase(str: string): string {
  return toNoCase(str)
    .replace(/[a-z]+/g, (m) => m.toUpperCase())
    .replace(/\s/g, '_');
}

export function toKebabCase(str: string): string {
  return toNoCase(str).replace(/\s/g, '-');
}
