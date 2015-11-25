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

module.exports = function (config) {
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

    files: [
      'bower_components/soyutils/soyutils.js',
			'bower_components/(metal|crystal|steel|test)*/src/**/*.js',
      'src/**/*.js',
      'test/**/*.js'
    ],

    preprocessors: {
			'src/**/*.js': ['babel', 'commonjs'],
			'bower_components/(metal|crystal|steel)*/**/*.js': ['babel', 'commonjs'],
      'test/**/*.js': ['babel', 'commonjs']
    },

    browsers: ['Chrome'],

    babelPreprocessor: {options: babelOptions}
  });
};
