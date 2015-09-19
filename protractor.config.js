exports.config = {
	keepAlive: true,
	noColor: false,
	rootElement: 'html',
	directConnect: true,
	chromeDriver: 'node_modules/chromedriver/lib/chromedriver/chromedriver',
	capabilities: {
		browserName: 'chrome',
		chromeOptions: {
			args: ['disable-web-security', 'user-data-dir=./.tmp/chrome']
		}
	},
	framework: 'jasmine2',
	jasmineNodeOpts: {
		onComplete: null,
		isVerbose: true,
		showColors: true,
		includeStackTrace: true,
		print: function() {} // Remove dot reporter
	},

	onPrepare: function() {
		// Sets browser cookies for tests
		browser.get('/');

		// add jasmine spec reporter
		var SpecReporter = require('jasmine-spec-reporter');
		jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: true}));
	}
};
