'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-summon:github', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../generators/github'))
      .withOptions({someOption: true})
      .withPrompts({someAnswer: true})
      .on('end', done);
  });

  it('initialize git repository', function () {
    assert.file([
      '.git',
      'package.json'
    ]);
  });
});
