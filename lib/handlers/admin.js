var db = require('../db-mysql.js');


exports.login = function(req,res,next){
	//跳转登录页
	res.render('login',{layout: false})
};
exports.doLogin = function(req,res,next){

	var isAjax = false;
	if(req.xhr || req.accepts('json,html')==='json'){
		isAjax = true;
	}

	//登录请求
	db("select * from blog.admin where name = ? limit 0,1",req.body.admin,function(err,vals,fields){		
		
		var err = null;
		var code = null;
		if(vals != null && vals.length > 0) {
			var val = vals[0];
			if(val.passwd == req.body.password){
				req.session.admin = {
					id: val.id,
					name : val.name,
				}
				code = 1;
			}else{
				err = "用户名或密码不正确";
			}
 		}else{
 			err = "用户名或密码不正确";
 		}	

		if(isAjax){
			res.send({
				code:code,
				err:err,
			});
		}else{
			if(!err){
				res.redirect('/admin/console');
			}else{
				res.redirect('/admin/login?err='+err);
			}
			
		}
	});
};

exports.console  = function(req,res,next){
	res.render('admin-console',{layout: "admin"});

}
exports.editArticle  = function(req,res,next){
	res.render('article-edit',{layout: "admin"});
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
exports.logout = function(req,res,next){
	req.session.admin = null;
	res.redirect('/admin/login');
}