var main = require('./handlers/main.js');
var admin = require('./handlers/admin.js');
var filter =  require('./filter.js');;

module.exports = function(app){
	//main 路由
	app.get('/',main.home);
	app.get('/about',main.about);
	//article 路由
	app.get('/article',main.articles);
	app.get('/article/:id',main.article);
	app.post('/article/more',main.moreArticle);

	//管理员 路由
	app.get('/admin/login',admin.login);
	app.post('/admin/login',admin.doLogin);
	//app.post('/admin/article/edit',admin.doEditArticle);
	app.post('/admin/article/edit/upload-img',admin.uploadArticleImg);
	app.get('/admin/logout',admin.logout);
	app.get('/admin/console',filter.authorize,admin.console);
	app.get('/admin/article-edit',filter.authorize,admin.editArticle);
};