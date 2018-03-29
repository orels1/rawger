module.exports = (() => {

  'use strict';

  const Command = require('cmnd').Command;
  const { stripIndent } = require('common-tags');
  const Rawger = require('../../../src');

  class UpdateGame extends Command {

    constructor() {

      super('update', 'game');

    }

    help() {

      return {
        description: 'Updates game status',
        args: ['gameID', 'status']
      };

    }

    formatter(game) {
      return (stripIndent`
        ✅  Game ${game} status updated!
      `);
    }

    run({ args }, callback) {
      new Promise(async (resolve, reject) => {
        try {
          const rawger = await Rawger({
            email: process.env.RAWG_USER,
            password: process.env.RAWG_PASS
          });
          const { users } = rawger;
          await users('').update().game(args[0], { status: args[1] });
          return resolve(args[0]);
        } catch (e) {
          return reject(e);
        }

      }).then(data => callback(null, this.formatter(data)))
        .catch(e => callback(new Error(e.message)));
    }

  }

  return UpdateGame;

})();