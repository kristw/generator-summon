'use strict';

var ye = require('yeoman-easily');
var BaseWithEasily = ye.BaseWithEasily;
var commonPrompts = ye.prompts;
var chalk = require('chalk');

module.exports = BaseWithEasily.extend({
  prompting: function () {
    return this.easily
      .greet('Welcome to the prime ' + chalk.red('generator-summon') + ' generator!')
      .confirmBeforeStart('Would you like to use bower?')
      .learnPrompts(commonPrompts)
      .prompt([
        'name',
        'description',
        'authorName',
        'authorEmail',
        'authorUrl'
      ], true);
  },

  writing: function () {
    if (this.easily.checkForConfirmation()) {
      this.easily
        .extendJSONWithTemplate(
          '__package.json',
          'package.json'
        )
        .extendJSONWithTemplate(
          '__bower.json',
          'bower.json',
          this.props
        );
    }
  },

  install: function () {
    this.installDependencies({bower: false});
  }
});

