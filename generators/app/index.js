'use strict';

var ye = require('yeoman-easily');
var BaseWithEasily = ye.BaseWithEasily;
var commonPrompts = ye.prompts;
var chalk = require('chalk');

module.exports = BaseWithEasily.extend({
  prompting: function () {
    var choices = [
      'babel',
      'bower',
      'browser-sync',
      'webpack',
      'karma',
      'gulp'
    ];

    var prompts = [
      'name',
      {
        type: 'checkbox',
        name: 'devtools',
        message: 'Choose build tools:',
        choices: choices,
        default: choices
      },
      {
        type: 'list',
        name: 'linter',
        message: 'Choose linter:',
        choices: ['jshint', 'none'],
        default: 'jshint'
      },
      {
        type: 'checkbox',
        name: 'extra',
        message: 'Choose extra:',
        choices: ['version-hooks', 'gh-pages', 'sublime'],
        default: ['version-hooks', 'gh-pages', 'sublime']
      }
    ];

    return this.easily
      .greet('Welcome to the first-class ' + chalk.red('generator-summon') + ' generator!')
      .learnPrompts(commonPrompts)
      .prompt(prompts, true);
  },

  writing: function () {
    this.easily.setResolver(require.resolve);
    var generator = this;
    var props = generator.props;

    props.devtools.forEach(function (tool) {
      var options = {
        skipGreeting: true
      };
      options['use-' + tool] = true;
      generator.easily.composeWithLocal(tool, options);
    });

    if (props.linter !== 'none') {
      var lintOptions = {
        skipGreeting: true
      };
      lintOptions['use-' + props.linter] = true;
      generator.easily.composeWithLocal(props.linter, lintOptions);
    }

    props.extra.forEach(function (tool) {
      var options = {
        skipGreeting: true
      };
      options['use-' + tool] = true;
      generator.easily.composeWithLocal(tool, options);
    });
  }
});

