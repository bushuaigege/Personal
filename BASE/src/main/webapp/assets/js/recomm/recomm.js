var jq;

var initRecommInfos = {
	initFactory:function(){
		if(jq)return null;
		
		jq = new Object();
		jq.recommsTb = $("#recommsTb");
		jq.recommMatchMenu = $("#recommMatchMenu");
		
	},
	
	/**赛事推荐表格*/
	buildRecommsTb:function(){
		var vo = VoDataGrid('id',false,false,jq.recommsTb,true);
		Grid.recommMatchs(vo);
		
		/**初始化编辑表格功能*/
		vo.table.edatagrid({
			url:Constans.appName + '/recomms/matchs',
			method:'get',
			fit:true,
			pageList : [30,45,60],
			pageSize : 30,
			pagination:true,
		});
		
	},
	/**热门推荐推送首页*/
	pushHome:function(t,recommId){
		var isok = $(t).hasClass("icon-right"),cls;

		$.post(String.format(Constans.appName + '/recomms/pushHome/{0}/{1}',recommId,isok ? 0 : 1),function(result){
			if(result.res){
				$(t).toggleClass("icon-right");$(t).toggleClass("icon-error");
			}
		});
	}
};


$(function(){	
	initRecommInfos.initFactory();
	/**初始化右键菜单*/
	initCompent.initRightKeyMenu(jq.recommsTb,jq.recommMatchMenu);
	/**初始化表格*/
	initRecommInfos.buildRecommsTb();
});	