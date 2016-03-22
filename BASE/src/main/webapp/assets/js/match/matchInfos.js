var jq;

var initMatchInfos = {
	initFactory:function(){
		if(jq)return null;
		
		jq = new Object();
		jq.matchInfo = $("#matchInfo");
		jq.matchMenu = $("#matchMenu");
		
		jq.ysEditDialog = $("#ysEditDialog"); 
		jq.ysForm = $("#ysForm");
		
		jq.reviewDialog = $("#reviewDialog");
		jq.reviewForm = $("#reviewForm");
		
		jq.extensionDialog = $("#extensionDialog");
		jq.extensionForm = $("#extensionForm");
		
		jq.aoHisRsDialog = $("#aoHisRsDialog");
		jq.aoHisRsForm = $("#aoHisRsForm");
		jq.reviewAoType = $("#reviewAoType");
	},
	
	/**赛事表格*/
	buildMatchTb:function(){
		var vo = VoDataGrid('id',false,false,jq.matchInfo,true);
		Grid.MatchInfos(vo);
	},
	
	/**显示初始赔率Dialog*/
	buildOddsDialog:function(){
		var row = Publishtools.getSelects(jq.matchInfo);
		if(!Publishtools.isSelected2One(row))return false;
		
		$.getJSON(String.format(Constans.appName + '/ysdt/odds/{0}/{1}',row[0].scheduleId,1),function(rs){
			if(rs.length)
				jq.ysForm.form('load',{
					win:rs[0].win,
					draw:rs[0].draw,
					loss:rs[0].loss
				});
		});
		
		/**避免不存在请求不存在数据时,为matchId赋值*/
		jq.ysForm.form('load',{matchId:row[0].scheduleId});
		
		jq.ysForm.form({
			url:Constans.appName + '/match/changeOdds',
			success:function(rs){ 
				initCompent.validateResult(rs, ['更新初始赔率成功!!!','更新初始赔率失败!!!'], jq.ysEditDialog, jq.ysForm);
	 		}  
		}); 
		initCompent.initDialog('初始赔率,我来添加',jq.ysEditDialog,jq.ysForm, 570, 160);
	},
	
	
	
	/**显示点评Dialog*/
	buildReviewDialog:function(matchId){
		
		/**避免不存在请求不存在数据时,为matchId赋值*/
		jq.reviewForm.form('load',{matchId:matchId});
		
		/**matchId赛事自增长ID*/
		$.get(Constans.appName + '/review/get/' + matchId,function(result){
			if(result)
				jq.reviewForm.form('load',{
					id:result.id,
					win:result.win,
					draw:result.draw,
					loss:result.loss,
					content:result.content
				});
		});
		
		jq.reviewForm.form({  
			url:Constans.appName + '/review/amend',
			success:function(rs){ 
				initCompent.validateResult(rs, ['更新赛事点评成功!!!','更新赛事点评失败!!!'], jq.reviewDialog, jq.reviewForm);
	 		}  
		}); 
		
		initCompent.initDialog('牛人点评,我来添加',jq.reviewDialog,jq.reviewForm, 600, 350);
	},
	
	
	
	pushHomeOrTop:function(t,matchId){
		var isok = $(t).hasClass("icon-right"),type = $(t).attr("type");
		var baseUrl = Constans.appName + '/match/push/{0}/{1}/{2}',url,cls;
		
		/**0 首页  1资讯置顶*/
		$.post(String.format(baseUrl,matchId,type,isok ? 0 : 1),function(result){
			if(result.res){
				$(t).toggleClass("icon-right");$(t).toggleClass("icon-error");
			}
		},'json');
	},
	
	addExtension:function(){
		var row = Publishtools.getSelects(jq.matchInfo);
		if(!Publishtools.isSelected2One(row))return false;
		
		
		/**避免不存在请求不存在数据时,为matchId赋值*/
		jq.extensionForm.form('load',{matchScheduleId:row[0].id,handicapRoad:0});
		
		$.getJSON(String.format(Constans.appName + '/match/rs/q/{0}',row[0].id),function(rs){
			if(rs)
			jq.extensionForm.form('load',{
				id:rs.id,
				home:rs.home,
				away:rs.away,
				initHandicap:rs.initHandicap,
				initWl:rs.initWl,
				endHandicap:rs.endHandicap,
				spotWl:rs.spotWl,
				handicapRoad:rs.handicapRoad
			 });
		});
		
		jq.extensionForm.form({
			url:Constans.appName + '/match/rs/s',
			success:function(rs){ 
				initCompent.validateResult(rs, ['更新补充数据成功!!!','更新补充数据失败!!!'], jq.extensionDialog, jq.extensionForm);
	 		}  
		});
		
		initCompent.initDialog('额外数据,我来补充',jq.extensionDialog,jq.extensionForm, 570, 250);
	},
	
	/**根据时间筛选比赛*/
	reload4Time:function(){
		var startT = $('#startTime').datetimebox('getValue'),endT = $('#endTime').datetimebox('getValue');
		
		/**时间校验*/
		if(new Date(startT) > new Date(endT)){
			initCompent.msgTips("开始时间不能大于结束时间!!!");
			return;
		}
		
		jq.matchInfo.datagrid('load',{
			startTime:startT,
			endTime: endT
		});
	},
	
	/**添加点评澳彩历史数据*/
	addhisRs:function(){
		var row = Publishtools.getSelects(jq.matchInfo);
		if(!Publishtools.isSelected2One(row))return false;
		
		/**避免不存在请求不存在数据时,为matchId赋值*/
		jq.aoHisRsForm.form();
		
		jq.aoHisRsForm.form({
			url:Constans.appName + '/review/hisRs/update',
			load:{matchId:row[0].id,type:0},
			onSubmit: function(){    
				if(jq.reviewAoType.combobox('getValue') == 0){
					initCompent.msgTips("请先选择要操作的临场类型!!!");
					return false;
				}
				return true;
			},    
			success:function(rs){ 
				initCompent.validateResult(rs, ['更新点评澳彩历史数据成功!!!','更新点评澳彩历史数据失败!!!'], jq.aoHisRsDialog, jq.aoHisRsForm);
	 		}  
		});
		
		initCompent.initDialog('点评澳客历史数据,马上增加',jq.aoHisRsDialog,jq.aoHisRsForm, 570, 300);
	},
	
	/**切换澳彩数据类型*/
	toggleType:function(record){
		var row = Publishtools.getSelects(jq.matchInfo);
		
		/**避免不存在请求不存在数据时,为matchId赋值*/
		jq.aoHisRsForm.form('load',{matchId:row[0].id,
					id:null,
					win:null,draw:null,loss:null,
					upHandicap:null,goHandicap:null,
					downHandicap:null,choiceness:null});
		
		$.getJSON(String.format(Constans.appName + '/review/getHistoryRs/{0}/{1}',row[0].id,record.value),function(rs){
			if(rs)
				jq.aoHisRsForm.form('load',{
					id:rs.id,
					matchId:rs.matchId,
					win:rs.win,
					draw:rs.draw,
					loss:rs.loss,
					choiceness:rs.choiceness,
					upHandicap:rs.upHandicap,
					goHandicap:rs.goHandicap,
					downHandicap:rs.downHandicap
				 });
		});
	}
	
};


$(function(){	
	initMatchInfos.initFactory();
	/**初始化右键菜单*/
	initCompent.initRightKeyMenu(jq.matchInfo,jq.matchMenu);
	/**初始化表格*/
	initMatchInfos.buildMatchTb();
});	