var tagHTML = {
		leagueCnName:'<a class="ls" href="javascript:void(0)" style="background-color:{0}">{1}</span>',
		rightOrfailureIcon:'<span class="icon {0}" title="{1}" class="easyui-tooltip"></span>',
		matchTopOrHot:'<span class="icon {0}" title="{1}" onclick="initMatchInfos.pushHomeOrTop(this,{2});" type={3}></span>',
		initialOddsBTN:'<a href="javascript:initMatchInfos.buildOddsDialog();" class="editcls">初始赔率</a>',
		matchComments:'<a href="javascript:initMatchInfos.buildReviewDialog({0});" class="editcls">点评</a>',
		tips:'<span title="{0}" class="easyui-tooltip">{1}</span>',
		userHref:'<a href="javascript:void(0)" onclick="initRecommInfos.showUserDetail({0});">{1}</a>',
		levelHref:'<a href="javascript:void(0)" onclick="initRecommInfos.showLevelDetail({0});">{1}</a>',
		recommPushHome:'<span class="icon {0}" title="{1}" class="easyui-tooltip" onclick="initRecommInfos.pushHome(this,{2});"></span>',
		newsTopOrHot:'<span class="icon {0}" title="{1}" onclick="buildNews.pushHomeOrTop(this,{2},{3});"></span>',
		watchContent:'<a href="/ticket-web/sports_info/find_by_id/{0}" target="_blank">文章详情</a>',
		watchNotice:'<a href="/ticket-web/site_notic/find_by_id/{0}" target="_blank">公告详情</a>',
};

