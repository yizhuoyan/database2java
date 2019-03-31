const TableDao=require("./repository/TableDao");
const {ClassModel,FieldModel}=require("./dto/ClassModel");
const templateFileLoader=require("./templateFileLoader");
const fs = require("fs");
const path = require("path"); 

//模板文件内容生成方法
let templateFileFunctions={};

try{
	const templateFiles=templateFileLoader.load();
	for(let f in templateFiles){
		templateFileFunctions[f]=new TemplateFunction(f+"(m)",templateFiles[f]).build();
	}
	console.log(templateFileFunctions);
}catch(e){
	console.error(e);
	alert("无法加载模板文件，请检查template目录下文件");
}
/**
 * 通过数据库名称查找表名称
 */
const loadDatabaseTableNames=function(profile){
	let dao=new TableDao(profile);
	return 	dao.selectTables();
};

/**
 * 生成文件
 */
let generateFiles=function(profileVM,generateVM){
	let dao=new TableDao(profileVM);
	//所有异步任务
	let allTask=[];
	//遍历表
	for(let table of generateVM.tableNames){
		//添加异步任务
		allTask.push(new Promise(function(ok,fail){
			
			dao.selectColumnsByTable(table).then(function(columns){
				try{
					generateClassFile(generateVM,table,columns);
					ok(1);
				}catch(e){
					fail(e);
				}
			}).catch(fail);
		})); 
	}	
		
	return Promise.all(allTask);
};
/**
 * 生成模板文件
 */
const generateClassFile=function(generateModel,tableName,columns){
	const classModel=new ClassModel();
	
	//2 package
	classModel.packageName=generateModel.packageName;
	//3 className
	classModel.className=generateModel.getClassNameByTableName(tableName);
	//4 fields
	for(let col of columns){
		classModel.addField(column2field(col,generateModel));
	}
	// 5 创建存放包目录
	let saveDir=generateModel.fileSaveDir;
	saveDir+="/"+classModel.packageName.replace(".","/");
	mkdirsSync(saveDir);
	
	//6 获取模板
	for(let f in templateFileFunctions){
		const fileContents=templateFileFunctions[f].call(window,classModel);
		let fileName=saveDir+"/"+classModel.className+".java";
		fs.writeFileSync(fileName,fileContents,{encoding:"utf-8"});
	}
}

const mkdirsSync=function(file){
	if(fs.existsSync(file)){
		return;
	}
	mkdirsSync(path.dirname(file));
	fs.mkdirSync(file,{recursive:true});
}

const column2field=function(col,generateModel){
	const f=new FieldModel();
	f.setName(col.name,generateModel.generateOptions);
	f.setColumnType(col.dataType,generateModel.mappingOptions);
	f.comment=col.comment;
	f.defaultValue=col.defaultValue;
	return f;
}

module.exports={loadDatabaseTableNames,generateFiles};

