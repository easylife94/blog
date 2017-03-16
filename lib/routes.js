var main = require('./handlers/main.js');
var config = require('config');
var multer = require('multer');
var upload = multer({ dest: config.blog.uploadImg});
var admin = require('./handlers/admin.js');


module.exports = function(app){
	//main 路由
	app.get('/',main.home);
	app.get('/about',main.about);
	//article 路由
	app.get('/article',main.articles);
	app.get('/article/:id',main.article);
	app.post('/article/more',main.moreArticle);
	app.get('/article/img/:filename',main.articleImg);
	//管理员 路由
	app.get('/admin/login',admin.login);
	app.post('/admin/login',admin.login2);
	app.get('/admin/article/edit',admin.editArticle);
	app.post('/admin/article/edit',admin.doEditArticle);
	app.post('/admin/article/edit/upload-img',upload.single('editormd-image-file'),admin.uploadArticleImg);
	
};