const DBProfileVM = require("./js/vm/DBProfileVM");
const GenerateVM = require("./js/vm/GenerateVM");
const service=require("./js/service");

//当前dbProfile
let currentDBProfile;


//连接数据库按钮点击事件处理	
$("#connectionBtn").addEventListener("click", function(evt) {
	this.disabled=true;
	//加载视图模型
	try{
		currentDBProfile=DBProfileVM.load();
	}catch(e){
		this.disabled=false;
		toast(e);
		return;
	}
	//加载表
	service.loadDatabaseTableNames(currentDBProfile)
	.then(function(tables){
		//计算出对应类名
		let result=tables.map(t=>{
			return {
				tableName:t,
				//首字母要大写
				className:$.underline2camelcasing(t,true)
			}
		});
		
		$("#table-list-view-tbody").innerHTML=paintTablesList(result);
		
	}).catch(err=>{
		if(err.errno==="ECONNREFUSED"){
			alert("数据库拒绝连接，请检查数据库配置");
		}else{
			alert(err);
		}
	}).finally(()=>{
		this.disabled=false;
	});

});

/**
 * 表名行添加事件监听
 */
$("#table-list-view-tbody").addEventListener("click", function(evt) {
		evt.stopPropagation();
		let target = evt.target;
		if (target.tagName === "TD") {
			let checkBox = target.parentNode.getElementsByTagName("input")[0];
			if(checkBox.checked){
				checkBox.checked=false;
			}else{
				checkBox.checked=true;
			}
		}
		
});

/**
 * 执行按钮
 */
$("#action-btn").addEventListener("click",function(evt){
	//1 禁用按钮
	this.disabled=true;
	//2 任务输入对象
	let generateVM;
	try{
		//从视图加载生成文件参数的ViewModel对象
		generateVM=GenerateVM.load();
	}catch(e){
		toast(e.message);
		this.disabled=false;
	}
	//异步开启任务
	service.generateFiles(currentDBProfile,generateVM).then(function(taskResults){
		alert("生成完毕,共生成"+taskResults.length+"个文件");	
	}).catch(function(e){
		console.log(e);
		alert(e.message);
	}).finally(()=>{
		this.disabled=false;
	});
});







