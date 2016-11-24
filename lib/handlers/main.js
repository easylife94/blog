var fortune = require('../fortune.js');

exports.home = function(req,res,next){
	req.session.userName = 'test-user';

	//删除会话中的变量
	//delete req.session.userName;

	res.cookie('timestamp',new Date().getTime());
	res.cookie('token','blog-token',{signed:true});



	res.render('home',{fortune : fortune.getFortune(),});
};
exports.about = function(req,res,next){
	res.render('about',{
		pageTestScript:'/qa/tests-about.js'
	});
};
exports.contact = function(req,res,next){
	res.render('contact');
};
var articles = [
	{ id:1 , name :'刺客入门' },
	{ id:2 , name :'刺客拳击训练' },
	{ id:3 , name :'刺客袖剑训练' },
	{ id:4 , name :'刺客火器训练' },
	{ id:5 , name :'信仰之跃' },
];
exports.articles = function(req,res,next){
	res.render('articles',{articles:articles});
}
exports.article = function(req,res,next){

	var name;
	for(var i in articles){
		if(articles[i].id == req.params.id){
			name = articles[i].name;
			break;
		}
	}
	if(name == null) return next();
	res.render('article',{name:name});
};
