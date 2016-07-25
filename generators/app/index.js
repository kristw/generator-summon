'use strict';

var BaseWithEasily = require('yeoman-easily').BaseWithEasily;
var chalk = require('chalk');

module.exports = BaseWithEasily.extend({
  prompting: function () {
    return this.easily
      .greet('Welcome to the first-class ' + chalk.red('generator-summon') + ' generator!')
      .confirmBeforeStart('Would you like to continue?')
      .prompt();
  },

  writing: function () {
    if (this.easily.checkForConfirmation()) {
      this.log('Do nothing yet.');
    }
  },

  install: function () {
    this.installDependencies();
  }
});

