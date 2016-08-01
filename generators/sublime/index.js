'use strict';

var ye = require('yeoman-easily');
var Easily = ye.Easily;
var commonPrompts = ye.prompts;
var chalk = require('chalk');

module.exports = Easily.createGenerator({
  prompting: function () {
    return this.easily
      .greet('Welcome to the lovely ' + chalk.red('generator-summon') + ' generator!')
      .confirmBeforeStart('Would you like to add sublime project config?')
      .learnPrompts(commonPrompts)
      .prompt([
        'name'
      ], true);
  },

  writing: function () {
    if (this.easily.checkForConfirmation()) {
      this.easily.copy(
        '__project.sublime-project',
        this.props.name + '.sublime-project'
      );
    }
  }
});
