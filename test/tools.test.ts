import { convention } from '../src';

const strings = [
  'RegExr',
  'PCRE',
  'JavaScript',
  'JSProgrammingLanguage',
  'OTP',
  '__meta__',
  'camelCase',
  '_id',
  'ID',
  'iD',
  'id',
  'Id',
  '0123',
  '_-$#@',
];

describe('test functions', () => {
  it('should return no case', () => {
    const noCase = convention('no case');
    const result = strings.map(noCase.to);

    expect(result).toEqual([
      'Reg Exr',
      'PCRE',
      'Java Script',
      'JS Programming Language',
      'OTP',
      'meta',
      'camel Case',
      'id',
      'ID',
      'iD',
      'id',
      'Id',
      '0123',
      '$#@',
    ]);

    const check = result.map(noCase.is).every((i) => i === true);
    expect(check).toBeTruthy();
  });

  it('should return snake_case', () => {
    const snakeCase = convention('snake_case');
    const result = strings.map(snakeCase.to);

    expect(result).toEqual([
      'reg_exr',
      'pcre',
      'java_script',
      'js_programming_language',
      'otp',
      'meta',
      'camel_case',
      'id',
      'id',
      'id',
      'id',
      'id',
      '0123',
      '$#@',
    ]);

    const check = result.map(snakeCase.is).every((i) => i === true);
    expect(check).toBeTruthy();
  });

  it('should return camelCase', () => {
    const camelCase = convention('camelCase');
    const result = strings.map(camelCase.to);

    expect(result).toEqual([
      'regExr',
      'pcre',
      'javaScript',
      'jsProgrammingLanguage',
      'otp',
      'meta',
      'camelCase',
      'id',
      'id',
      'id',
      'id',
      'id',
      '0123',
      '$#@',
    ]);

    const check = result.map(camelCase.is).every((i) => i === true);
    expect(check).toBeTruthy();
  });

  it('should return PascalCase', () => {
    const pascalCase = convention('PascalCase');
    const result = strings.map(pascalCase.to);

    expect(result).toEqual([
      'RegExr',
      'PCRE',
      'JavaScript',
      'JSProgrammingLanguage',
      'OTP',
      'Meta',
      'CamelCase',
      'Id',
      'Id',
      'Id',
      'Id',
      'Id',
      '0123',
      '$#@',
    ]);

    const check = result.map(pascalCase.is).every((i) => i === true);
    expect(check).toBeTruthy();
  });

  it('should return kebab-case', () => {
    const kebabCase = convention('kebab-case');
    const result = strings.map(kebabCase.to);

    expect(result).toEqual([
      'reg-exr',
      'pcre',
      'java-script',
      'js-programming-language',
      'otp',
      'meta',
      'camel-case',
      'id',
      'id',
      'id',
      'id',
      'id',
      '0123',
      '$#@',
    ]);

    const check = result.map(kebabCase.is).every((i) => i === true);
    expect(check).toBeTruthy();
  });

  it('should return MACRO_CASE', () => {
    const macroCase = convention('MACRO_CASE');
    const result = strings.map(macroCase.to);

    expect(result).toEqual([
      'REG_EXR',
      'PCRE',
      'JAVA_SCRIPT',
      'JS_PROGRAMMING_LANGUAGE',
      'OTP',
      'META',
      'CAMEL_CASE',
      'ID',
      'ID',
      'ID',
      'ID',
      'ID',
      '0123',
      '$#@',
    ]);

    const check = result.map(macroCase.is).every((i) => i === true);
    expect(check).toBeTruthy();
  });
});
