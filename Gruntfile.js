var static = require('./lib/static.js')

module.exports = function(grunt){

	//插件数组 ，加载插件
	[
		'grunt-cafe-mocha',
		'grunt-contrib-jshint',
		'grunt-contrib-less',
		'grunt-exec',
	].forEach(function(task){
		grunt.loadNpmTasks(task);
	});
	//配置插件
	grunt.initConfig({
		cafemocha:{
			all:{src:'qa/tests-*.js',options:{ui:'tdd'},}
		},
		jshint:{
			app:['blog.js','public/js/**/*.js','lib/**/*.js'],
			qa:['Gruntfiles.js','public/qa/**/*.js','qa/**/&.js'],
		},
		less:{
			development:{
				options:{
					customFunctions:{
						static:function(lessObject,name){
							return 'url("'+static.map(name.value)+'")';
						},
					}
				},
				files:{
					'public/css/main.css':'less/main.less'
				}
			},
		},
		exec:{
			// linkchecker:{cmd:'linkchecker http://localhost:8080'}
		}
	});
	//注册任务
	grunt.registerTask('default',['cafemocha','jshint','exec']);

}