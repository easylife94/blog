module.exports = function(grunt){

	//插件数组 ，加载插件
	[
		'grunt-cafe-mocha',
		'grunt-contrib-jshint',
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
		exec:{
			// linkchecker:{cmd:'linkchecker http://localhost:8080'}
		}
	});
	//注册任务
	grunt.registerTask('default',['cafemocha','jshint','exec']);

}