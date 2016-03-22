var jq;


var initResource = {
	initFactory:function(){
		if(jq)return null;
		
		jq = new Object();
		jq.portals = $("#portals");
		
		jq.nrlSlideTb = $("#nrlSlideTb");
		jq.nrlSlideOperMenu = $("#nrlSlideOperMenu");
		
		jq.sprotInfoTb = $("#sprotInfoTb");
		jq.sportSlideOperMenu = $("#sportSlideOperMenu");
		
		jq.slideOpeDialg = $("#slideOpeDialg");
		jq.slideform = $("#slideform");
		
		jq.siteSelector = $("#siteSelector");
	},
	
	
	/**无关联资讯图Portal*/
	buildNrlSlideTb:function(){
		jq.nrlSlideTb.datagrid({    
		    url: Constans.appName + '/res/slide/1',   
		    frozenColumns:[[
			                {title:'id',field:'id',hidden:true}
		                ]],
		    columns:[[    
		        {field:'path',title:'预览',formatter:function(value,row,index){
		        	var h = [];
		     		h.push('<img id="dim" onmouseover="Publishtools.PreviewImg(this); "');
		     		h.push('onmouseout="Publishtools.clearimg(this);"  width="30" height="24" ');
		     		h.push('src="',Constans.appName,'/assets/imgs/general/preview.png" title= \'' + row.type + '\' ');
		     		h.push('iurl=\''+ Constans.uploadRes + value +  '\'>');
		     		return h.join("");
				}},    
		        {field:'type',title:'类型',formatter:function(value,row,index){
		        	switch (value) {
						case 1:
							return '推荐页最上方单图';
						case 2:
							return '推荐页中间3图';
						case 3:
							return '等级专家侧边图';
							default:
								return '类型错误';
					}
					return value;
				}},    
				
		        {field:'sort',title:'位置',formatter:function(value,row,index){
					return '第' + value + '张';
				}},    
		        {field:'datetime',title:'创建时间',formatter:function(value,row,index){
		        	return new Date(value).Format("MM-dd hh:mm");
				}}    
		    ]],
		    singleSelect:true
		});
	},
	
	
	buildSprotInfoTb:function(){
		jq.sprotInfoTb.datagrid({    
		    url: Constans.appName + '/res/slide/0',   
		    frozenColumns:[[
			                {title:'id',field:'id',hidden:true}
		                ]],
		    columns:[[    
		        {field:'path',title:'预览',formatter:function(value,row,index){
		        	var h = [];
		     		h.push('<img id="dim" onmouseover="Publishtools.PreviewImg(this); "');
		     		h.push('onmouseout="Publishtools.clearimg(this);"  width="30" height="24" ');
		     		h.push('src="',Constans.appName,'/assets/imgs/general/preview.png" title= \'' + row.type + '\' ');
		     		h.push('iurl=\''+ Constans.uploadRes + value +  '\'>');
		     		return h.join("");
				}},    
		        {field:'type',title:'类型',formatter:function(value,row,index){
		        	switch (value) {
			        	case 0:
							return '首页轮播图';
						case 1:
							return '资讯右侧轮播图';
						default:
							return '类型错误';
		        	}
		        	return value;
		        }},    
		        {field:'sort',title:'位置',formatter:function(value,row,index){
					return '第' + value + '张';
				}},
		        {field:'associatedid',title:'关联资讯',formatter:function(value,row,index){
					return String.format(tagHTML.watchContent,row.associatedid);
  		        },editor:{
					type:'numberbox',
					options:{
							required:true,
							min:1,value:0,
							onChange:function(newValue,oldValue){
						    	 var row = Publishtools.getSelects(jq.sprotInfoTb)[0];
						    	 var parseUrl = String.format('/res/related/{0}/{1}',row.id,newValue);
						    	 
						    	 $.post(Constans.appName + parseUrl,function(result){
						    		 initCompent.validateResult(result, ["修改关联资讯成功!!!","修改关联资讯失败!!!"]);
						    	 });
						     }
						 	}
					}},
		        {field:'datetime',title:'创建时间',formatter:function(value,row,index){
		        	return new Date(value).Format("MM-dd hh:mm");
				}}    
		    ]],
		    singleSelect:true
		});
		
		
		/**初始化编辑表格功能*/
		jq.sprotInfoTb.edatagrid();
	},
	
	changeSlideInfo:function(tag){
		var tb,s;
		var s1 = [{"value":0,"text":'首页轮播图'},{"value":1,"text":'资讯右侧轮播图'}];
		
		var s2 = [{"value":1,"text":'推荐页最上方单图'},{"value":2,"text":'推荐页中间3图'},{"value":3,"text":'等级专家侧边图'}];
	
		if(tag){
			tb = jq.sprotInfoTb;
			jq.siteSelector.combobox('loadData',s1);
		}else{
			tb = jq.nrlSlideTb;
			jq.siteSelector.combobox('loadData',s2);
		}
		
		var rows = Publishtools.getSelects(tb);
		if(!Publishtools.isSelected2One(rows))return false;
		
		jq.slideform.form('load',{
			id:rows[0].id,
			associatedid:tag ? rows[0].associatedid : 0,
			type:rows[0].type,		
			sort:rows[0].sort
		});
		
		jq.slideform.form({
			url:Constans.appName + '/res/update',
			queryParams:{"tag":tag},
			success:function(rs){ 
				initCompent.validateResult(rs, ['更新图片信息成功!!!','更新图片信息失败!!!'], jq.slideOpeDialg, jq.slideform,tb);
	 		}  
		}); 
		initCompent.initDialog('炫酷图片,更新试试',jq.slideOpeDialg,jq.slideform, 300, 330);
	},
	
	
	addSlideInfo:function(tag){
		var tb;
		var s1 = [{"value":0,"text":'首页轮播图'},{"value":1,"text":'资讯右侧轮播图'}];
		
		var s2 = [{"value":1,"text":'推荐页最上方单图'},{"value":2,"text":'推荐页中间3图'},{"value":3,"text":'等级专家侧边图'}];
	
		if(tag){
			tb = jq.sprotInfoTb;
			jq.siteSelector.combobox('loadData',s1);
		}else{
			tb = jq.nrlSlideTb;
			jq.siteSelector.combobox('loadData',s2);
		}
		
		var rows = Publishtools.getSelects(tb);
		if(!Publishtools.isSelected2One(rows))return false;
		
		jq.slideform.form({
			url:Constans.appName + '/res/add',
			queryParams:{"tag":tag},
			success:function(rs){ 
				initCompent.validateResult(rs, ['添加图片信息成功!!!','添加图片信息失败!!!'], jq.slideOpeDialg, jq.slideform,tb);
	 		}  
		}); 
		initCompent.initDialog('炫酷图片,再来一张',jq.slideOpeDialg,jq.slideform, 300, 330);
	},
	
	
	checkImageType:function(ts,newValue){
		var result = Publishtools.CheckFile(newValue,'.JPG,.JPEG,.PNG');
		if(!result){
			initCompent.validateResult(1,['图片格式正确通过','图片格式错误,应为.JPG,.JPEG,.PNG其中一种后缀']);
			$(ts).textbox('clear');
		} 
	},
	start:function(){
		this.buildNrlSlideTb();
		this.buildSprotInfoTb();
	}
};


$(function(){	
	initResource.initFactory();
	jq.portals.portal({border:false,fit:true});
	
	/**初始化右键菜单*/
	initCompent.initRightKeyMenu(jq.nrlSlideTb,jq.nrlSlideOperMenu);
	initCompent.initRightKeyMenu(jq.sprotInfoTb,jq.sportSlideOperMenu);
	/**初始化表格*/
	initResource.start();
});	