'use strict';
var yeoman = require('yeoman-generator');
var mkdirp = require('mkdirp');

module.exports = yeoman.generators.Base.extend({
	prompting: function () {
		var done = this.async();

		var prompts = [{
			message: 'Please enter the name of the framework:',
			name: 'framework'
		}, {
			message: 'Please enter your name:',
			name: 'authorName',
			store: true
		}, {
			message: 'Please enter the URL of your website:',
			name: 'authorSite',
			store: true
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
