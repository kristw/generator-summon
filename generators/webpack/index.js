'use strict';

var Easily = require('yeoman-easily').Easily;
var chalk = require('chalk');

module.exports = Easily.createGenerator({
  prompting: function () {
    return this.easily
      .greet('Welcome to the awe-inspiring ' + chalk.red('generator-summon') + ' generator!')
      .confirmBeforeStart('Would you like to continue?')
      .prompt([
        {
          type: 'confirm',
          name: 'useBower',
          message: 'Use webpack with bower',
          default: false
        },
        {
          type: 'input',
          name: 'entryFileName',
          message: 'Entry file name:',
          default: 'main.js',
          filter: x => x.trim().replace(/[.]js$/, '')
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
          '__webpack.config.js',
          'webpack.config.js',
          this.props
        );
    }
  },

  install: function () {
    this.installDependencies({bower: false});
  }
});
