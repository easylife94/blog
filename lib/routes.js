const config = require('config');
const multer = require('multer');
const upload = multer({ dest: config.blog.uploadImgDir});
const main = require('./handlers/main.js');
const admin = require('./handlers/admin.js');
const filter =  require('./filter.js');;

module.exports = function(app){
	//main 路由
	app.get('/',main.home);
	app.get('/about',main.about);
	app.get('/article',main.articles);
	app.get('/article/:id',main.article);
	app.post('/article/more',main.moreArticle);
	app.get('/article/');
	app.get('/article/img/:filename',main.articleImg);
	app.get('/article-not-found',main.articleNotFound);
	//admin 路由
	app.get('/admin/login',admin.login);
	app.post('/admin/login',admin.doLogin);
	app.get('/admin/logout',admin.logout);	
	app.get('/admin/console',filter.authorize,admin.console);
	app.get('/admin/article/edit',filter.authorize,admin.editArticle);
	app.post('/admin/article/edit',filter.authorize,admin.doEditArticle);
	app.post('/admin/article/edit/upload-img',filter.authorize,
				upload.single('editormd-image-file'),admin.uploadArticleImg);
	app.get('/admin/articles',filter.authorize,admin.articles);
};