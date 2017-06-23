'use strict';

var Easily = require('yeoman-easily').Easily;
var chalk = require('chalk');

module.exports = Easily.createGenerator({
  prompting: function () {
    return this.easily
      .greet('Welcome to the luminous ' + chalk.red('generator-summon') + ' generator!')
      .confirmBeforeStart('Would you like to use React?')
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
        .copy('index.js')
        .copy('App.jsx')
        .copy('App.scss');
    }
  },

  install: function () {
    this.installDependencies();
  }
});
