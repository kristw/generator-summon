'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-summon:jshint', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/jshint'))
      .withPrompts({someAnswer: true})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      '.jshintrc'
    ]);
  });
});
