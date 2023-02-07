import { Modeler, lookup } from './modeler';

export * from './tools';
export * from './modeler';

let obj = {
  _id: 123,
  TestValue: 'test value',
  data: {
    _id: 456,
    test_value: '456',
  },
  items: [
    {
      _id: 789,
      test_value: '789',
    },
  ],
  __meata__: 'metadata',
};

type camelObj = {
  // type safety support
  id: number;
  testValue: string;
  data: {
    id: number;
    testValue: string;
    [x: string]: any;
  };
  items: [
    {
      id: number;
      testValue: string;
    },
  ];
  meta: string;
  [x: string]: any;
};

// Replace misspell keys by regex
obj = lookup(obj, { '__me.*ta__': '__meta__' });

const model = Modeler.build<camelObj>(obj, 'camelCase');

console.log(model.id); // 123

console.log(model.testValue); // test value
console.log(model.TestValue); // test value

console.log(model.data.id); // 456
console.log(model.items[0].testValue); // 789

// Set value dynamically
model.NO_name = 'no name';
model.NO_VALUE = 'no value';

console.log(model.noName); // no name
console.log(model.noValue); // no value

/**
 * It takes an convention model and converts all properties at once
 */
Modeler.convert(model);

console.log(model);
/**
 * {
 *   data: { id: 456, testValue: '456' },
 *   items: [ { testValue: '789', id: 789 } ],
 *   testValue: 'test value',
 *   noName: 'no name',
 *   noValue: 'no value',
 *   id: 123,
 *   meta: 'metadata'
 * }
 */
