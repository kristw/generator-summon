'use strict';

var BaseWithEasily = require('yeoman-easily').BaseWithEasily;
var chalk = require('chalk');

module.exports = BaseWithEasily.extend({
  prompting: function () {
    return this.easily
      .greet('Welcome to the awe-inspiring ' + chalk.red('generator-summon') + ' generator!')
      .confirmBeforeStart('Would you like to use Babel?')
      .prompt();
  },

  writing: function () {
    if (this.easily.checkForConfirmation()) {
      this.easily
        .copy('__babelrc', '.babelrc')
        .extendJSONWithTemplate(
          '__package.json',
          'package.json'
        );
    }
  },

  install: function () {
    this.installDependencies({bower: false});
  }
});

