const Assert=require("../util/Assert");
function ClassModel(){
	this.imports=[];
	this.packageName;
	this.className;
	this.fields=[];
}
ClassModel.prototype.addField=function(f){
	this.fields.push(f);
	//1 获取字段全类型
	let fullType=f.fullType;
	//2 截取包名
	let typePackageEndIndex=fullType.lastIndexOf('.');
	if(typePackageEndIndex!=-1){
		let typePackage=fullType.substring(0,typePackageEndIndex);
		if(typePackage!=="java.lang"){
			if(!this.imports[typePackage]){
				this.imports[typePackage]=true;
				this.imports.push(typePackage);
			}
		}
	}
}


function  FieldModel(){
	//列类型描述
	this.columnType;
	//java类型全限定类名
	this.fullType;
	//java类型名称(无包名)
	this.simpleType;
	//字段名称
	this.name;
	
	this.defaultValue;
	this.comment;
};
FieldModel.prototype.setName=function(name,options){
	if(options["underlineOption"]==="camel"){
		this.name=$.underline2camelcasing(name);
	}else{
		this.name=name;
	}
}
//设置
FieldModel.prototype.setColumnType=function(columnType,options){
	
	this.columnType=columnType;
	//2 去掉类型中的小括号
	let endIndex=columnType.lastIndexOf('(');
	columnType=columnType.substring(0,endIndex===-1?columnType.length:endIndex);
	
	//3 得到转换规则
	const mapping=Object.assign({},FieldModel.TYPE_MAPPING,options);
	console.log(mapping);	
	
	//4 得到java类型
	this.simpleType=this.fullType=mapping[columnType.toLowerCase()];
	
	//5 截取简单java类型
	let simpleTypeEndIndex=this.fullType.lastIndexOf('.');
	if(simpleTypeEndIndex!==-1){
		this.simpleType=this.fullType.substr(simpleTypeEndIndex+1);
	}
}


FieldModel.TYPE_MAPPING={
	"bit":"boolean",
	"tinyint":"int",
	"smallint":"int",
	"mediumint":"int",
	"int":"int",
	"integer":"int",
	"bigint":"int",
	"double":"double",
	"float":"float",
	"decimal":"double",
	"numeric":"double",
	
	"date":"java.time.LocalDate",
	"time":"java.time.LocalTime",
	"year":"int",
	"timestamp":"java.time.LocalDateTime",
	"datetime":"java.time.LocalDateTime",
	
	"char":"java.lang.String",
	"varchar":"java.lang.String",
	"tinytext":"java.lang.String",
	"text":"java.lang.String",
	"mediumint":"java.lang.String",
	"longtext":"java.lang.String"
	
	
	
}

module.exports={ClassModel,FieldModel};