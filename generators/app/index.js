'use strict';

var ye = require('yeoman-easily');
var Easily = ye.Easily;
var commonPrompts = ye.prompts;
var chalk = require('chalk');

module.exports = Easily.createGenerator({
  prompting: function () {
    var choices = [
      'babel',
      'bower',
      'karma',
      'gulp'
    ];

    var bundlerChoices = [
      'webpack',
      'rollup'
    ];

    var prompts = [
      'name',
      {
        type: 'list',
        name: 'bundler',
        message: 'Choose bundler:',
        choices: bundlerChoices,
        default: 'webpack'
      },
      {
        type: 'checkbox',
        name: 'devtools',
        message: 'Choose build tools:',
        choices: choices,
        default: choices.filter(d => d !== 'bower')
      },
      {
        type: 'list',
        name: 'linter',
        message: 'Choose linter:',
        choices: ['eslint', 'jshint', 'none'],
        default: 'eslint'
      },
      {
        type: 'checkbox',
        name: 'extra',
        message: 'Choose extra:',
        choices: ['browser-sync', 'version-hooks', 'gh-pages', 'sublime'],
        default: ['browser-sync', 'version-hooks', 'gh-pages', 'sublime']
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
        skipGreeting: true,
        name: props.name
      };
      options['use-summon:' + tool] = true;
      if (tool === 'karma') {
        options.bundler = props.bundler;
      }
      generator.easily.composeWithLocal(
        tool,
        'summon:' + tool,
        options
      );
    });

    var bundlerOptions = {
      skipGreeting: true,
      name: props.name
    };
    bundlerOptions['use-summon:' + props.bundler] = true;

    generator.easily.composeWithLocal(
      props.bundler,
      'summon:' + props.bundler,
      bundlerOptions
    );

    if (props.linter !== 'none') {
      var lintOptions = {
        skipGreeting: true
      };
      lintOptions['use-summon:' + props.linter] = true;
      generator.easily.composeWithLocal(
        props.linter,
        'summon:' + props.linter,
        lintOptions
      );
    }

    props.extra.forEach(function (tool) {
      var options = {
        skipGreeting: true,
        name: props.name
      };
      options['use-summon:' + tool] = true;
      generator.easily.composeWithLocal(
        tool,
        'summon:' + tool,
        options
      );
    });
  }
});

