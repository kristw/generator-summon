'use strict';

var BaseWithEasily = require('yeoman-easily').BaseWithEasily;
var chalk = require('chalk');

module.exports = BaseWithEasily.extend({
  prompting: function () {
    return this.easily
      .greet('Welcome to the wonderful ' + chalk.red('generator-summon') + ' generator!')
      .confirmBeforeStart('Would you like to use eslint?')
      .prompt();
  },

  writing: function () {
    if (this.easily.checkForConfirmation()) {
      this.easily
        .extendJSONWithTemplate(
          '__package.json',
          'package.json'
        )
        .copy('__eslintrc.js', '.eslintrc.js');
    }
  },

  install: function () {
    this.installDependencies({bower: false});
  }
});
