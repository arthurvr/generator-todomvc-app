/* global it, describe, before */
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('todomvc-app generator', function () {
	before(function (done) {
		helpers.run(path.join(__dirname, '../app'))
			.inDir(path.join(os.tmpdir(), './temp-test'))
			.withOptions({ 'skip-install': true })
			.withPrompt({
				someOption: true
			})
			.on('end', done);
	});

	it('creates files', function () {
		assert.file([
			'readme.md',
			'package.json',
			'index.html',
			'js/app.js',
			'css/app.css'
		]);
	});
});
