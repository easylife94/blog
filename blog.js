var express = require('express');
var config = require('config');
var config =  require("config");
var bodyParser = require('body-parser');
var static = require('./lib/static');
var handlebars = require('express-handlebars')
					.create({
								defaultLayout:'main',
								extname:'.html',
								helpers:{
									static:function(name){
										return static.map(name);
									},
								}
							});

var routes = require('./lib/routes.js');
var credentials = require('./credentials.js');
var app = express();

app.use(express.static(__dirname + '/public'));
//禁用 x-powered-by 响应报头
app.disable('x-powered-by');
//设置模板引擎
app.engine('html',handlebars.engine);
app.set('view engine','html');
//设置应用监听端口号
app.set('port',process.envPORT || 8080);
//页面测试中间件
app.use(function(req,res,next){
	res.locals.showTests = app.get('env') !== 'production' &&
									req.query.test === '1';
	next();
});
//设置cookie中间件
app.use(require('cookie-parser')(credentials.cookieSecret));
//设置session中间件
app.use(require('express-session')());

// see https://github.com/expressjs/body-parser
// 添加 body-parser 中间件就可以了
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//加载路由
routes(app);



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