# Naming Conventions Modeler

[![npm](https://img.shields.io/npm/v/naming-conventions-modeler)](https://www.npmjs.com/package/naming-conventions-modeler)
[![Coverage](https://raw.githubusercontent.com/vhidvz/naming-conventions-modeler/master/coverage-badge.svg)](https://htmlpreview.github.io/?https://github.com/vhidvz/naming-conventions-modeler/blob/master/docs/coverage/lcov-report/index.html)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/vhidvz/naming-conventions-modeler)
![npm](https://img.shields.io/npm/dm/naming-conventions-modeler)
![node-current](https://img.shields.io/node/v/naming-conventions-modeler)
[![GitHub](https://img.shields.io/github/license/vhidvz/naming-conventions-modeler?style=flat)](https://vhidvz.github.io/naming-conventions-modeler/)
[![semantic-release: angular](https://img.shields.io/badge/semantic--release-nodejs-e10079?logo=semantic-release)](https://github.com/semantic-release/semantic-release)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Gitter](https://badges.gitter.im/naming-conventions-modeler-npm/community.svg)](https://gitter.im/naming-conventions-modeler-npm/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![documentation](https://img.shields.io/badge/documentation-click_to_read-c27cf4)](https://vhidvz.github.io/naming-conventions-modeler/)
[![Build, Test and Publish](https://github.com/vhidvz/naming-conventions-modeler/actions/workflows/npm-ci.yml/badge.svg)](https://github.com/vhidvz/naming-conventions-modeler/actions/workflows/npm-ci.yml)

Simple and Fast `TypeSafe` naming conventions modeler implemented with `Proxy`; zero dependency.

## Quick Start Guide

```sh
npm install --save naming-conventions-modeler
```

| **Original**              | **snake_case**          | **camelCase**         | **PascalCase**        | **kebab-case**          | **MACRO_CASE**          | **Train-Case**          | **flatcase**          | **no case**             |
| ------------------------- | ----------------------- | --------------------- | --------------------- | ----------------------- | ----------------------- | ----------------------- | --------------------- | ----------------------- |
| **RegExr**                | reg_exr                 | regExr                | RegExr                | reg-exr                 | REG_EXR                 | Reg-Exr                 | regexr                | Reg Exr                 |
| **PCRE**                  | pcre                    | pcre                  | PCRE                  | pcre                    | PCRE                    | PCRE                    | pcre                  | PCRE                    |
| **JavaScript**            | java_script             | javaScript            | JavaScript            | java-script             | JAVA_SCRIPT             | Java-Script             | javascript            | Java Script             |
| **JSProgrammingLanguage** | js_programming_language | jsProgrammingLanguage | JSProgrammingLanguage | js-programming-language | JS_PROGRAMMING_LANGUAGE | JS-Programming-Language | jsprogramminglanguage | JS Programming Language |
| **OTP**                   | otp                     | otp                   | OTP                   | otp                     | OTP                     | OTP                     | otp                   | OTP                     |
| **Train-Case**            | train_case              | trainCase             | TrainCase             | train-case              | TRAIN_CASE              | Train-Case              | traincase             | Train Case              |
| **\_\_meta\_\_**          | meta                    | meta                  | Meta                  | meta                    | META                    | Meta                    | meta                  | meta                    |
| **camelCase**             | camel_case              | camelCase             | CamelCase             | camel-case              | CAMEL_CASE              | Camel-Case              | camelcase             | camel Case              |
| **\_id**                  | id                      | id                    | Id                    | id                      | ID                      | Id                      | id                    | id                      |
| **ID**                    | id                      | id                    | ID                    | id                      | ID                      | ID                      | id                    | ID                      |
| **iD**                    | id                      | id                    | ID                    | id                      | ID                      | ID                      | id                    | iD                      |
| **id**                    | id                      | id                    | Id                    | id                      | ID                      | Id                      | id                    | id                      |
| **Id**                    | id                      | id                    | Id                    | id                      | ID                      | Id                      | id                    | Id                      |
| **0123**                  | 0123                    | 0123                  | 0123                  | 0123                    | 0123                    | 0123                    | 0123                  | 0123                    |
| **\_-$#@**                | $#@                     | $#@                   | $#@                   | $#@                     | $#@                     | $#@                     | $#@                   | $#@                     |

### Modeler

```ts
import { Modeler, lookup } from 'naming-conventions-modeler';

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
```

### Tools

```ts
import { convention, toSnakeCase, isSnakeCase } from 'naming-conventions-modeler';

const str = 'JSProgrammingLanguage';

const camelCase = convention('camelCase');

console.log(camelCase.to(str)); // jsProgrammingLanguage

console.log(toSnakeCase(str)); // js_programming_language

console.log(isSnakeCase(toSnakeCase(str))); // true
```

## License

[MIT](https://github.com/vhidvz/naming-conventions-modeler/blob/master/LICENSE)
