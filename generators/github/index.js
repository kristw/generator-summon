'use strict';

var chalk = require('chalk');
var generator = require('yeoman-generator');
var ye = require('yeoman-easily');
var BaseWithEasily = ye.BaseWithEasily;
var Easily = ye.Easily;
var commonPrompts = ye.prompts;
var originUrl = require('git-remote-origin-url');
var _ = require('lodash');

module.exports = BaseWithEasily.extend({
  constructor: function () {
    generator.Base.apply(this, arguments);

    this.option('generateInto', {
      type: String,
      required: false,
      defaults: '',
      desc: 'Relocate the location of the generated files.'
    });

    this.option('name', {
      type: String,
      required: true,
      desc: 'Project name'
    });

    this.option('githubAccount', {
      type: String,
      required: true,
      desc: 'GitHub username or organization'
    });
  },

  initializing: function () {
    this.easily = new Easily(this);

    var done = this.async();
    var dest = this.destinationPath(this.options.generateInto);
    var generator = this;

    if(this.fs.exists(dest + '/.git/config')){
      originUrl(dest).then(function (url) {
        generator.originUrl = url;
        done();
      }, done);
    }
    else{
      done();
    }
  },

  prompting: function () {
    return this.easily
      .greet('Welcome to the striking ' + chalk.red('generator-summon') + ' generator!')
      .learnPrompts(commonPrompts)
      .prompt([
        'name',
        'githubAccount'
      ], true);
  },

  writing: function () {
    _.extend(this.options, this.props);

    this.pkg = this.fs.readJSON(this.destinationPath(this.options.generateInto, 'package.json'), {});

    var repository = '';
    if (this.originUrl) {
      repository = this.originUrl;
    } else {
      repository = this.options.githubAccount + '/' + this.options.name;
    }

    this.pkg.repository = this.pkg.repository || repository;
    this.pkg.bugs = _.extend({
      url: 'https://github.com/'
        + this.options.githubAccount
        + '/' + this.options.name
        + '/issues'
    }, this.pkg.bugs);

    this.fs.writeJSON(
      this.destinationPath(this.options.generateInto, 'package.json'),
      this.pkg
    );
  },

  end: function () {
    this.spawnCommandSync('git', ['init'], {
      cwd: this.destinationPath(this.options.generateInto)
    });

    if (!this.originUrl) {
      var repoSSH = this.pkg.repository;
      if (this.pkg.repository.indexOf('.git') === -1) {
        repoSSH = 'git@github.com:' + this.pkg.repository + '.git';
      }
      this.spawnCommandSync('git', ['remote', 'add', 'origin', repoSSH], {
        cwd: this.destinationPath(this.options.generateInto)
      });
    }

    console.log('Done!');
  }
});