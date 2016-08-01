'use strict';

var Easily = require('yeoman-easily').Easily;
var chalk = require('chalk');

module.exports = Easily.createGenerator({
  prompting: function () {
    return this.easily
      .greet('Welcome to the cat\'s meow ' + chalk.red('generator-summon') + ' generator!')
      .confirmBeforeStart('Would you like to use jshint?')
      .prompt();
  },

  writing: function () {
    if (this.easily.checkForConfirmation()) {
      this.easily.copy(
        '__jshintrc',
        '.jshintrc'
      );
    }
  }
});
