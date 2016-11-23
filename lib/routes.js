var main = require('./handlers/main.js');

module.exports = function(app){
	//main 路由
	app.get('/',main.home);
	app.get('/about',main.about);

};