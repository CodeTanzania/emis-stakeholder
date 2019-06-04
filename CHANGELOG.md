#### 1.6.1 (2019-06-04)

##### Chores

* **package.json:**
  *  update package version to 1.6.1 ([eacfc0ce](https://github.com/CodeTanzania/emis-stakeholder/commit/eacfc0ceace63d6f243f3aeb37f7bddbd3fa00ba))
  *  format file ([978c0925](https://github.com/CodeTanzania/emis-stakeholder/commit/978c09254d3e30a9863292db6dea8a29244a495a))

##### New Features

* **example:**  mount authentication router on example app ([e0b4360b](https://github.com/CodeTanzania/emis-stakeholder/commit/e0b4360b7c87b36db113686a4c5da4f20ed92f0a))

##### Bug Fixes

* **seed:**  resolve duplication error and add default password to party ([d594a6f0](https://github.com/CodeTanzania/emis-stakeholder/commit/d594a6f0ef974d7e6d9e5eab3816de5793865be1))
* **auth:**  expose authentication router ([78d57525](https://github.com/CodeTanzania/emis-stakeholder/commit/78d57525b821d736580475472c52069cbf04d139))

##### Code Style Changes

*  fix a typo ([f6815240](https://github.com/CodeTanzania/emis-stakeholder/commit/f6815240f2d4ff20a293d15d0d4dc61cd18008f7))

#### 1.6.0 (2019-06-03)

##### Chores

- **deps:**
  - install and configure changelog generator ([5f7e800e](https://github.com/CodeTanzania/emis-stakeholder/commit/5f7e800eb1fb89a118efc83dff1e06905145314f))
  - install dependency locally ([6afe7608](https://github.com/CodeTanzania/emis-stakeholder/commit/6afe7608acfbc185043878baa2ecedcf5dbc26bb))
- **package.json:** update package version to 1.6.0 ([472c9f04](https://github.com/CodeTanzania/emis-stakeholder/commit/472c9f04d950c4e97de7a7d1be3402735e293fab))
- **.gitignore:** ignore configuration folders ([1c106da3](https://github.com/CodeTanzania/emis-stakeholder/commit/1c106da34d34143d0611d028667e11bc41096d89))

##### New Features

- **auth:**
  - allow user to change password and mount auth router ([c69ba541](https://github.com/CodeTanzania/emis-stakeholder/commit/c69ba54166ad0fc0e274772dad0b8133ebe72026))
  - support authentication in party router ([afb81b4c](https://github.com/CodeTanzania/emis-stakeholder/commit/afb81b4c7fcd0cd88c0559225134f0fe83f5cd08))
  - install and configure irina in party model ([fbb1c78b](https://github.com/CodeTanzania/emis-stakeholder/commit/fbb1c78b4caf81af5176df4f63ee1c57852499b5))

##### Refactors

- **seed:** resolve seed for party location ([3d704381](https://github.com/CodeTanzania/emis-stakeholder/commit/3d704381d91a81903776744d5928ed128b918aa2))
- **model:** re-implement seed to use new API ([5b2ad987](https://github.com/CodeTanzania/emis-stakeholder/commit/5b2ad9877ea4e64fc88ba2df74f55e37ad9d9010))

#### 1.5.0 (2019-05-30)

##### Chores

- **deps:**
  - force latest version & audit fix ([30a0b860](https://github.com/CodeTanzania/emis-stakeholder/commit/30a0b8605e3b4181157855481f023d1470204a69))
  - force latest version & audit fix ([b41f7357](https://github.com/CodeTanzania/emis-stakeholder/commit/b41f73574f9a1ce46d4493403414f40c5d6c0228))
- ignore docs files from being formatted by prettier ([9ec349f4](https://github.com/CodeTanzania/emis-stakeholder/commit/9ec349f42a5c280a0bd4162c6f9eaea8241c43fc))
- remove unused jsbeautify file ([35ee8af7](https://github.com/CodeTanzania/emis-stakeholder/commit/35ee8af713538f521a54c68b225ffee1626cde3d))
- ignore neovim config file ([8b239959](https://github.com/CodeTanzania/emis-stakeholder/commit/8b23995940bcaaf630b1c77325ffa812bf35b21d))
- install and configure prettier ([55f8fe0a](https://github.com/CodeTanzania/emis-stakeholder/commit/55f8fe0a1e8fb1172e3fd6c0b759846340f96024))
- force latest dependencies ([bf4cf46d](https://github.com/CodeTanzania/emis-stakeholder/commit/bf4cf46d8657369c636844b1ba864146032e6a32))

##### Refactors

- **deps:** migrate to use latest api ([f1b4a4fa](https://github.com/CodeTanzania/emis-stakeholder/commit/f1b4a4fa806a5e125216e4379c20d5b3f7b670bb))

##### Code Style Changes

- format files with prettier ([dd239db8](https://github.com/CodeTanzania/emis-stakeholder/commit/dd239db886a90816b8dd441403baa62da1ff0aa2))

#### 1.4.0 (2019-02-21)

##### New Features

- allow party export ([25001229](https://github.com/CodeTanzania/emis-stakeholder/commit/25001229342e31b4afa6a5580338b737d096675f))

#### 1.3.1 (2019-02-18)

##### Bug Fixes

- make role not required ([8b046856](https://github.com/CodeTanzania/emis-stakeholder/commit/8b0468567b2ce820a4c951f62fc556faa4397544))

#### 1.3.0 (2019-02-18)

##### Refactors

- extract seed to self script ([54fcb6ac](https://github.com/CodeTanzania/emis-stakeholder/commit/54fcb6acb54034fa405c7f0396cf191de7f3e597))
- remove unused fields ([c5c84232](https://github.com/CodeTanzania/emis-stakeholder/commit/c5c842327c59d379e63980cc4fa8e60b62cb95b8))

# 1.2.2 / 24-12-2018

- Build latest apidoc
- Force latest dependencies & audit fix
- Refactor and improve specs readability

# 1.2.0 / 17-12-2018

- Force latest emis-role dependency
- Build latest apidoc

# 1.2.0 / 16-12-2018

- Build latest apidoc
- Add taggable plugin
- Fixes #6
- Force lateste dependencies & audit fix
- Improve example app

# 1.1.1 / 18-11-2018

- Force latest dependencies
- Update module jsdoc
- Add example queue worker

# 1.1.0 / 09-10-2018

- Add persistent partie and roles seed
- Add env variables on example
- Add SMTP_FROM to fix travis crash
- Allow queue email send
- Add email notification integration spec
- Add runInBackround plugin to party schema
- Add POST /notifications route
- Add helpers to get party distinct phone numbers
- Add helpers to get party distinct emails
- Add postman dependencies
- Add party upsert logic
- Add party seed logic
- Add party upsert integration spec
- ADD party seed integration spec

# 1.0.2 / 26-10-2018

- Force responsibilities to undefined if not given
- Force latest dependencies

# 1.0.1 / 26-10-2018

- Update API Doc to include Role and Permission
- Update usage doc
- Improve test coverage

# 1.0.0 / 26-10-2018

- Clone @lykmapipo/party
- Refactor package details for emis-stakeholder
- Fix integration specs
- Improve package keywords
- Build API Doc
