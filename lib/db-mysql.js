var mysql = require("mysql");
var config =  require("config");
var pool = mysql.createPool({
	host:config.database.host,
	user:config.database.user,
	password:config.database.password,
	database:config.database.database,
	port:config.database.port
});

var query = function(sql,params,callback){
	pool.getConnection(function(err,conn){
		if(err){
			callback(err,null,null);
		}else{
			conn.query(sql,params,function(qerr,rows,fields){
				conn.release();
				callback(qerr,rows,fields);
			});
		}
	});
};
module.exports = query;