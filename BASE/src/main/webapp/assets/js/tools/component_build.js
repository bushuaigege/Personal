var initCompent = {
		initDialog:function(title,dialogs,forms,width,height){
			dialogs.show();
	  		// 弹出窗口
			dialogs.dialog({
				title:title,
				width: width, 
				height: height,
				modal:true,
				buttons:[{
					text:'提交',
					iconCls:'icon-ok',
					handler:function(){
						forms.submit();
					}
				},{
					text:'取消',
					iconCls:'icon-cancel',
					handler:function(){
						dialogs.dialog('close');
						dialogs.find("form").form("clear");
					}
				}]
	  		});  
		},
		/**Dialog回调结果处理*/
		validateResult:function(result,msg,dialog,form,table){
			var status = result.constructor == Object ? result.res : $.parseJSON(result).res;
			//1成功,2失败
			if(status == 1)
				this.msgTips(msg[0], dialog, form, table);
			else
				this.msgTips(msg[1], dialog, form, table);
		},
		
		/**消息提示*/
		msgTips:function(msg,dialog,form,table){
			 $.messager.show({
					title:'系统提示tips:',
					msg:msg,
					timeout:2000,
					showType:'slide'
		 	});
			 
			 if(form)form.form("clear");
			 if(dialog)dialog.dialog('close');
			 if(table)table.datagrid("reload");
		},
		
		
		/**迭代表格所有行指定字段*/
		getSelectedIds:function(tables,fields,cover,isAll){
			var rows = isAll ? tables.datagrid("getRows") : Publishtools.getSelects(tables);
			
			var ringid = [];
			for(var i=0;i<rows.length;i++){
				switch (fields) {
				case 'id':
					ringid.push((rows.length-1) == i? cover + rows[i].id + cover : cover + rows[i].id + cover + ",");
					break;
				case 'ringtoneModuleId':
					ringid.push((rows.length-1) == i? cover + rows[i].ringtoneModuleId + 
							cover : cover + rows[i].ringtoneModuleId + cover + ",");
					break;
				case 'specialModuleId':
					ringid.push((rows.length-1) == i? cover + rows[i].specialModuleId + cover :
						cover + rows[i].specialModuleId + cover +",");
					break;
				default:
					break;
				}
			}
			return ringid.join("");
		},
		
		/**批量IDs删除
		 * @param fieldId 标识字段列
		 * @param paramfield	后台名称列
		 * @param tables	表格对象
		 */
		DeleteIds:function(fieldId,tables,url){
			var rows = Publishtools.getSelects(tables);
			if(!Publishtools.isSelected(rows)){return false;};
			
			$.messager.confirm('确认对话框', '您确定删除当前选中项吗?', function(result){
				if (result){
					var rids = initCompent.getSelectedIds(tables, fieldId, "'",false);
					//删除操作
					$.post(url,{ids:rids},function(result){
						var options = tables.datagrid('getPager').data("pagination").options;
						var currentPageNumber = options.pageNumber;
						var rowSize = tables.datagrid('getRows').length;
						
						if(currentPageNumber !=1 && rowSize == rows.length){
							var queryParams = tables.datagrid('options').queryParams; 
							
							queryParams.previous = 'true';  
							tables.datagrid('reload');
							queryParams.previous = ''; 
							tables.datagrid('uncheckAll').datagrid('unselectAll');
						}else{
							tables.datagrid('reload');
							tables.datagrid('uncheckAll').datagrid('unselectAll');
						}
					});
				}
			});
		},
		
		
		/**删除单个铃声ByID**/
		removeRingId:function(tb,rid){
			var tables = $("#"+tb.id);
				$.messager.confirm('特别警告!!!', '您确定删除吗?(删除铃声库资源可是重罪,请谨慎操作!!!)', function(result){
					if(result){
						$.post("/ringtone/drs.do",{ids : rid},function(result) {
							initCompent.validateResult(result, ['铃声资源及其关联删除成功','铃声意外删除失败,请联系管理员'], false, false, tables);
						});
					}
				});
		},
		
		/**批量IDS关联**/
		addIDs:function(dialogs,forms,tables,url,fields,msg_Id){
			var msg = [],ringid = '';
			
			ringid = this.getSelectedIds(tables, fields, "'", false);;
			
			switch (msg_Id) {
				case 'Album':				
					msg = ['推送至铃声馆首发操作成功,现在就去--加个链接','该铃声已存在首发列表,请联系管理员'];
					break;
				case 'High':
					msg = ['推送至有逼格铃声操作成功,现在就去--加个链接','该铃声已存在逼格铃声列表,请联系管理员'];
				case 'MaisieOmnibus':
					msg = ['推送至小编精选专题操作成功','该专题已存在小编精选专题列表,请联系管理员'];
				default:
					break;
			}
			
			$.post(url,{ids : ringid},function(result) {
				initCompent.validateResult(result,msg, dialogs, forms, tables);
			});
		},
		
		/**初始化右键菜单*/
		initRightKeyMenu:function(tables,menus){
			tables.datagrid({
				onRowContextMenu: function(e,rowIndex,rowData){
					e.preventDefault();					//屏蔽浏览器的菜单
					$(this).datagrid('unselectAll');	//清除所有选中项
					$(this).datagrid('selectRow', rowIndex);	//选中状态 
					menus.menu('show', {
						left: e.pageX,
						top: e.pageY
					});
				}
			});
		},
		
		/**暂存表格删除记录*/
		removeTransfer:function(tables){
			var rows = Publishtools.getSelects(tables);
		    var copyRows = [],old;
		    
		    if(Publishtools.isSelectedAll(tables)){
		    	tables.datagrid('uncheckAll').datagrid('unselectAll');
		    	tables.datagrid('loadData', { total: 0, rows: [] });
		    	return;
		    }
		    
		    for ( var j= 0; j < rows.length; j++) {
	        	copyRows.push(rows[j]);
			}
			for(var i =0;i<copyRows.length;i++){    
		         var index = tables.datagrid('getRowIndex',copyRows[i]);
		         tables.datagrid('deleteRow',index);
		         /**刷新删除行*/
		         var row = tables.datagrid("getRows");
		         tables.datagrid("loadData", row);
		    }
		},


		/**检测关联数据在父表是否存在*/
		checkIsexits:function(parentTb,childTb){
			var parenIds = this.getSelectedIds(parentTb, 'id',"'", true);
			var childRows = childTb.datagrid('getSelections');
			var exitsName = [],ringId = [];
			for(var i=0; i < childRows.length; i++){
				if(parenIds.indexOf("'"+ childRows[i].id +"'")!=-1){
					exitsName.push(childRows[i].name+",");
					continue;
				}
			}
			return exitsName.join("");
		},
		
};

