package $(m.packageName);
<-for(let imp of m.imports){->
import $(imp);
<-}->

/**
 * 
 *@Auther yizhuoyan
 * 
 */
public class $(m.className){
	
	<-for(let f of m.fields){->
		/**$(f.comment)*/
		private $(f.simpleType) $(f.name)$(f.defaultValue?"="+f.defaultValue:"");		
	<-}->
}