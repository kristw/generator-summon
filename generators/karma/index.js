'use strict';

var Easily = require('yeoman-easily').Easily;
var chalk = require('chalk');

module.exports = Easily.createGenerator({
  prompting: function () {
    return this.easily
      .greet('Welcome to the magnificent ' + chalk.red('generator-summon') + ' generator!')
      .confirmBeforeStart('Would you like to use karma + jasmine + istanbul?')
      .prompt([
        {
          type: 'input',
          name: 'testSpecPattern',
          message: 'Test spec pattern:',
          default: 'src/**/*.spec.js'
        }
      ], true);
  },

  writing: function () {
    if (this.easily.checkForConfirmation()) {
      this.easily
        .extendJSONWithTemplate(
          '__package.json',
          'package.json'
        )
        .copyTemplate(
          '__karma.conf.js',
          'karma.conf.js',
          this.props
        );
    }
  },

  install: function () {
    this.installDependencies({bower: false});
  }
});
