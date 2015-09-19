module.exports = function (grunt) {

	/**
	 * Load required Grunt tasks. These are installed based on the versions listed
	 * in `package.json` when you do `npm install` in this directory.
	 */
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-ng-annotate');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-mkdir');

	// Protractor Testing
	grunt.loadNpmTasks('grunt-protractor-runner');

	// Pact
	grunt.loadNpmTasks('grunt-pact');
	grunt.loadNpmTasks('grunt-execute');
	grunt.loadNpmTasks('grunt-continue');

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.renameTask('watch', 'delta');

	/**
	 * Middleware for grunt-contrib-connect
	 */
	var modRewrite = require('connect-modrewrite');

	/**
	 * Load in our build configuration file.
	 */
	var userConfig = require('./build.config.js');
	var bower = grunt.file.readJSON("bower.json");

	var taskConfig = {
		pkg: {
			author: bower.author,
			name: bower.name,
			version: bower.version
		},

		clean: {
			build: ['<%= build_dir %>'],
			pact: ['<%= mkdir.tmp.options.create %>']
		},

		mkdir: {
			tmp: {
				options: {
					create: ['.tmp/chrome', '.tmp/pacts']
				}
			}
		},

		copy: {
			build_app_assets: {
				files: '<%= app_files.assets %>'
			},
			build_vendor_assets: {
				files: '<%= vendor_files.assets %>'
			},
			build_app_js: {
				files: [
					{
						src: ['<%= app_files.js %>'],
						dest: '<%= build_dir %>/<%= pkg.name %>/',
						cwd: '.',
						expand: true
					}
				]
			},
			build_vendor_js: {
				files: [
					{
						src: ['<%= vendor_files.js %>'],
						dest: '<%= build_dir %>/<%= pkg.name %>/',
						cwd: '.',
						expand: true
					}
				]
			}
		},

		ngAnnotate: {
			options: {
				singleQuotes: true
			},
			build: {
				files: [
					{
						src: ['<%= app_files.js %>'],
						cwd: '<%= build_dir %>/<%= pkg.name %>',
						dest: '<%= build_dir %>/<%= pkg.name %>',
						expand: true
					},
					{
						src: ['<%= vendor_files.js %>'],
						cwd: '<%= build_dir %>/<%= pkg.name %>',
						dest: '<%= build_dir %>/<%= pkg.name %>',
						expand: true
					}
				]
			}
		},

		less: {
			build: {
				files: [
					{
						src: [
							'<%= app_files.less %>',
							'<%= vendor_files.css %>'
						],
						dest: '<%= build_dir %>/<%= pkg.name %>/assets/<%= pkg.name %>-<%= pkg.version %>.css'
					}
				]
			}
		},

		jshint: {
			options: {
				curly: true,
				immed: true,
				newcap: true,
				noarg: true,
				sub: true,
				boss: true,
				asi: true,
				eqnull: true,
				shadow: true,
				evil: true,
				globals: {
					angular: true,
					_: true,
					app: true
				}
			},

			src: [
				'<%= app_files.js %>'
			],
			test: [
				'<%= app_files.jsunit %>'
			],
			gruntfile: [
				'Gruntfile.js'
			]

		},

		/**
		 * HTML2JS is a Grunt plugin that takes all of your template files and
		 * places them into JavaScript files as strings that are added to
		 * AngularJS's template cache. This means that the templates too become
		 * part of the initial payload as one JavaScript file. Neat!
		 */
		html2js: {
			/**
			 * These are the templates from `src/app`.
			 */
			app: {
				options: {
					base: 'src/app'
				},
				src: ['<%= app_files.atpl %>'],
				dest: '<%= build_dir %>/<%= pkg.name %>/templates-app.js'
			},

			/**
			 * These are the templates from `src/directives`.
			 */
			directives: {
				options: {
					base: 'src/directives'
				},
				src: ['<%= app_files.dtpl %>'],
				dest: '<%= build_dir %>/<%= pkg.name %>/templates-directives.js'
			}
		},

		karma: {
			options: {
				configFile: '<%= build_dir %>/karma-unit.js'
			},
			unit: {
				singleRun: true
			},
			continuous: {
				singleRun: false,
				background: true
			}
		},


		protractor: {
			options: {
				configFile: "protractor.config.js",
				args: {
					verbose: true,
					specs: '<%= app_files.jse2e %>',
					baseUrl: '<%= connect.options.protocol %>://localhost:<%= connect.options.port %>/<%= pkg.name %>/'
				}
			},
			all: {}
		},

		pact: {
			demo: {
				options: {
					port: 9000,
					cors: true,
					dir: '.tmp/pacts'
				}
			}
		},

		execute: {
			options: {
				module: true
			},
			'pact-setup': {
				src: ['mock/setup.js']
			},
			'pact-teardown': {
				src: ['mock/teardown.js']
			}
		},

		index: {
			options: {
				templateSrc: 'src/index.html',
				templateDest: '<%= build_dir %>/<%= pkg.name %>'
			},
			build: {
				files: [
					{
						src: [
							'<%= vendor_files.js %>'
						],
						cwd: '<%= build_dir %>/<%= pkg.name %>/',
						expand: true
					},
					{
						src: [
							'**/*.js',
							'**/*.css',
							'!vendor/**/*'
						],
						cwd: '<%= build_dir %>/<%= pkg.name %>/',
						expand: true
					}
				]
			}
		},

		karmaconfig: {
			unit: {
				dir: '<%= build_dir %>',
				src: [
					'<%= vendor_files.js %>',
					'<%= build_dir %>/<%= pkg.name %>/templates-*.js',
					'<%= app_files.js %>',
					'<%= test_files.js %>',
					'<%= app_files.jsunit %>'
				]
			}
		},

		delta: {
			options: {
				livereload: true
			},

			gruntfile: {
				files: 'Gruntfile.js',
				tasks: ['jshint:gruntfile'],
				options: {
					livereload: false
				}
			},

			jssrc: {
				files: [
					'<%= app_files.js %>'
				],
				tasks: ['jshint:src', 'copy:build_app_js', 'ngAnnotate', 'karma:unit:run']
			},

			jsvendor: {
				files: [
					'<%= vendor_files.js %>'
				],
				tasks: ['copy:build_vendor_js', 'ngAnnotate']
			},

			assets: {
				files: [
					'src/assets/**/*'
				],
				tasks: ['copy:build_app_assets', 'copy:build_vendor_assets']
			},

			html: {
				files: ['<%= app_files.html %>'],
				tasks: ['index:build']
			},

			tpls: {
				files: [
					'src/app/**/*.tpl.html',
					'src/directives/**/*.tpl.html'
				],
				tasks: ['html2js']
			},

			less: {
				files: ['src/**/*.less', 'vendor/**/*.less'],
				tasks: ['less:build']
			},

			jsunit: {
				files: [
					'<%= app_files.jsunit %>'
				],
				tasks: ['jshint:test', 'karma:unit:run'],
				options: {
					livereload: false
				}
			},

			pacts: {
				files: [
					'mock/pacts/**/*.js'
				],
				tasks: ['execute:pact-setup']
			}
		},

		connect: {
			options: {
				port: 8080,
				protocol: 'http',
				middleware: function (connect, options) {
					var middlewares = [];
					var name = taskConfig.pkg.name;
					middlewares.push(modRewrite(['^(/|/' + name + ')$ /' + name + '/ [R=301]'])); // Redirect root to project
					middlewares.push(modRewrite(['!\\.?(js|css|html|eot|svg|ttf|woff|otf|css|png|jpg|gif|ico) /' + name + '/ [L]'])); // Anything after name
					middlewares.push(function (req, res, next) {
						var url = req.url.split('?')[0];
						if (/\.(gz|gzip)$/.test(url)) {
							var type = 'text/html';
							if (/\.js\.(gz|gzip)$/.test(url)) {
								type = 'application/javascript';
							} else if (/\.css\.(gz|gzip)$/.test(url)) {
								type = 'text/css';
							}

							res.setHeader('Content-Type', type);
							res.setHeader('Content-Encoding', 'gzip');
						}

						// don't just call next() return it
						return next();
					});
					options.base.forEach(function (base) {
						middlewares.push(connect.static(base));
					});
					return middlewares;
				}
			},
			build: {
				options: {
					base: '<%= build_dir %>'
				}
			}
		},

		file_check: {
			vendors: {
				src: [
					'<%= vendor_files.js %>',
					'<%= vendor_files.css %>'
				],
				nonull: true // DO NOT REMOVE, this is needed to find all incorrect paths
			}
		}
	};

