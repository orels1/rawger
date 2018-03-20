module.exports = (() => {

  'use strict';

  const Command = require('cmnd').Command;
  const users = require('../../../src/users');

  class Users extends Command {

    constructor() {

      super('users', 'favorite');

    }

    help() {

      return {
        description: 'Get user\'s favorite games',
        args: ['username']
      };

    }

    run({ args }, callback) {
      users(args[0]).favorite()
        .then(favorite => callback(null, JSON.stringify(favorite.get(), null, 2)))
        .catch(e => callback(new Error(e.message)))
    }

  }

  return Users;

})();