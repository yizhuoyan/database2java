const mysql = require("mysql");
/*
*/
let DBUtil=function(){};

let currentProfile;
let connection;


DBUtil.getConnection=function(profile){
	if(!profile){
		throw new Error("无法获取连接，无profile");
	}
	//同一个profile
	if(profile.equals(currentProfile)){
		//判断是否关闭
		if(connection&&connection.state==="connected"){
			return connection;	
		}
		
	}
	currentProfile=profile;
	return connection=mysql.createConnection({
		host:profile.host||"127.0.0.1",
		port:profile.port||3306,
		database:profile.database,
		user:profile.username,
		password:profile.password
	});
};

module.exports=DBUtil;