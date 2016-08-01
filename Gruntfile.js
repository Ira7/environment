/*jslint node: true */
'use strict';

var pkg = require('./package.json');

//Using exclusion patterns slows down Grunt significantly
//instead of creating a set of patterns like '**/*.js' and '!**/node_modules/**'
//this method is used to create a set of inclusive patterns for all subdirectories
//skipping node_modules, bower_components, dist, and any .dirs
//This enables users to create any directory structure they desire.
var createFolderGlobs = function (fileTypePatterns) {
    fileTypePatterns = Array.isArray(fileTypePatterns) ? fileTypePatterns : [fileTypePatterns];
    var ignore = ['node_modules', 'bower_components', 'dist', 'temp', 'test', 'data', 'assets'];
    var fs = require('fs');
    return fs.readdirSync(process.cwd())
        .map(function (file) {
            if (ignore.indexOf(file) !== -1 || file.indexOf('.') === 0 || !fs.lstatSync(file).isDirectory()) {
                return null;
            } else {
                return fileTypePatterns.map(function (pattern) {
                    return file + '/**/' + pattern;
                });
            }
        })
        .filter(function (patterns) {
            return patterns;
        })
        .concat(fileTypePatterns);
};

module.exports = function (grunt) {

    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        yeoman: {
            // configurable paths
            app: 'app',
            dist: 'dist'
        },
        connect: {
            main: {
                options: {
                    hostname: '0.0.0.0',
                    base: '.',
                    port: 9000,
                    open: {
                        target: 'http://localhost:9000/app',
                        appName: 'Google Chrome'
                    },
                    middleware: function (connect, options, middlewares) {
                        middlewares.unshift(require('grunt-connect-proxy/lib/utils').proxyRequest);
                        return middlewares;
                    }
                },
                proxies: [
                //{
                //    context: '/token', // the path your application uses
                //    host: 'localhost', // wherever the data service is running
                //    port: 55210, // the port that the data service is running on
                //    https: false,
                //    xforward: false
                //},
                {
                    context: '/api', // the path your application uses
                    host: 'moe-dev-web-f01', // wherever the data service is running
                    port: 8000, // the port that the data service is running on
                    https: false,
                    xforward: false,
                    rewrite: {
                        //'^/api': '/api/v1/'
                    }
                }
                ]
            }
        },
        watch: {
            main: {
                options: {
                    livereload: true,
                    livereloadOnError: false,
                    spawn: false
                },
                files: [createFolderGlobs(['*.js', '*.less', '*.css', '*.html']), '!_SpecRunner.html', '!.grunt'],
                tasks: [] //all the tasks are run dynamically during the watch event handler
            }
        },
        jshint: {
            main: {
                options: {
                    jshintrc: '.jshintrc',
                    reporter: require('jshint-stylish')
                },
                src: createFolderGlobs(['*.js', '*-spec.js'])
            }
        },
        clean: {
            before: {
                src: ['dist', 'temp']
            },
            after: {
                src: ['temp']
            }
        },
        less: {
            production: {
                options: {},
                files: {
                    'temp/app.css': 'app/app.less'
                }
            }
        },
        ngtemplates: {
            main: {
                options: {
                    module: pkg.name,
                    htmlmin: '<%= htmlmin.main.options %>',
                    url: function (url) {
                        return url.replace('app/', '');
                    }
                },
                src: [createFolderGlobs('*.html'), '!app/index.html', '!_SpecRunner.html'],
                dest: 'temp/templates.js'
            }
        },
        copy: {
            main: {
                files: [
                    // {
                    //     cwd: 'app',
                    //     src: ['assets/**/*'],
                    //     dest: 'dist/',
                    //     expand: true
                    // },
                    {
                        cwd: 'app',
                        src: ['assets/favicon/**/*', 'assets/icons/*', 'assets/fonts/**/*', 'assets/fonts/bootstrap/*', 'assets/fonts/font-awesome/*', 'assets/imgs/**/*', 'assets/css/*.gif', 'assets/css/*.png', 'assets/css/fonts/*'],
                        dest: 'dist/app/',
                        expand: true
                    },
                    {
                        cwd: 'data',
                        src: ['**/*'],
                        dest: 'dist/app/data',
                        expand: true
                    },
                    {
                        cwd: 'app',
                        src: ['config.js', 'browserconfig.xml', 'manifest.json', 'favicon.ico'],
                        dest: 'dist/app/',
                        expand: true
                    },
                    {
                        cwd: 'dist',
                        src: ['app.full.min.css'],
                        dest: 'dist/app/assets/css/',
                        expand: true
                    }
                ]
            }
        },
        dom_munger: {
            read: {
                options: {
                    read: [
                        {
                            selector: 'script[data-concat!="false"]',
                            attribute: 'src',
                            writeto: 'appjs',
                            isPath: true
                        },
                        {
                            selector: 'link[rel="stylesheet"][data-concat!="false"]',
                            attribute: 'href',
                            writeto: 'appcss',
                            isPath: true
                        }
                    ]
                },
                src: 'app/index.html'
            },
            update: {
                options: {
                    remove: ['script[data-remove!="false"]', 'link[data-remove!="false"]'],
                    //update: {selector:'html', attribute:'manifest', value:'manifest.appcache'},
                    append: [
                        {
                            selector: 'body',
                            html: '<script src="app.full.min.js"></script><script src="config.js"></script>'
                        },
                        {
                            selector: 'head',
                            html: '<link rel="stylesheet" href="assets/css/app.full.min.css">'
                        }
                    ]
                },
                src: 'app/index.html',
                dest: 'dist/app/index.html'
            }
        },
        // csslint: {
        // main: {
        // options: {
        // csslintrc: '.csslintrc',
        // absoluteFilePathsForFormatters: true
        // },
        // src: createFolderGlobs(['assets/css/*.css'])
        // }
        // },
        cssmin: {
            main: {
                src: ['temp/app.css', '<%= dom_munger.data.appcss %>'],
                dest: 'dist/app/assets/css/app.full.min.css'
            }
        },
        concat: {
            main: {
                src: ['<%= dom_munger.data.appjs %>', '<%= ngtemplates.main.dest %>'],
                dest: 'temp/app.full.js'
            }
        },
        ngAnnotate: {
            main: {
                src: 'temp/app.full.js',
                dest: 'temp/app.full.js'
            },
            check: {
                /* TODO: remove check and re-add ugligy to build task */
                src: 'temp/app.full.js',
                dest: 'dist/app/app.full.min.js'
            }
        },
        uglify: {
            main: {
                src: 'temp/app.full.js',
                dest: 'dist/app/app.full.min.js'
            }
        },
        htmlmin: {
            main: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                },
                files: {
                    'dist/app/index.html': 'dist/app/index.html'
                }
            }
        },

        //Imagemin has issues on Windows.
        //To enable imagemin:
        // - "npm install grunt-contrib-imagemin"
        // - Comment in this section
        // - Add the "imagemin" task after the "htmlmin" task in the build task alias
        //imagemin: {
        //  main:{
        //    files: [{
        //      expand: true, cwd:'dist/',
        //      src:['**/{*.png,*.jpg}'],
        //      dest: 'dist/'
        //    }]
        //  }
        //},

        /**
         * The Karma configurations.
         */
        karma: {
            options: {
                configFile: 'test/karma.conf.js',
                    files: [ //this files data is also updated in the watch handler, if updated change there too
                        '<%= dom_munger.data.appjs %>',
                        '<%= yeoman.app %>/config.js',
                    'bower_components/angular-mocks/angular-mocks.js',
                    createFolderGlobs('app/**/*-spec.js'),
                    createFolderGlobs('app/**/*.html'),
                    createFolderGlobs('data/**/*.json')
            ],
                autoWatch: false, //watching is handled by grunt-contrib-watch
                singleRun: true, // change to false if you want to debug unit tests
    },
        all_tests: {
        browsers: ['Chrome']
        },
                during_watch: {
                    browsers: ['Chrome']
                    },
                    },

        /**
         * Protractor configuration
         */
        protractor: {
            e2e: {
                options: {
                    configFile: "test/protractor.conf.js", // Target-specific config file
                    args: {
                        // Arguments passed to the command
                    }
                }
            }
        },
        ngconstant: {
            // Options for all targets
            options: {
                space: '  ',
                wrap: true,
                name: 'moeEnvironmentConst',
            },
            // Environment targets
            development: {
                options: {
                    dest: '<%= yeoman.app %>/config.js'
                },
                constants: {
                    ENV: {
                        name: 'development',
                        apiEndpoint: '/api/v1/',
                        dataEndpoint: '/',
                        apiHeadersConf: { sAMAccountName: '01-111111118' }
                    }
                }
            },
            development_localhost: {
                options: {
                    dest: '<%= yeoman.app %>/config.js'
                },
                constants: {
                    ENV: {
                        name: 'development',
                        apiEndpoint: 'http://localhost:8000/api/v1/',
                        dataEndpoint: 'http://localhost:8000/api/v1/',
                        apiHeadersConf: { sAMAccountName: '01-111111118' }
                    }
                }
            },
            test: {
                options: {
                    dest: '<%= yeoman.app %>/config.js'
                },
                constants: {
                    ENV: {
                        name: 'test',
                        apiEndpoint: '/api/v1/',
                        dataEndpoint: '/api/v1/',
                        apiHeadersConf: {}
                    }
                }
            },
            production: {
                options: {
                    dest: '<%= yeoman.app %>/config.js'
                },
                constants: {
                    ENV: {
                        name: 'production',
                        apiEndpoint: '/api/v1/',
                        dataEndpoint: '/api/v1/',
                        apiHeadersConf: {}
                    }
                }
            }
        }

    });

    grunt.registerTask('build', ['ngconstant:production', 'jshint', 'clean:before', 'dom_munger', 'ngtemplates', 'cssmin', 'concat', 'ngAnnotate',  /*'uglify' ,*/ 'copy', 'htmlmin', 'clean:after']);     /* grunt.registerTask('build', ['ngconstant:production', 'jshint', 'clean:before', 'less', 'dom_munger', 'ngtemplates', 'cssmin', 'concat', 'ngAnnotate', 'uglify', 'copy', 'htmlmin', 'clean:after']);*/
    grunt.registerTask('run_localhost', ['ngconstant:development_localhost', 'dom_munger:read', 'jshint', 'configureProxies:main', 'connect', 'watch']);
    grunt.registerTask('run', ['ngconstant:development', 'dom_munger:read', 'jshint', 'configureProxies:main', 'connect', 'watch']);
    grunt.registerTask('test', ['ngconstant:test', 'dom_munger:read', 'karma:all_tests']);
    grunt.registerTask('e2e', ['dom_munger:read', 'protractor']);

    grunt.event.on('watch', function (action, filepath) {
        //https://github.com/gruntjs/grunt-contrib-watch/issues/156

        var tasksToRun = [];

        if (filepath.lastIndexOf('.js') !== -1 && filepath.lastIndexOf('.js') === filepath.length - 3) {

            //lint the changed js file
            grunt.config('jshint.main.src', filepath);
            tasksToRun.push('jshint');

            //find the appropriate unit test for the changed file
            var spec = filepath;
            if (filepath.lastIndexOf('-spec.js') === -1 || filepath.lastIndexOf('-spec.js') !== filepath.length - 8) {
                spec = filepath.substring(0, filepath.length - 3) + '-spec.js';
            }

            //if the spec exists then lets run it
            if (grunt.file.exists(spec)) {
                var files = [].concat(grunt.config('dom_munger.data.appjs'));
                files.push('app/config.js');
                files.push('bower_components/angular-mocks/angular-mocks.js');
                files.push(spec);
                grunt.config('karma.options.files', files);
                tasksToRun.push('karma:during_watch');
            }
        }

        //if index.html changed, we need to reread the <script> tags so our next run of karma
        //will have the correct environment
        if (filepath === 'app/index.html') {
            tasksToRun.push('dom_munger:read');
        }

        grunt.config('watch.main.tasks', tasksToRun);

    });

};

