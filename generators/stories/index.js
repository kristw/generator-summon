'use strict';

var Easily = require('yeoman-easily').Easily;
var chalk = require('chalk');

module.exports = Easily.createGenerator({
  prompting: function () {
    return this.easily
      .greet('Welcome to the beautiful ' + chalk.red('generator-summon') + ' generator!')
      .confirmBeforeStart('Would you like to add storybook templates?')
      .prompt();
  },

  writing: function () {
    if (this.easily.checkForConfirmation()) {
      this.easily
        .extendJSONWithTemplate(
          '__package.json',
          'package.json',
          this.props
        )
        .copyFiles('**/*', {
          ignore: '**/__*'
        });
    }
  },

  install: function () {
    this.installDependencies();
  }
});
