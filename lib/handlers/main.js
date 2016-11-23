var fortune = require('../fortune.js');

exports.home = function(req,res){
	res.render('home',{fortune : fortune.getFortune(),});
};
exports.about = function(req,res){
	res.render('about',{
		pageTestScript:'/qa/tests-about.js'
	});
};
exports.contact = function(req,res){
	res.render('contact');
};
