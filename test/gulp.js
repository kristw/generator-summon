'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-summon:gulp', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/gulp'))
      .withPrompts({someAnswer: true})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      'tasks/browserSync.js',
      'tasks/core.js',
      'tasks/common.js',
      'tasks/ejs.js',
      'tasks/image.js',
      'tasks/ngtemplates.js',
      'tasks/sass.js',
      'tasks/webpack.js'
    ]);
  });
});
