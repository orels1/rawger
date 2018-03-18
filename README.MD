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

## Usage

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

## Users

### Profile

#### Usage

```js
const games = await users('orels1').profile(); // returns profile for the user
```

#### Arguments

This function accepts no arguments

#### Return value

Returns an item. See [item methods for the list of methods](###Items)

### Games

#### Usage

```js
const games = await users('orels1').games('owned'); // returns list of owned games
```

#### Arguments

- `statuses` - a list of statuses to filter by. Can be `String` or `Array`
  - playing - Currently Playing
  - toplay - Want to Play
  - beaten - Completed
  - dropped - Abandoned
  - yet - Yet to Play
  - owned - All Games

Request gaemes for multiple statuses by providing a list of statuses

```js
const games = await users('orels1').games('yet, playing');

const games = await users('orels1').games(['yet', 'playing']);
```

#### Return value

Returns a collection of games. See [collections methods for the list of methods](###Collections)

## Return formats

### Collections

All collections expose the same set of methods

- `raw()` - returns raw API response
- `get()` - returns the actual collection
- `count()` - counts items in collection
- `filter(predicate)` - applies a provided filter, based on `lodash/filter`
- `find(predicate)` - does a search based on provided filter, based on `lodash/filter`
- `findOne(predicate)` - returns first item that matched the filter, based on `lodash/find`

### Items

All single items expose the same set of methods

- `raw()` - returns raw API response
- `get()` - returns the actual item