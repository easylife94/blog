var express = require('express');
var handlebars = require('express-handlebars')
					.create({defaultLayout:'main'});
var app = express();

app.use(express.static(__dirname + '/public'));
//禁用 x-powered-by 响应报头
app.disable('x-powered-by');
//设置模板引擎
app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
//设置应用监听端口号
app.set('port',process.envPORT || 8080);
//页面测试中间件
app.use(function(req,res,next){
	res.locals.showTests = app.get('env') !== 'production' &&
									req.query.test === '1';
	next();
});
//这里的 get  代表HTTP GET
app.get('/',function(req,res){
	// res.type('text/plain');
	res.render('home');
});
app.get('/about',function(req,res){
	// res.type('text/plain');
	res.render('about',{
		pageTestScript:'/qa/tests-about.js'
	});

});
app.get('/contact',function(req,res){
	res.render('contact');
});

//use  中间件
app.use(function(req,res){
	res.status(404);
	res.render('404');
});

app.use(function(err,req,res,next){
	console.log(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'),function(){
	console.log('Blog started . Listening port '+app.get('port'));
});

//js 代码检查
if(app.thing === null) console.log('bleat!');