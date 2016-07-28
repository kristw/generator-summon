'use strict';

var BaseWithEasily = require('yeoman-easily').BaseWithEasily;
var chalk = require('chalk');

module.exports = BaseWithEasily.extend({
  prompting: function () {
    return this.easily
      .greet('Welcome to the shining ' + chalk.red('generator-summon') + ' generator!')
      .confirmBeforeStart('Would you like to use express?')
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
        .copy('server.js');
    }
  },

  install: function () {
    this.npmInstall('express', {saveDev: true});
  }
});
