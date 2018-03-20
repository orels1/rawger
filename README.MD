<h1 align="center">rawger</h1>
<p align="center">
  <strong>⚔ rawg.io api client ⚔</strong>
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