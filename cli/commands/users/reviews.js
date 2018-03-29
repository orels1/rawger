module.exports = (() => {

  'use strict';

  const Command = require('cmnd').Command;
  const { html, stripIndents } = require('common-tags');
  const striptags = require('striptags');
  const Rawger = require('../../../src');

  const rawger = Rawger();
  const { users } = rawger;

  class Reviews extends Command {

    constructor() {

      super('users', 'reviews');

    }

    help() {

      return {
        description: 'Get user\'s reviews',
        args: ['username']
      };

    }

    formatter(user, reviews) {
      const ratingEmojis = {
        exceptional: '🎯',
        recommended: '👍',
        meh: '😑',
        avoid: '⛔',
      }
      return (stripIndents`
        👤  ${user}'s reviews
        👾  ${reviews.length} total

        ${reviews.map(review => `
          - ${review.game} ${ratingEmojis[review.rating]}${
              review.text.length ? striptags(`: ${review.text}`) : ''
            }
        `).join('\n')}
      `);
    }

    run({ args }, callback) {
      users(args[0]).reviews()
        .then(reviews => callback(null, this.formatter(args[0], reviews.get())))
        .catch(e => callback(new Error(e.message)))
    }

  }

  return Reviews;

})();