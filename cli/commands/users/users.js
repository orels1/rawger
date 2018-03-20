module.exports = (() => {

  'use strict';

  const Command = require('cmnd').Command;
  const users = require('../../../src/users');

  class Users extends Command {

    constructor() {

      super('users');

    }

    help() {

      return {
        description: 'Get user profile',
        args: ['username']
      };

    }

    run({ args }, callback) {
      users(args[0]).profile()
        .then(profile => callback(null, JSON.stringify(profile.get(), null, 2)))
        .catch(e => callback(new Error(e.message)))
    }

  }

  return Users;

})();