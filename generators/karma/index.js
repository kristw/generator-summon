'use strict';

var BaseWithEasily = require('yeoman-easily').BaseWithEasily;
var chalk = require('chalk');

module.exports = BaseWithEasily.extend({
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
      this.easily.extendJSONWithTemplate(
        '__package.json',
        'package.json'
      );
      this.easily.copyTemplate(
        '__karma.conf.js',
        'karma.conf.js',
        this.props
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
