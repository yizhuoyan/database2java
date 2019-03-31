const fs=require("fs");
const TEMPLATE_FILE_DIRECTORY="./template";

const templateFiles={};

const load=function(){
	fs.readdirSync(TEMPLATE_FILE_DIRECTORY).forEach(function(f){
		//6 读取模板
		const bytes=fs.readFileSync(TEMPLATE_FILE_DIRECTORY+"/"+f,'utf8');
		templateFiles[f]=bytes;
	});
	
	return templateFiles;
}
module.exports={
	load
};
