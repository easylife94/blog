var fortune = require('../fortune.js');
var db = require('../db-mysql.js');

exports.home = function(req,res,next){
	req.session.userName = 'test-user';

	//删除会话中的变量
	//delete req.session.userName;

	res.cookie('timestamp',new Date().getTime());
	res.cookie('token','blog-token',{signed:true});

	//首页第一次展示8条记录
	db("select id,img,title,brief,like_num,comment_num,tags from article order by create_time DESC limit 0,8",null,function(err,vals,fields){		
		res.render('home',{articles : vals});
	});
	
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
};
exports.article = function(req,res,next){
	db("select * from article where id = ? limit 0,1",req.params.id,function(err,vals,fields){
		console.log(vals);
		if(vals != null && vals.length > 0){
			res.render('article',{article : vals[0]});
		}else{
			res.redirect('article-not-found',{article : vals[0]});
		}
		
	});
};
exports.articleNotFound = function(req,res,next){
	res.render('article-not-found');
}
