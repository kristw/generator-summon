'use strict';

var BaseWithEasily = require('yeoman-easily').BaseWithEasily;
var chalk = require('chalk');

module.exports = BaseWithEasily.extend({
  prompting: function () {
    return this.easily
      .greet('Welcome to the posh ' + chalk.red('generator-summon') + ' generator!')
      .confirmBeforeStart('Would you like to continue?')
      .prompt();
  },

  writing: function () {
    if (this.easily.checkForConfirmation()) {
      this.easily.extendJSONWithTemplate(
        '__package.json',
        'package.json',
        this.props
      );

      var generator = this;
      [
        'tasks/browserSync.js',
        'tasks/core.js',
        'tasks/common.js',
        'tasks/ejs.js',
        'tasks/image.js',
        'tasks/ngtemplates.js',
        'tasks/sass.js',
        'tasks/webpack.js'
      ].forEach(function (file) {
        generator.easily.copy(file);
      });
    }
  },

  install: function () {
    this.installDependencies();
  }
});
