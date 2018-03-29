<h1 align="center">rawger</h1>
<p align="center">
  <strong>⚔ rawg.io api client ⚔</strong><br />
  <small>An easy to use client with built-in caching</small>
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

```shell
# with npm
npm i --save rawger

#with yarn
yarn add rawger
```

## Documentation

[**Full documentation is available here**](https://www.notion.so/orels1/RAWGer-46ecd676fb5149bfb583c55b0862ab76)

## Usage Examples

> Check examples folder for more usage examples

### Unauthenticated client

```js
const Rawger = require('rawger');

// initialize rawger with default 60s cache
// you can supply a different timeout (check examples folder)
// or use rawger.purgeCache(); to force-clear the cache altogether
// ⚠ starting with v1.1 you need to always await the init process
const rawger = await Rawger();
const { users } = rawger;

// get "Currently Playing" games for user
const playing = (await users('orels1').games('playing')).get();

// get count of owned games
const owned = (await users('orels1').games('owned')).count();

// get raw api response object for "Want to Play" games
const raw = (await users('orels1').games('toplay')).raw();

// get user profile
const profile = (await users('orels1').profile()).get();
```

### Authenticated client

You can also initialize an authenticated client to perform such actions as game status updates, reviews publishing and so on.

```js
const Rawger = require('rawger');

// make sure to `await` the init process
const rawger = await Rawger({
  email: 'some@email.com',
  password: 'do-not-share-this'
});
const { users } = rawger;

// set FarCry 5 to "Currently Playing" for current account
await users('orels1').update().game('23585', { status: 'playing'});
```

You can also use CLI

```shell
rawg users orels1 #returns user profile

# 👤  orels1
# 📖  JS dev @x-team by day / game hoarder by night 🎮
# 👾  651 games owned
# ℹ️  8 collections | 10 comments

rawg users:favorite orels1 #returns user's favorite games

# 👤  orels1's favorite games
# 👾  8 total

# - Mirror's Edge
# - To the Moon
# - Rakuen
# - Destiny
# - Finding Paradise
# - Portal 2
# - Freelancer
# - Half-Life 2
```

**Note:** CLI is always uncached

### Authenticated CLI

To run authenticated requests through the CLI, you will need to set `RAWG_USER` and `RAWG_PASS` environmental variables. It's not the best way, but that's all I got for now.

Run `rawg` without any arguments to see the list of available commands
