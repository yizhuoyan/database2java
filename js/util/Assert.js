function Assert(){}


Assert.stringNotBlank=function(message,s){
	if(typeof s==='undefined'
	||s===null
	||(s=s.trim()).length===0
	){
		throw new Error(message);
	}
	return s;
};

Assert.arrayNotEmpty=function(message,arr){
	if(typeof arr==='undefined'
	||arr===null
	||arr.length===0
	){
		throw new Error(message);
	}
	return arr;
};

module.exports=Assert;