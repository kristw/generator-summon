'use strict';

var Easily = require('yeoman-easily').Easily;
var chalk = require('chalk');

module.exports = Easily.createGenerator({
  prompting: function () {
    var configChoices = [
      'mocha + chai',
      'jasmine'
    ];

    var bundlerChoices = [
      'webpack',
      'rollup'
    ];

    return this.easily
      .greet('Welcome to the magnificent ' + chalk.red('generator-summon') + ' generator!')
      .confirmBeforeStart('Would you like to use karma + istanbul?')
      .prompt([
        {
          type: 'list',
          name: 'karmaConfig',
          message: 'Choose tester configuration:',
          choices: configChoices,
          default: configChoices[0]
        },
        {
          type: 'list',
          name: 'bundler',
          message: 'Choose bundler:',
          choices: bundlerChoices,
          default: bundlerChoices[0]
        },
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
      this.easily
        .extendJSONWithTemplate(
          '__package.json',
          'package.json',
          this.props
        )
        .extendJSONWithTemplate(
          '__babelrc',
          '.babelrc',
          this.props
        )
        .copyTemplate(
          '__karma.conf.js',
          'karma.conf.js',
          this.props
        );
    }
  },

  install: function () {
    this.installDependencies({bower: false});
  }
});
