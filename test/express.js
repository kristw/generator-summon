'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-summon:express', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/express'))
      .withPrompts({someAnswer: true})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      'server.js'
    ]);
  });
});
