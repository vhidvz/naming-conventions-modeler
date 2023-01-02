import { NamingConvention, convention } from '../src';

const strings = [
  'RegExr',
  'PCRE',
  'JavaScript',
  'JSProgrammingLanguage',
  'OTP',
  'Train-Case',
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
  it('should throw error', () => {
    expect(() => convention('pothole_case' as NamingConvention)).toThrowError();
  });

  it('should return no case', () => {
    const noCase = convention('no case');
    const result = strings.map(noCase.to);

    expect(result).toEqual([
      'Reg Exr',
      'PCRE',
      'Java Script',
      'JS Programming Language',
      'OTP',
      'Train Case',
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
      'train_case',
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
      'trainCase',
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
      'TrainCase',
      'Meta',
      'CamelCase',
      'Id',
      'ID',
      'ID',
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
      'train-case',
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
      'TRAIN_CASE',
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

  it('should return Train-Case', () => {
    const trainCase = convention('Train-Case');
    const result = strings.map(trainCase.to);

    expect(result).toEqual([
      'Reg-Exr',
      'PCRE',
      'Java-Script',
      'JS-Programming-Language',
      'OTP',
      'Train-Case',
      'Meta',
      'Camel-Case',
      'Id',
      'ID',
      'ID',
      'Id',
      'Id',
      '0123',
      '$#@',
    ]);

    const check = result.map(trainCase.is).every((i) => i === true);
    expect(check).toBeTruthy();
  });

  it('should return flatcase', () => {
    const flatCase = convention('flatcase');
    const result = strings.map(flatCase.to);

    expect(result).toEqual([
      'regexr',
      'pcre',
      'javascript',
      'jsprogramminglanguage',
      'otp',
      'traincase',
      'meta',
      'camelcase',
      'id',
      'id',
      'id',
      'id',
      'id',
      '0123',
      '$#@',
    ]);

    const check = result.map(flatCase.is).every((i) => i === true);
    expect(check).toBeTruthy();
  });
});
