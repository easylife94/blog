var main = require('./handlers/main.js');

module.exports = function(app){
	//main 路由
	app.get('/',main.home);
	app.get('/about',main.about);

	//article 路由
	app.get('/article',main.articles);
	app.get('/article/:id',main.article);
};