'use strict';

var BaseWithEasily = require('yeoman-easily').BaseWithEasily;
var chalk = require('chalk');

module.exports = BaseWithEasily.extend({
  prompting: function () {
    var choices = [
      'babel',
      'bower',
      // 'webpack',
      'karma',
      // 'gulp',
      'browser-sync',
      'gh-pages',
      'jshint'
    ];

    var prompts = [{
      type: 'checkbox',
      name: 'devtools',
      message: 'Choose development tools:',
      choices: choices,
      default: choices
    }];

    return this.easily
      .greet('Welcome to the first-class ' + chalk.red('generator-summon') + ' generator!')
      .prompt(prompts);
  },

  writing: function () {
    this.easily.setResolver(require.resolve);
    var generator = this;
    this.props.devtools.forEach(function (tool) {
      var options = {
        skipGreeting: true,
        skipInstall: true
      };
      options['use-' + tool] = true;
      generator.easily.composeWithLocal(tool, options);
    });
  },

  install: function () {
    this.installDependencies();
  }
});

