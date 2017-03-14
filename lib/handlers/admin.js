var db = require('../db-mysql.js');
exports.login = function(req,res,next){
	//跳转登录页
	res.render('login')
};
exports.login2 = function(req,res,next){
	//登录请求
	//成功则跳转
	//失败则返回错误信息
};
exports.editArticle  = function(req,res,next){
	res.render('article-edit');
}
exports.doEditArticle = function(req,res,next){
	console.log(req.body.title);
	console.log(req.body.context);
}
exports.uploadArticleImg = function(req,res,next){
	console.log(req.body);
 	console.log(req.files);

 	res.send({
 		success : 0 | 1,           // 0 表示上传失败，1 表示上传成功
        message : "提示的信息，上传成功或上传失败及错误信息等。",
        url     : "/img/blog-avatar.png"        // 上传成功时才返回
 	});
}