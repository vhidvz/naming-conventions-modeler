import { toMacroCase, Modeler } from '../src';

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

const obj = {
  _id: '123',
  test_value: 123,
  data: {
    _id: '456',
    test_value: 456,
  },
  items: [
    {
      _id: '789',
      test_value: 789,
    },
  ],
};

describe('test hello function', () => {
  it("should return 'Hello World...!'", () => {
    const model = Modeler.build<any>(obj, 'camelCase');

    const data = model.data;
    const items = model.items;

    console.log(data);
    console.log(data);

    console.log(JSON.stringify(data, null, 2));
    console.log(JSON.stringify(data, null, 2));

    console.log(items);
    console.log(JSON.stringify(items, null, 2));

    console.log(items);
    console.log(JSON.stringify(items, null, 2));
  });
});
