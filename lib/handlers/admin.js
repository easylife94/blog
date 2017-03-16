var fs = require('fs');
var config = require('config');
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