// Dynamically adding html2js targets
	for (var key in userConfig.vendor_files.tpl) {
		var value = userConfig.vendor_files.tpl[key];
		value.dest = userConfig.build_dir + '/<%= pkg.name %>/templates-' + key + '.js';
		taskConfig.html2js[key] = value;
		if (Array.isArray(value.src)) {
			taskConfig.delta.tpls.files = taskConfig.delta.tpls.files.concat(value.src);
		} else {
			taskConfig.delta.tpls.files.push(value.src);
		}
	}

	grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

	grunt.registerTask('watch', ['build', 'connect:build', 'karma:continuous', /*'pact', 'execute:pact-setup',*/ 'delta']);

	/**
	 * The default task is to build
	 */
	grunt.registerTask('default', ['build']);

	/**
	 * Testing tasks
	 */
	grunt.registerTask('test', ['test:unit', 'test:e2e']);
	grunt.registerTask('test:unit', ['karmaconfig', 'karma:unit']);
	grunt.registerTask('test:e2e', ['connect:build', /*'pact:start', */'protractor', /*'pact:stop'*/]);

	/**
	 * Pact tasks
	 */
	grunt.registerTask('pact:start', ['continue:on', 'pact:scout', 'onexit']);
	grunt.registerTask('pact:stop', ['pact:scout:stop', 'continue:off', 'continue:fail-on-warning']);

	/**
	 * The build task gets your app ready to run for development and testing.
	 */
	grunt.registerTask('build', ['file_check:vendors', 'clean', 'mkdir:tmp', 'html2js', 'jshint', 'less:build',
		'copy:build_app_assets', 'copy:build_vendor_assets', 'copy:build_app_js', 'copy:build_vendor_js',
		'ngAnnotate', 'index:build', 'test:unit'
	]);

	grunt.registerTask('release', ['build', 'test']);

	function filterForJS(files) {
		return files.filter(function (file) {
			return file.match(/\.js(\.gz)?$/);
		});
	}

	function filterForCSS(files) {
		return files.filter(function (file) {
			return file.match(/\.css(\.gz)?$/);
		});
	}

	grunt.registerTask('onexit', function (step) {
		var config = grunt.config('onexit');
		if (!config) {
			config = {
				watched: false,
				exit: function () {
					grunt.log.writeln('').writeln('Shutting down server...');
					grunt.task.run(['pact:scout:stop', 'onexit:exit']);
					grunt.task.current.async()();
				}
			};
			grunt.config.set('grunt ', config);
		}

		if (step === 'exit') {
			process.exit();
		} else if (!config.watched) {
			process.once('SIGINT', config.exit);
			process.once('SIGHUP', config.exit);
			process.once('SIGTERM', config.exit);
			config.watched = true;
		}
	});

	grunt.registerMultiTask('index', 'Process index.html template', function () {
		var options = this.options({
			templateSrc: ['src/index.html']
		});

		if (options.templateDest.slice(-1) !== '/') {
			options.templateDest += '/';
		}

		if (!Array.isArray(options.templateSrc)) {
			options.templateSrc = [options.templateSrc];
		}

		var files = this.files.map(function (file) {
			return file.dest;
		});
		var jsFiles = filterForJS(files);
		var cssFiles = filterForCSS(files);

		if (cssFiles.length !== 0) {
			grunt.log.writeln('Including CSS:');
			cssFiles.forEach(function (f) {
				grunt.log.writeln(String(f).cyan);
			});
		}

		if (jsFiles.length !== 0) {
			grunt.log.writeln('Including JS:');
			jsFiles.forEach(function (f) {
				grunt.log.writeln(String(f).cyan);
			});
		}

		options.templateSrc.forEach(function (tpl) {
			grunt.file.copy(tpl, options.templateDest + tpl.split('/').pop(), {
				process: function (contents, path) {
					return grunt.template.process(contents, {
						data: {
							scripts: jsFiles,
							styles: cssFiles,
							version: grunt.config('pkg.version'),
							name: grunt.config('pkg.name'),
							timestamp: new Date().getTime()
						}
					});
				}
			});
		});
	});

	grunt.registerMultiTask('karmaconfig', 'Process karma config templates', function () {
		var jsFiles = filterForJS(this.filesSrc);

		grunt.file.copy('karma/karma-unit.tpl.js', grunt.config('build_dir') + '/karma-unit.js', {
			process: function (contents, path) {
				return grunt.template.process(contents, {
					data: {
						scripts: jsFiles
					}
				});
			}
		});
	});

	/**
	 * A quick file check to make sure all dependent files exists, if not throw error.
	 * This is mostly used to mention to the user that a new dependency might of been added, but not installed
	 * through `bower install`.
	 */
	grunt.registerMultiTask('file_check', 'Custom file check to catch dependency problems', function () {
// Merge task-specific and/or target-specific options with these defaults.
		var options = this.options({});

		grunt.verbose.writeflags(options, 'Options');

		var missingFiles = [];

		// Iterate over all specified file groups.
		this.files.forEach(function (f) {
			missingFiles = f.src.filter(function (filepath) {
				return !grunt.file.exists(filepath) && !/[!*?{}]/.test(filepath);
			});
		});

		if (missingFiles.length !== 0) {
			var message = 'The following files are missing: ' + missingFiles.join(',') + '\nDid you forget to do `bower install`?';
			grunt.fail.warn(message, 3);
			return false;
		}

		grunt.log.writeln('All files accounted for.');
		return true;
	});
};
