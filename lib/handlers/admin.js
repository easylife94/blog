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

 	var messgae = null;
 	var success = 0;
 	var url = null;
 	if(req.file == null){
		messgae = "无上传图片";
		console.log(1);
 	}else{
 		var mimetypes = req.file.mimetype.split("/");
 		if(mimetypes[0] != "image"){
 			message = "只能上传图片";
 		}else if(req.file >　config.blog.uploadImgSize){
 			message = "上传图片超过"+(confi.blog.uploadImgSize/1048576)+"MB";
 		}else{
 			console.log(req.file);
 			success = 1;
 			var path = req.file.path;
 			fs.rename(path,path+"."+mimetypes[1],function(){});
 			url = "/article/img/"+req.file.filename+"."+mimetypes[1];
 		}
 	}
 	if(success == 0){
 		//移除文件
 		fs.unlink(req.file.path,function(){});
 	}
 	res.send({
 		success : success,           // 0 表示上传失败，1 表示上传成功
        message : messgae,
        url     : url        // 上传成功时才返回
 	});
}
exports.logout = function(req,res,next){
	req.session.admin = null;
	res.redirect('/admin/login');
}