# Naming Conventions Modeler

[![npm](https://img.shields.io/npm/v/naming-conventions-modeler)](https://www.npmjs.com/package/naming-conventions-modeler)
[![Coverage](https://raw.githubusercontent.com/vhidvz/naming-conventions-modeler/master/coverage-badge.svg)](https://htmlpreview.github.io/?https://github.com/vhidvz/naming-conventions-modeler/blob/master/docs/coverage/lcov-report/index.html)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/vhidvz/naming-conventions-modeler)
![npm](https://img.shields.io/npm/dm/naming-conventions-modeler)
![node-current](https://img.shields.io/node/v/naming-conventions-modeler)
[![GitHub](https://img.shields.io/github/license/vhidvz/naming-conventions-modeler?style=flat)](https://vhidvz.github.io/naming-conventions-modeler/)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-nodejs-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Gitter](https://badges.gitter.im/npm-naming-conventions-modeler/community.svg)](https://gitter.im/npm-naming-conventions-modeler/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![documentation](https://img.shields.io/badge/documentation-click_to_read-c27cf4)](https://vhidvz.github.io/naming-conventions-modeler/)
[![Build, Test and Publish](https://github.com/vhidvz/naming-conventions-modeler/actions/workflows/npm-ci.yml/badge.svg)](https://github.com/vhidvz/naming-conventions-modeler/actions/workflows/npm-ci.yml)

Simple and Fast naming conventions modeler implemented with ```Proxy```, zero dependencies.

## Quick Start Guide

```sh
npm install --save naming-conventions-modeler
```

### Modeler

```ts
import { Modeler } from 'naming-conventions-modeler';


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

const model = Modeler.build<camelObj>(obj, 'camelCase');

console.log(model.id) // 123
console.log(model.testValue) // test value
console.log(model.TestValue) // test value

console.log(model.data.id) // 456
console.log(model.data.testValue) // 456
console.log(model.items[0].id) // 789
console.log(model.items[0].testValue) // 789

Modeler.convert(model);

console.log(model);
`[
  {
    "data": {
      "id": 456,
      "testValue": "456"
    },
    "items": [
      {
        "id": 789,
        "testValue": "789"
      }
    ],
    "id": 123,
    "testValue": "test value",
    "proto": {} // TODO: this property not exist
  }
]`

```

### Tools

```ts
import { convention, toSnakeCase, isSnakeCase } from 'naming-conventions-modeler';

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

const camelCase = convention('camelCase');

console.log(strings.map(camelCase.to));
`[
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
]`

console.log(strings.map(toSnakeCase));
`[
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
]`

console.log(isSnakeCase(toSnakeCase(strings[0]))) // true

```

## License

[MIT](https://github.com/vhidvz/naming-conventions-modeler/blob/master/LICENSE)
