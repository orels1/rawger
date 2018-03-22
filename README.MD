<h1 align="center">rawger</h1>
<p align="center">
  <strong>⚔ rawg.io api client ⚔</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/rawger">
    <img src="https://img.shields.io/npm/v/rawger.svg?style=flat-square" />
  </a>
  <a href="https://www.npmjs.com/package/rawger">
    <img src="https://img.shields.io/npm/dm/rawger.svg?style=flat-square" />
  </a>
  <a href="https://snyk.io/test/github/orels1/rawger?targetFile=package.json">
    <img src="https://snyk.io/test/github/orels1/rawger/badge.svg?targetFile=package.json&style=flat-square" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/orels1/rawger?targetFile=package.json" style="max-width:100%;">
  </a>
  <img src="https://img.shields.io/badge/100%25-unofficial-blue.svg?style=flat-square" />
</p>

<p align="center">
  <sub>Built with ❤︎ by
  <a href="https://twitter.com/orels1_">orels1</a>
  </sub>
</p>

## Installation

```
npm i --save rawger
```

## Documentation

[**Full documentation is available here**](https://www.notion.so/orels1/RAWGer-46ecd676fb5149bfb583c55b0862ab76)

## Usage Examples

> Check examples.js for more usage examples

```js
const { users } = require('rawger');

// get "Currently Playing" games for user
const playing = (await users('orels1').games('playing')).get();

// get count of owned games
const owned = (await users('orels1').games('owned')).count();

// get raw api response object for "Want to Play" games
const raw = (await users('orels1').games('toplay')).raw();

// get user profile
const profile = (await users('orels1').profile()).get();
```

You can also use CLI

```shell
rawg users orels1
```

Run `rawg` without any arguments to see the list of available commands
