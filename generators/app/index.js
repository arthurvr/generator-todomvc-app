'use strict';
var yeoman = require('yeoman-generator');
var normalizeUrl = require('normalize-url');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
	prompting: function () {
		var done = this.async();

		var prompts = [{
			name: 'framework',
			message: 'Please enter the name of the framework:',
			validate: function (val) {
				return val.length > 0 ? true : 'A framework name is required';
			}
		}, {
			name: 'authorName',
			message: 'Please enter your name:',
			store: true,
			validate: function (val) {
				return val.length > 0 ? true : 'An author name is required';
			}
		}, {
			name: 'authorSite',
			message: 'Please enter the URL of your website:',
			store: true,
			validate: function (val) {
				return val.length > 0 ? true : 'An author site is required';
			},
			filter: function (val) {
				return normalizeUrl(val);
			}
		}];

		this.prompt(prompts, function (props) {
			mkdirp('js');
			mkdirp('css');

			['readme.md', 'index.html', 'js/app.js', 'css/app.css'].forEach(function (file) {
				this.fs.copyTpl(this.templatePath(file), this.destinationPath(file), props);
			}.bind(this));

			this.fs.copy(this.templatePath('_package.json'), this.destinationPath('package.json'));

			done();
		}.bind(this));
	},

	install: function () {
		this.installDependencies({
			bower: false,
			skipInstall: this.options['skip-install']
		});
	}
});
