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
  it('getting camelCase value', () => {
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

  it('setting camelCase value', () => {
    const model = Modeler.build(obj, 'camelCase');

    model.NO_name = 'no name';
    model.NO_VALUE = 'no value';
    model.camelCase = 'camelCase';

    expect(model.noName).toBe('no name');
    expect(model.noValue).toBe('no value');
    expect(model.camelCase).toBe('camelCase');
  });

  it('should skip null as args and return null', () => {
    const model = Modeler.build(null, 'camelCase');

    expect(model).toBeNull();
  });
});
