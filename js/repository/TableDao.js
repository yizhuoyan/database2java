const DBUtil=require("../repository/DBUtil");
const {TableEntity,TableColumnEntity}=require("../repository/TableEntity");

function TableDao(profile){
	this.profile=profile;
}


TableDao.prototype.selectColumnsByTable=function(tableName){
	let profile=this.profile;
	return new Promise(function(ok,fail){
		let sql =`SELECT
					column_name as columnName,
					column_default as defaultValue,
					column_type as columnType,
					column_comment as comment
					FROM 	information_schema.COLUMNS
					WHERE 
					table_schema =?
					AND table_name =?
					order by ORDINAL_POSITION`;
		let connection=DBUtil.getConnection(profile);		
		
			
		connection.query(sql, [profile.database,tableName], function(err, rows) {
			if(err){
				fail(err);
				connection.destory();
			}else{
				let columns=[];
				for(let i=0;i<rows.length;i++){
					columns.push(row2entity(rows[i]));
				}
				ok(columns);
			}
		});
	});
};

TableDao.prototype.selectTables = function() {
	let profile=this.profile;
	return new Promise(function(ok,fail){
		let sql = `select
					table_name as tableName
					from information_schema.tables
					where table_schema=?`;
		let connection=DBUtil.getConnection(profile);
		connection.query(sql, [profile.database], function(err, tables) {
			if(err){
				fail(err);
			}else{
				ok(tables.map(t => t["tableName"]));	
			}
		});
		
	});
};


let row2entity=function(row){
	const e=new TableColumnEntity();
	e.name=row["columnName"];
	e.dataType=row["columnType"];
	e.defaultValue=row["defaultValue"];
	e.comment=row["comment"];
	return e;
}

module.exports=TableDao;