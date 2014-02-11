module.exports = function (grunt) {
	grunt.initConfig({
		connect: {
			server: { /* Подзадача */
				options: {
				keepalive: false, /* работать постоянно */
				port: 8000, /* номер порта */
				base: 'public' /* публичная директория */
			}
		}}, /* grunt-contrib-connect */
		fest: {
			templates: { /* Подзадача */
				files: [{
				expand: true,
				cwd: 'templates', /* исходная директория */
				src: '*.xml', /* имена шаблонов */
				dest: 'public/js/tmpl' /* результирующая директория */
			}],
				options: {
					template: function (data) { /* формат функции-шаблона */
					return grunt.template.process(
				/* присваиваем функцию-шаблон переменной */
						'var <%= name %>Tmpl = <%= contents %> ;',
						{data: data}
					);
					}
				}
			}
		},
		watch: {
				fest: { /* Подзадача */
					files: ['templates/*.xml'], /* следим за шаблонами */
					tasks: ['fest'], /* перекомпилировать */
					options: {
						atBegin: true, /* запустить задачу при старте */
						livereload: true
					}
				}
		}
	});
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-fest');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.registerTask('default', ['connect', 'watch']);
};
