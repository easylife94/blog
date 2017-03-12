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