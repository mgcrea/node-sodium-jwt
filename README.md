<!-- markdownlint-disable no-inline-html -->

# node-sodium-jwt

<p align="center">
  <a href="https://www.npmjs.com/package/@mgcrea/node-sodium-jwt">
    <img src="https://img.shields.io/npm/v/@mgcrea/node-sodium-jwt.svg?style=for-the-badge" alt="npm version" />
  </a>
  <!-- <a href="https://www.npmjs.com/package/@mgcrea/node-sodium-jwt">
    <img src="https://img.shields.io/npm/dt/@mgcrea/node-sodium-jwt.svg?style=for-the-badge" alt="npm total downloads" />
  </a> -->
  <a href="https://www.npmjs.com/package/@mgcrea/node-sodium-jwt">
    <img src="https://img.shields.io/npm/dm/@mgcrea/node-sodium-jwt.svg?style=for-the-badge" alt="npm monthly downloads" />
  </a>
  <a href="https://www.npmjs.com/package/@mgcrea/node-sodium-jwt">
    <img src="https://img.shields.io/npm/l/@mgcrea/node-sodium-jwt.svg?style=for-the-badge" alt="npm license" />
  </a>
  <a href="https://github.com/mgcrea/node-sodium-jwt/actions/workflows/main.yml">
    <img src="https://img.shields.io/github/workflow/status/mgcrea/node-sodium-jwt/main?style=for-the-badge" alt="github main workflow" />
  </a>
</p>

## Features

Fast sodium-based crypto for hashing [json web tokens (JWT)](https://jwt.io)

- Relies on [sodium-native](https://github.com/sodium-friends/sodium-native) to perform crypto.
- Built with [TypeScript](https://www.typescriptlang.org/) for static type checking with exported types along the
  library.

## Install

```bash
npm install @mgcrea/node-sodium-jwt --save
```

## Quickstart

### Sign a jwt

```ts
import {signSync} from '@mgcrea/node-sodium-jwt';

const payload: Payload = {
  sub: 7,
  iat: new Date('2022-01-03T16:37:48.612Z').getTime(),
};
// Must be 32 bytes long
const secretKey = '0DfgJOaVrb2quroZavPLp7KJm+hTCBN6hZKnsKQSM+o=';
const jwt = signSync(payload, secretKey);
```

### Verify a jwt

```ts
import {verifySync} from '@mgcrea/node-sodium-jwt';

const jwt =
  'eyJhbGciOiJIUzUxMlQiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOjcsImlhdCI6MTY0MTIyNzg2ODYxMn0.a3_bFmeD5vugh3p998QXTdPbAuAJFQzCm-2MfmRVEAg';
const secretKey = '0DfgJOaVrb2quroZavPLp7KJm+hTCBN6hZKnsKQSM+o=';
const {header, payload, rotated} = verifySync(payload, secretKey);
```

### Generate a new secretKey

Generate a new `secretKey` from the bundled cli:

```sh
node_modules/.bin/node-sodium-jwt random-bytes
```

### Sign a jwt via CLI

Copy a freshly generated `secretKey` from the bundled cli:

```sh
node_modules/.bin/node-sodium-jwt sign '{"sub": "1"}' '0DfgJOaVrb2quroZavPLp7KJm+hTCBN6hZKnsKQSM+o='
```

### Verify a jwt via CLI

```sh
echo -n 'eyJhbGciOiJIUzUxMlQiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiIxIn0.QdubXBylKLNswV8-b44StbaNQr3SYhqwRBTMn6A6-JM' | node_modules/.bin/node-sodium-jwt verify '0DfgJOaVrb2quroZavPLp7KJm+hTCBN6hZKnsKQSM+o='
```

## Authors

- [Olivier Louvignes](https://github.com/mgcrea) <<olivier@mgcrea.io>>

## License

```md
The MIT License

Copyright (c) 2022 Olivier Louvignes <olivier@mgcrea.io>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit
persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the
Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```
