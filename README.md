# angular table utils
[![Build Status](https://travis-ci.org/jbmarchetti/angular-table-utils.svg?branch=master)](https://travis-ci.org/jbmarchetti/angular-table-utils)
[![codecov](https://codecov.io/gh/jbmarchetti/angular-table-utils/branch/master/graph/badge.svg)](https://codecov.io/gh/jbmarchetti/angular-table-utils)
[![npm version](https://badge.fury.io/js/angular-table-utils.svg)](http://badge.fury.io/js/angular-table-utils)
[![devDependency Status](https://david-dm.org/jbmarchetti/angular-table-utils/dev-status.svg)](https://david-dm.org/jbmarchetti/angular-table-utils?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/jbmarchetti/angular-table-utils.svg)](https://github.com/jbmarchetti/angular-table-utils/issues)
[![GitHub stars](https://img.shields.io/github/stars/jbmarchetti/angular-table-utils.svg)](https://github.com/jbmarchetti/angular-table-utils/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/jbmarchetti/angular-table-utils/master/LICENSE)

## Demo
https://jbmarchetti.github.io/angular-table-utils/demo/

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#license)

## About



## Installation

Install through npm:
```
npm install --save angular-table-utils
```

Then include in your apps module:

```typescript
import { Component, NgModule } from '@angular/core';
import { AngularTableUtilsModule } from 'angular-table-utils';

@NgModule({
  imports: [
    AngularTableUtilsModule.forRoot()
  ]
})
export class MyModule {}
```

Finally use in one of your apps components:
```typescript
import { Component } from '@angular/core';

@Component({
  template: '<hello-world></hello-world>'
})
export class MyComponent {}
```

You may also find it useful to view the [demo source](https://github.com/jbmarchetti/angular-table-utils/blob/master/demo/demo.component.ts).

### Usage without a module bundler
```
<script src="node_modules/angular-table-utils/bundles/angular-table-utils.umd.js"></script>
<script>
    // everything is exported angularTableUtils namespace
</script>
```

## Documentation
All documentation is auto-generated from the source via [compodoc](https://compodoc.github.io/compodoc/) and can be viewed here:
https://jbmarchetti.github.io/angular-table-utils/docs/

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install local dev dependencies: `npm install` while current directory is this repo

### Development server
Run `npm start` to start a development server on port 8000 with auto reload + tests.

### Testing
Run `npm test` to run tests once or `npm run test:watch` to continually run tests.

### Release
* Bump the version in package.json (once the module hits 1.0 this will become automatic)
```bash
npm run release
```

## License

MIT
