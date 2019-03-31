const Assert=require("../util/Assert");

const GenerateVM=function(){
	//1 检查表选择
	this.tableNames;
	//2 检查类名
	this.classNames;
	//3 检查包名
	this.packageName;
	//4 检查文件保存目录
	this.fileSaveDir;
	//5 选项
	this.generateOptions;
	//6 类型映射选项
	this.mappingOptions={};
};


GenerateVM.prototype.getClassNameByTableName=function(tableName){
	return this.classNames[this.tableNames.indexOf(tableName)];
};





GenerateVM.load=function(){
	
	const vm=new GenerateVM();
	//1 表名
	const tableNames=getSelectedTableNames();
	
	vm.tableNames=Assert.arrayNotEmpty("还未选择要生成的表",tableNames);
	
	//2 类名
	const classNames=vm.classNames=[];
	let className;
	for(let tableName of tableNames){
		className=$("#"+tableName+"-classNameInput").value;
		classNames.push(Assert.stringNotBlank("表【"+tableName+"】还未设置类名",className));
	}
	
	//3 包名
	vm.packageName=Assert.stringNotBlank("还未填写包名",$("#packageInput").value);
	//4 文件保存目录
	vm.fileSaveDir=Assert.stringNotBlank("还未选择文件保存目录",$("#saveDirInput").value);
	
	//5 选项
	const options=vm.generateOptions={};
	options["underlineOption"]=$("#underlineSelect").value;
	//6 类型映射选项
	const mp=vm.mappingOptions={};
	mp["datetime"]=$("#datetimeSelect").value;
	mp["timestamp"]=$("#timestampSelect").value;
	mp["date"]=$("#dateSelect").value;
	
	
	return vm;
}

/**
 * 获取已选中表名
 */
const getSelectedTableNames=function(){
	let tableNameCheckBoxs=document.getElementsByName("tableName");
	let result=[];
	for(let ck of tableNameCheckBoxs){
		if(ck.checked){
			result.push(ck.value);	
		}
	}
	return result;
};

module.exports=GenerateVM;


