// Karma configuration
'use strict';

<% if (bundler==='webpack') { %>
var webpackConfig = require('./webpack.config.js');
// Delete these fields to avoid bundling the whole app
// which is slow
delete webpackConfig.entry;
delete webpackConfig.output;
webpackConfig.devtool = 'inline-source-map';
<% } else if (bundler==='rollup') { %>
var babel = require('rollup-plugin-babel');
var babelrc = require('babelrc-rollup').default;
var nodeResolve = require('rollup-plugin-node-resolve');
<% } %>

module.exports = function (config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '.',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
<% if (karmaConfig==='jasmine') { %>
    frameworks: ['jasmine'],
<% } else if (karmaConfig==='mocha + chai') { %>
    frameworks: ['mocha', 'chai'],
<% } %>

    // each file acts as entry point for the webpack configuration
    files: [
      // Add the js files so it will trigger watch,
      // but do not include them as tests
      { pattern: 'src/**/*!(.spec).@(js|jsx)', included: false, served: false },
      // Add all files ending in ".spec.js"
      // These are the unit test files
      '<%=testSpecPattern%>'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
<% if (bundler==='webpack') { %>
    preprocessors: {
      '<%=testSpecPattern%>': ['webpack']
    },
    webpack: webpackConfig,
<% } else if (bundler==='rollup') { %>
    preprocessors: {
      '<%=testSpecPattern%>': ['rollup']
    },
    rollupPreprocessor: {
      // rollup settings. See Rollup documentation
      plugins: [
        nodeResolve(),
        babel(babelrc())
      ],
      // will help to prevent conflicts between different tests entries
      format: 'iife',
      sourceMap: 'inline'
    },
<% } %>

    // test results reporter to use
    // possible values: 'dots', 'progress', 'mocha', 'coverage'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
<% if (karmaConfig==='jasmine') { %>
    reporters: ['spec', 'coverage'],
<% } else if (karmaConfig==='mocha + chai') { %>
    reporters: ['mocha', 'coverage'],
<% } %>

    coverageReporter: {
      reporters: [
        { type: 'text' },
        { type: 'html' }
      ]
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // // enable / disable watching file and executing tests whenever any file changes
    // autoWatch: true,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
      'PhantomJS'
      // 'Chrome',
      // 'Firefox'
    ]

  });
};
