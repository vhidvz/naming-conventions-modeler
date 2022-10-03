import { toMacroCase } from '../src';

const strings = [
  'RegExr',
  'PCRE',
  'JavaScript',
  'JSProgrammingLanguage',
  'OTP',
  'camelCase',
  '_id',
  'ID',
  'iD',
  'id',
  'Id',
  '0123',
  '_-$#@',
];

describe('test hello function', () => {
  it("should return 'Hello World...!'", () => {
    for (const str of strings) {
      console.log(toMacroCase(str));
    }
  });
});
