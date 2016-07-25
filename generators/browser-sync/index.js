'use strict';

var BaseWithEasily = require('yeoman-easily').BaseWithEasily;
var chalk = require('chalk');

module.exports = BaseWithEasily.extend({
  prompting: function () {
    return this.easily
      .greet('Welcome to the awe-inspiring ' + chalk.red('generator-summon') + ' generator!')
      .confirmBeforeStart('Would you like to use browser-sync?')
      .prompt();
  },

  writing: function () {
    if (this.easily.checkForConfirmation()) {
      this.easily.extendJSONWithTemplate(
        '__package.json',
        'package.json'
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
