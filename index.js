'use strict';

var babelPresetMetal = require('babel-preset-metal');
var karmaBabelPreprocessor = require('karma-babel-preprocessor');
var karmaChai = require('karma-chai');
var karmaChromeLauncher = require('karma-chrome-launcher');
var karmaCommonJs = require('karma-commonjs');
var karmaMocha = require('karma-mocha');
var karmaSinon = require('karma-sinon');
var karmaSourceMapSupport = require('karma-source-map-support');

var babelOptions = {
  presets: [babelPresetMetal],
  sourceMap: 'both'
};

module.exports = function (config, opt_noSoy) {
  var files = [];
  if (!opt_noSoy) {
    files.push(
      'node_modules/metal-soy-bundle/build/bundle.js',
      'node_modules/html2incdom/src/*.js'
    );
  }
  files.push(
    'node_modules/metal*/src/**/*.js',
    'src/**/*.js',
    'test/**/*.js'
  );

  config.set({
  	plugins: [
  		karmaBabelPreprocessor,
    	karmaChai,
  		karmaChromeLauncher,
    	karmaCommonJs,
    	karmaMocha,
    	karmaSourceMapSupport,
    	karmaSinon
  	],

    frameworks: ['mocha', 'chai', 'sinon', 'source-map-support', 'commonjs'],

    files: files,

    preprocessors: {
      'src/**/*.js': ['babel', 'commonjs'],
      'node_modules/html2incdom/src/*.js': ['babel', 'commonjs'],
      'node_modules/metal-soy-bundle/build/bundle.js': ['commonjs'],
      'node_modules/metal*/src/**/*.js': ['babel', 'commonjs'],
      'test/**/*.js': ['babel', 'commonjs']
    },

    browsers: ['Chrome'],

    babelPreprocessor: {options: babelOptions}
  });
};
