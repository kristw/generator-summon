'use strict';

var ye = require('yeoman-easily');
var Easily = ye.Easily;
var commonPrompts = ye.prompts;
var chalk = require('chalk');

module.exports = Easily.createGenerator({
  prompting: function () {
    return this.easily
      .greet('Welcome to the awe-inspiring ' + chalk.red('generator-summon') + ' generator!')
      .confirmBeforeStart('Would you like to continue?')
      .learnPrompts(commonPrompts)
      .prompt([
        'name'
      ], true);
  },

  writing: function () {
    if (this.easily.checkForConfirmation()) {
      this.easily
        .extendJSONWithTemplate(
          '__package.json',
          'package.json',
          this.props
        )
        .copyTemplate(
          '__rollup.config.js',
          'rollup.config.js',
          this.props
        );
    }
  },

  install: function () {
    this.installDependencies({bower: false});
  }
});
