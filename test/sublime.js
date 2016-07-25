'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-summon:sublime', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/sublime'))
      .withPrompts({name: 'test-project'})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'test-project.sublime-project'
    ]);
  });
});
