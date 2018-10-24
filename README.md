# emis-stakeholder

[![Build Status](https://travis-ci.org/codetanzania/emis-stakeholder.svg?branch=master)](https://travis-ci.org/codetanzania/emis-stakeholder)
[![Dependencies Status](https://david-dm.org/codetanzania/emis-stakeholder/status.svg?style=flat-square)](https://david-dm.org/codetanzania/emis-stakeholder)
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/codetanzania/emis-stakeholder/tree/master)

A representation of an entity (e.g municipal, individual, agency, organization etc) consisting of contact information (e.g. name, e-mail addresses, phone numbers) and other descriptive information of interest in emergency(or disaster) management.

[Demo](https://emis-stakeholders.herokuapp.com/v1/parties)

## Requirements

- [nodejs v8.11.1+](https://nodejs.org)
- [npm v5.6.0+](https://www.npmjs.com/)
- [MongoDB v3.4.10+](https://www.mongodb.com/)
- [mongoose v5.2.5+](https://github.com/Automattic/mongoose)

## Installation

```sh
npm install @codetanzania/emis-stakeholder --save
```

## Usage

```js
const mongoose = require('mongoose');
const { app } = require('@codetanzania/emis-stakeholder');

//connect to mongodb
mongoose.connect(process.env.MONGODB_URI);

//fire the app
app.start((error, env) => {
  ...
});
```

## Demo
[View Demo](https://emis-stakeholders.herokuapp.com/v1/parties)
[View apidoc](https://codetanzania.github.io/emis-stakeholder/)

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

## Licence

The MIT License (MIT)

Copyright (c) 2018 CodeTanzania & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
