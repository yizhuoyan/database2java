const Assert=require("../util/Assert");
const DBProfileVM=function (){
	this.product="MySQL";
	this.host="127.0.0.1";
	this.port=3306;
    this.username="root";
	this.password="root";
	this.database="vip";
};


DBProfileVM.load=function(){
	let vm=new DBProfileVM();
	//1 product
	vm.product=$("#database-product").value;
	//2 host
	vm.host=Assert.stringNotBlank("HOST需指定(可设置为域名或IP)",$("#host").value);
	//3 port
	vm.port=Assert.stringNotBlank("端口需指定",$("#port").value);
	
	//4 数据库
	vm.database=Assert.stringNotBlank("数据库名称需指定",$("#database").value);
	//5 user
	vm.username=Assert.stringNotBlank("账号需指定",$("#username").value);
	//6 password
	vm.password=$("#password").value.trim();
	
	return vm;
};

DBProfileVM.prototype.equals=function(p){
	if(!p)return false;
	if(this===p){
		return true;
	}
	let key;
	for(key in p){
		if(p.hasOwnProperty(key)){
			if(this[key]!==p[key]){
				return false;
			}
		}
	}
	return true;
};




module.exports=DBProfileVM;