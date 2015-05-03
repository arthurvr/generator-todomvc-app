'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
	prompting: function () {
		var done = this.async();

		this.log(yosay(
			'Welcome to the extraordinary ' + chalk.red('Todomvc app') + ' generator!'
		));

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
			this.props = props;

			this.template('readme.md');
			this.template('index.html');

			this.copy('_package.json', 'package.json');

			this.mkdir('js');
			this.mkdir('css');

			this.copy('js/app.js');
			this.copy('css/app.css');

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
