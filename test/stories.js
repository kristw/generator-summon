'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-summon:stories', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../generators/stories'))
      .withPrompts({someAnswer: true})
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      'stories/index.js',
      'stories/ButtonStory.jsx',
      'stories/WelcomeStory.jsx',
      'stories/demo/Button.jsx',
      'stories/demo/Welcome.jsx'
    ]);
  });
});
