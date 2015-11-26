'use strict';

var babelPresetMetal = require('babel-preset-metal');
var defaultConfig = require('./index');
var isparta = require('isparta');
var karmaCoverage = require('karma-coverage');

module.exports = function (config) {
	defaultConfig(config);

	config.plugins.push(karmaCoverage);

	config.preprocessors = {
		'src/**/!(*.soy).js': ['coverage', 'commonjs'],
		'src/**/*.soy.js': ['babel', 'commonjs'],
		'bower_components/metal*/**/*.js': ['babel', 'commonjs'],
		'test/**/*.js': ['babel', 'commonjs']
	};

	config.reporters = ['coverage', 'progress'];

	config.coverageReporter = {
		instrumenters: {isparta : isparta},
		instrumenter: {'**/*.js': 'isparta'},
		instrumenterOptions: {
			isparta: {
				babel: {
					presets: [babelPresetMetal],
					sourceMap: 'both'
				}
			}
		},
		reporters: [
			{type: 'lcov', subdir: 'lcov'},
			{type: 'text-summary'}
		]
	};
};