var Grid = {
		/**Data基本属性字段*/
		BaseField:function(vo){
			vo.table.datagrid({
				/**斑马线*/
				striped:true,
				/**数据长度超出列宽时将会自动截取*/
				nowrap:true,
				/**点击checkbox是否选中行*/
				selectOnCheck:true,
				/**支持Ctrl选择*/
				ctrlSelect:true,
				/**显示行号*/
				rownumbers:true,
				/**自动使列适应表格宽度以防止出现水平滚动*/
				fitColumns:false,
				/**宽度*/
				width:vo.width,
				/**高度*/
				height:vo.height,
				/**该条记录的标识字段*/
				idField:vo.idField,
				loadMsg:'小编正在拼了命为你加载^V^.....',
				/**是否自适应屏幕*/
				fit:vo.fit,
				/**点击行时是否关联选中checkbox*/
				checkOnSelect:vo.checkOnSelect,
				/**是否单选*/
				singleSelect:vo.singerSelect,
				/**页面排序字段*/
				remoteSort:false,
				multiSort:true,
				pageList : [30,45,60],
				pageSize : 30,
				pagination:true,
			});
		},
		BuildGridfoot:function(table){
			// 显示分页信息的底部显示栏
			var p = table.datagrid('getPager');
  			$(p).pagination({
  				// 每页显示多少条记录
				pageSize: 30,
       			// 显示分页信息的文字   
        		beforePageText: '第',
        		afterPageText: '页    共 {pages} 页',  
        		displayMsg: '当前显示 {from} - {to} 条记录   共 {total} 条记录'
    		}); 
		},
		
		
		/**赛事表格*/
		MatchInfos:function(vo){
			this.BaseField(vo);
			vo.table.datagrid({
				url:Constans.appName + '/match/infos',
				frozenColumns:[[
		                {field:'ck',checkbox:true},
		                {title:'id',field:'id',hidden:true}
	                ]],
				columns:[[
					{title:'赛事序号',field:'matchOrder',align:'center'},
					{title:'联赛名称',field:'leagueCnName',align:'center',formatter:function(value,row,index){
						return String.format(tagHTML.leagueCnName,row.bgcolor,value);
					}},
					{title:'比赛时间',field:'matchTime',sortable:true,align:'center',formatter:function(value,row,index){
						return new Date(value).Format("MM-dd hh:mm");
					}},
					{title:'主队',field:'homeName',align:'center'},
					{title:'主队让球',field:'handicapNumber',sortable:true,align:'center'},
					{title:'客队',field:'awayName',align:'center'},
					
					{title:'是否首页',field:'isHot',align:'center',formatter:function(value,row,index){
						var rs;
						if(value)
							rs = String.format(tagHTML.matchTopOrHot,"icon-right","已推送首页",row.id,0);
						else
							rs = String.format(tagHTML.matchTopOrHot,"icon-error","未推送首页",row.id,0);
						return rs;
					}},
					
					{title:'是否置顶',field:'isTop',align:'center',formatter:function(value,row,index){
						var rs;
						if(value)
							rs = String.format(tagHTML.matchTopOrHot,"icon-right","已置顶",row.id,1);
						else
							rs = String.format(tagHTML.matchTopOrHot,"icon-error","未置顶",row.id,1);
						return rs;
					}},
					
					{title:'赢胜数据',field:'ysdt',width:100,align:'center',formatter:function(value,row,index){
						return tagHTML.initialOddsBTN;
					}},
					
					{title:'点评',field:'comments',width:100,align:'center',formatter:function(value,row,index){
						return String.format(tagHTML.matchComments,row.id,"'icon-search'");
					}},
				]],
				toolbar:'#screenTools',
				onLoadSuccess:function(data){  
					$('.editcls').linkbutton({plain:true,iconCls:'icon-edit'});  
				} 
			});
		},
		
		
		
		
		/**推荐赛事表格*/
		recommMatchs:function(vo){
			this.BaseField(vo);
			
			vo.table.datagrid({
				method:'get',
				frozenColumns:[[
		                {field:'ck',checkbox:true},
		                {title:'id',field:'id',hidden:true},
		                {title:'scheduleId',field:'scheduleId',hidden:true}
	                ]],
				columns:[[
					{title:'赛事序号',field:'matchOrder',align:'center'},
					{title:'联赛名称',field:'leagueCnName',align:'center',formatter:function(value,row,index){
						return String.format(tagHTML.leagueCnName,row.bgcolor,value);
					}},
					{title:'比赛时间',field:'matchTime',sortable:true,align:'center',formatter:function(value,row,index){
						return new Date(value).Format("MM-dd hh:mm");
					}},
					{title:'主队',field:'homeName',align:'center'},
					{title:'客队',field:'awayName',align:'center'},
					{title:'推荐玩法',field:'playMethod',align:'center'},
					{title:'推荐盘口',field:'handicap',align:'center'},
					{title:'比分情况',field:'homeGoal',align:'center',formatter:function(value,row,index){
						return value + "&nbsp;&nbsp;<strong>VS</strong>&nbsp;&nbsp;" + row.awayGoal;
					}},
					{title:'推荐结果',field:'recommendResult',align:'center',formatter:function(value,row,index){
						var rs;
						
						switch (value) {
							case 1:
								rs = "胜";
								break;
							case 2:
								rs = "平平平";
							case 3:
								rs = "负";
							default:
								rs = "暂未开奖!";
								break;
						}
						return rs;
					},editor:{
						type:'combobox',
						options:{
								required:true,
								data:[
								      {"text":'胜',value:1},
								      {"text":'和',value:2},
								      {"text":'负',value:3},
								      {"text":'无',value:0,"selected":true}
								     ],
							     panelHeight:85,
							     editable:false,
							     onHidePanel:function(){
							    	 //vo.table.edatagrid('customSaveRow',{spf:$(this).combobox("getValue")});
							    	 var row = Publishtools.getSelects(vo.table)[0];
							    	 var spf = $(this).combobox("getValue");
							    	 var parseUrl = String.format('/recomms/confirm/{0}/{1}',row.id,spf);
							    	 
							    	 $.post(Constans.appName + parseUrl,function(result){
							    		 initCompent.validateResult(result, ["更新推荐结果成功!!!","更新推荐结果失败!!!"]);
							    	 });
							     }
							 	}
						}
					},
					
					{title:'专家胜率',field:'winrateThree',align:'center',formatter:function(value,row,index){
						var h = [],d3 = "3Day:" + value,d7 = "7Day:" + row.winrateSeven;
						h.push(String.format(tagHTML.tips,d3,d3));
						h.push("&nbsp;",String.format(tagHTML.rightOrfailureIcon,"icon-hot"),"&nbsp;");
						h.push(String.format(tagHTML.tips,d7,d7));
						return h.join("");
					}},
					{title:'专家等级',field:'levelName',align:'center',formatter:function(value,row,index){
						return String.format(tagHTML.levelHref,row.levelId,value);
					}},
					{title:'推荐人',field:'userName',align:'center',formatter:function(value,row,index){
						return String.format(tagHTML.userHref,row.recommendId,value);
					}},
					{title:'价格',field:'price',align:'center',formatter:function(value,row,index){
						return String.format(tagHTML.tips,value ? '赛事价格' : '专家等级价格',
								"$" + (value ? value : row.levelPrice));
					}},
					{title:'推荐时间',field:'recommendDate',sortable:true,align:'center',formatter:function(value,row,index){
						return new Date(value).Format("MM-dd hh:mm");;
					}},
					
					{title:'推送首页',field:'hot',width:100,align:'center',formatter:function(value,row,index){
						var rs;
						if(value)
							rs = String.format(tagHTML.recommPushHome,"icon-right","已推送首页",row.id);
						else
							rs = String.format(tagHTML.recommPushHome,"icon-error","未推送首页",row.id);
						return rs;
					}},
					
				]],
			});
		},
		
		
		
		
		/**资讯页面表格*/
		sportInfos:function(vo){
			this.BaseField(vo);
			
			vo.table.datagrid({
				url: Constans.appName + '/info/load',
				frozenColumns:[[
				                {field:'ck',checkbox:true},
			                ]],
	            columns:[[    
	                    {title:'资讯ID',field:'id'},
	                    {field:'title',title:'标题'}, 
	      		        {field:'content',title:'正文',formatter:function(value,row,index){
							return String.format(tagHTML.watchContent,row.id);
	      		        }},
	      		        {field:'typeMainTop',title:'首页',formatter:function(value,row,index){
	      		        	var rs;
							if(value)
								rs = String.format(tagHTML.newsTopOrHot,"icon-right","已推送首页",row.id,1);
							else
								rs = String.format(tagHTML.newsTopOrHot,"icon-error","未推送首页",row.id,1);
							return rs;
	      		        }},
	      		        
	      		        {field:'typePageTop',title:'置顶',formatter:function(value,row,index){
	      		        	var rs;
							if(value)
								rs = String.format(tagHTML.newsTopOrHot,"icon-right","已推送首页",row.id,2);
							else
								rs = String.format(tagHTML.newsTopOrHot,"icon-error","未推送首页",row.id,2);
							return rs;
	    		        }},
	    		        
	    		        {field:'weight',title:'着重',formatter:function(value,row,index){
	    		        	var rs;
							if(value)
								rs = String.format(tagHTML.newsTopOrHot,"icon-right","重要资讯!!!",row.id,3);
							else
								rs = String.format(tagHTML.newsTopOrHot,"icon-error","普通资讯...",row.id,3);
							return rs;
	    		        }},
	      		        {field:'bettingOutcome',title:'资讯类型',formatter:function(value,row,index){
	      		        	return value ? "胜负彩" : "竞彩";
	      		        }},
	      		        {field:'username',title:'编辑人员'},
	    		        {field:'datetime',title:'发布日期',formatter:function(value,row,index){
	      		        	return new Date(value).Format("yyyy-MM-dd mm:ss");
	      		        }}
	      		]],
	      		toolbar:[{
					id:'rNews',
					text:'发布资讯',
					iconCls:'icon-add',
					handler:function(){
						buildNews.addNews();
					}
				},{
					id:'uNews',
					text:'修改资讯',
					iconCls:'icon-edit',
					handler:function(){
						buildNews.updateNews();
					}
				},'-',{
					id:'dNews',
					text:'删除资讯',
					iconCls:'icon-remove',
					handler:function(){
						buildNews.deleteNews();
					}
				}]
			});
			//$(".datagrid-toolbar").find("tr").append(this.vo().infoCriteria); 
		},
		
		
		
		/**公告页面表格*/
		notice:function(vo){
			this.BaseField(vo);
			
			vo.table.datagrid({
				url: Constans.appName + '/notice/load',
				frozenColumns:[[
				                {field:'ck',checkbox:true},
				                {title:'id',field:'id',hidden:true}
			                ]],
	            columns:[[    
	                    {field:'title',title:'标题'}, 
	      		        {field:'content',title:'正文',formatter:function(value,row,index){
							return String.format(tagHTML.watchNotice,row.id);
	      		        }},
	      		        {field:'username',title:'编辑人员'},
	    		        {field:'datetime',title:'发布日期',formatter:function(value,row,index){
	      		        	return new Date(value).Format("yyyy-MM-dd mm:ss");
	      		        }}
	      		]],
	      		toolbar:[{
					id:'rNews',
					text:'发布公告',
					iconCls:'icon-add',
					handler:function(){
						buildNotice.addNotice();
					}
				},{
					id:'uNews',
					text:'修改公告',
					iconCls:'icon-edit',
					handler:function(){
						buildNotice.updateNotice();
					}
				},'-',{
					id:'dNews',
					text:'删除公告',
					iconCls:'icon-remove',
					handler:function(){
						buildNotice.deleteNotice();
					}
				}]
			});
		},
};

/**
 * @param idField	id标识字段
 * @param checkOnSelect	点击行时是否选中多选按钮
 * @param singleSelect	是否只能单选	
 * @param sortName	前台排序字段
 * @param table		Datagrid表格对象
 * @param fit		是否适应屏幕
 * @param width		表格宽
 * @param height	表格高
 * @returns {___vo0}
 */
function VoDataGrid(idField,checkOnSelect,singleSelect,table,fit,width,height){
		var vo = new Object;
		
		vo.idField = idField;
		vo.checkOnSelect = checkOnSelect;
		vo.singleSelect = singleSelect;
		vo.table = table;
		
		vo.fit = fit;
		vo.width = width;
		vo.height = height;
		return vo;
}


