let $=function(str,ctx=document){
	let result=ctx.querySelectorAll(str);
	if(result.length===0)return null;
	if(result.length===1)return result[0];
	return result;
};

$.assertNotBlank=function(el,message){
	
};
$.upperFirstLetter=function(s){
	let cs=s.split("");
	let c=cs[0];
	if('a'<=c&&c<='z'){
		cs[0]=c.toUpperCase();
	}
	return cs.join("");
}
/**
 * 下划线分别改为驼峰命名法
 */
$.underline2camelcasing=function(s,upperFirstLetter){
	let parts=s.split("_");
	let end=upperFirstLetter?0:1;
	for(let i=parts.length;i-- >end;){
		parts[i]=$.upperFirstLetter(parts[i]);
	}
	return  parts.join("");
}



