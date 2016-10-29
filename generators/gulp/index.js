'use strict';

var Easily = require('yeoman-easily').Easily;
var chalk = require('chalk');

const gulpTasks = ['sass', 'image', 'ejs', 'ngtemplates'];

module.exports = Easily.createGenerator({
  prompting: function () {
    return this.easily
      .greet('Welcome to the posh ' + chalk.red('generator-summon') + ' generator!')
      .confirmBeforeStart('Would you like to continue?')
      .prompt([
        {
          type: 'list',
          name: 'gulpTasks',
          message: 'Choose gulp tasks:',
          choices: gulpTasks,
          default: gulpTasks.filter(t => t !== 'ngtemplates')
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
        .copyFiles('tasks/core.js')
        .copyFiles('tasks/common.js');

      if (this.props.gulpTasks.indexOf('sass') > -1) {
        this.easily
          .extendJSON('package.json', {
            devDependencies: {
              'gulp-sass': '~2.1.1'
            }
          })
          .copyFiles('tasks/sass.js');
      }

      if (this.props.gulpTasks.indexOf('image') > -1) {
        this.easily
          .extendJSON('package.json', {
            devDependencies: {
              'gulp-imagemin': '~2.4.0'
            }
          })
          .copyFiles('tasks/image.js');
      }

      if (this.props.gulpTasks.indexOf('ejs') > -1) {
        this.easily
          .extendJSON('package.json', {
            devDependencies: {
              'gulp-ejs': '~2.1.2',
              'gulp-htmlmin': '~1.3.0'
            }
          })
          .copyFiles('tasks/ejs.js');
      }

      if (this.props.gulpTasks.indexOf('ngtemplates') > -1) {
        this.easily
          .extendJSON('package.json', {
            devDependencies: {
              'gulp-ng-templates': '~0.0.6',
              'gulp-htmlmin': '~1.3.0'
            }
          })
          .copyFiles('tasks/ngtemplates.js');
      }
    }
  },

  install: function () {
    this.installDependencies({bower: false});
  }
});
