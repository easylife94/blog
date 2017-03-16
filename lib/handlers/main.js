var config = require("config");
var fs = require('fs');
var fortune = require('../fortune.js');
var db = require('../db-mysql.js');

exports.home = function(req,res,next){
	req.session.userName = 'test-user';

	//删除会话中的变量
	//delete req.session.userName;

	res.cookie('timestamp',new Date().getTime());
	res.cookie('token','blog-token',{signed:true});

	//首页第一次展示8条记录
	db("select id,img,title,brief,like_num,comment_num,tags,date_format(create_time, '%Y-%m-%d %H:%m:%S') create_time  from article order by create_time DESC limit 0,8",null,function(err,vals,fields){		
		res.render('home',{articles : vals,odestTime : vals[vals.length -1].create_time});
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
exports.moreArticle = function(req,res,next){
	if(req.xhr || req.accepts('json,html')==='json'){
		var beginTime = req.body.beginTime;
		if(beginTime == undefined || beginTime  == ''){
			res.send({ error: 'beginTime is null' }); 
		}else{
			db("select id,img,title,brief,like_num,comment_num,tags,DATE_FORMAT(create_time,'%Y-%m-%d %H:%m:%S') create_time from article where create_time < ? order by create_time DESC limit 0,8",beginTime,function(err,vals,fields){		
				console.log(vals);
				res.send({ articles: vals }); 
			});
		}
		// 如果发生错误,应该发送 { error: 'error description' }
		
	} 
	// else {
	// 	// 如果发生错误,应该重定向到错误页面
	//     res.redirect(303, '/thank-you');
	// }
}
exports.articleImg = function(req,res,next){
	var filename = req.params.filename;
	console.log(filename);
	var type = filename.split(".")[1];
	var path = config.blog.uploadImg+"/"+filename;
	console.log(path);
	fs.readFile(path,'binary',function(err, img) {
		var contentType = 'image/'+type;
		res.writeHead('200', {'Content-Type': contentType});    //写http头部信息
    	res.end(img,'binary');
	});
	 
}

