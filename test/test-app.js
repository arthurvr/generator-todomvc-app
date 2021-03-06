/* global it, describe, before */
'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('todomvc-app generator', function () {
	before(function (done) {
		helpers.run(path.join(__dirname, '../generators/app'))
			.inTmpDir()
			.withOptions({'skip-install': true})
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
