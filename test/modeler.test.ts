import { Modeler } from '../src';

const obj = {
  _id: 123,
  test_value: 'test value',
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
};

type camelObj = {
  id: number;
  testValue: string;
  data: {
    id: number;
    testValue: string;
  };
  items: [
    {
      id: number;
      testValue: string;
    },
  ];
};

describe('test hello function', () => {
  it('should return camelCase', () => {
    const model = Modeler.build<camelObj>(obj, 'camelCase');

    Modeler.convert(model); // is not necessary

    expect(model.id).toBe(123);
    expect(model.testValue).toBe('test value');

    expect(model.data.id).toBe(456);
    expect(model.data.testValue).toBe('456');

    expect(model.items).toStrictEqual([
      {
        id: model.items[0].id,
        testValue: model.items[0].testValue,
      },
    ]);
  });
});
