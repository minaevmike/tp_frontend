module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            fest: {
                files: ['templates/*.xml'],
                tasks: ['fest'],
                options: {
                    atBegin: true
                }
            },
            server: {
                files: [
                    'public/js/**/*.js',
                    'public/css/**/*.css'
                ],
                options: {
                    interrupt: true,
                    livereload: true
                }
            },
            concat: {
				files: [
					'public/css/**/*.css'
				],
				tasks: ['concat'],
				options:{
					atBegin: true,
				}
			},
        },
        connect: {
            server: {
                options: {
                    livereload: true,
                    port: 8000,
                    base: 'public'
                }
            }
        },
        fest: {
            templates: {
                files: [{
                    expand: true,
                    cwd: 'templates',
                    src: '*.xml',
                    dest: 'public/js/tmpl'
                }],
                options: {
                    template: function (data) {
                        return grunt.template.process(
                            'define(function () { return <%= contents %> ; });',
                            {data: data}
                        );
                    }
                }
            }
        },
        concat: {
			css: {
				src: ['public/css/**/*.css'],
				dest: 'public/common.css'
			}
		},
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-fest');
   	grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['connect', 'watch', 'concat']);

};

