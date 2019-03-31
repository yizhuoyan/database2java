function TableEntity(){
	this.name;
	this.columns;
}

function TableColumnEntity(){
	this.name;
	this.dataType;
	this.defaultValue;
	this.comment;
}

module.exports={TableEntity,TableColumnEntity};