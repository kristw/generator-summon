'use strict';

var Easily = require('yeoman-easily').Easily;
var chalk = require('chalk');

module.exports = Easily.createGenerator({
  prompting: function () {
    return this.easily
      .greet('Welcome to the awe-inspiring ' + chalk.red('generator-summon') + ' generator!')
      .confirmBeforeStart('Would you like to add npm version hooks?')
      .prompt();
  },

  writing: function () {
    if (this.easily.checkForConfirmation()) {
      this.easily
        .extendJSONWithTemplate(
          '__package.json',
          'package.json'
        )
        .copy('docs/versioning.md');
    }
  },

  install: function () {
    this.installDependencies({bower: false});
  }
});
