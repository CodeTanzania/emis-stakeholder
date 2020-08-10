# emis-stakeholder

[![Build Status](https://travis-ci.org/codetanzania/emis-stakeholder.svg?branch=develop)](https://travis-ci.org/codetanzania/emis-stakeholder)
[![Dependencies Status](https://david-dm.org/codetanzania/emis-stakeholder.svg)](https://david-dm.org/codetanzania/emis-stakeholder)
[![Coverage Status](https://coveralls.io/repos/github/CodeTanzania/codetanzania/emis-stakeholder/badge.svg?branch=develop)](https://coveralls.io/github/CodeTanzania/codetanzania/emis-stakeholder?branch=develop)
[![GitHub License](https://img.shields.io/github/license/codetanzania/emis-stakeholder)](https://github.com/codetanzania/emis-stakeholder/blob/develop/LICENSE)

[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![npm version](https://img.shields.io/npm/v/@codetanzania/emis-stakeholder)](https://www.npmjs.com/package/@codetanzania/emis-stakeholder)

A representation of an entity (e.g municipal, individual, agency, organization etc) consisting of contact information (e.g. name, e-mail addresses, phone numbers) and other descriptive information of interest in emergency(or disaster) management.

## Requirements

- [NodeJS v14.5+](https://nodejs.org)
- [Npm v6.14+](https://www.npmjs.com/)
- [MongoDB v4+](https://www.mongodb.com/)
- [Redis v5+](https://redis.io/)
- [Mongoose v5.7+](https://github.com/Automattic/mongoose)

## Installation

```sh
npm install @codetanzania/emis-stakeholder --save
```

## Usage

```js
import { start } from '@codetanzania/emis-stakeholder';

// fire the http server
start(error => { ... });
```

## Testing

- Clone this repository

- Install all development dependencies

```sh
npm install
```

- Run example

```sh
npm run dev
```

- Then run test

```sh
npm test
```

## Contribute

It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## References
- [A Universal Person and Organization Data Model](http://tdan.com/a-universal-person-and-organization-data-model/5014)
- [popolo project](https://www.popoloproject.com/)
- [Open Civic Data](http://docs.opencivicdata.org/en/latest/index.html)
- [https://opengovdata.io/](https://opengovdata.io/)

## License

The MIT License (MIT)

Copyright (c) CodeTanzania & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
