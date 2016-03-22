/**
 * 平台公用工具集
 */
var Publishtools = {
	/**图片预览*/
	PreviewImg:function(obj){
		 var pageX = event.clientX;
	     var pageY = event.clientY;
	     $("<img id='imgshow'  src='" + $(obj).attr("iurl") + "' />").appendTo("body"); 
	     pageY = pageY > 600 ? pageY - $("#imgshow").width() : pageY;
	     $("#imgshow").css({'z-index':5555,"top": (pageY - 10) + "px",position: 'absolute',left: (pageX + 30) + "px"}).fadeIn("fast"); 
	},
	
	/**删除图片*/
	clearimg:function(){
		$("#imgshow").remove();
	},
	
	/**检查上传文件类型是否与指定类型匹配*/
	CheckFile:function(fileName,filetype){
	      var ext = fileName.substring(fileName.lastIndexOf("."),fileName.length).toUpperCase();
	      if(filetype.indexOf(ext)!= -1)return true;
	      return false;
	},
	
	
	/**限定至少一行以上操作*/
	isSelected:function(rows){
		if(rows.length < 1){
			$.messager.alert('提示','请选中要操作的记录行...'); 
			return false;
		}
		return true;
	},
	
	
	/**限定一行操作*/
	isSelected2One:function(rows){
		if(rows.length < 1 || rows.length > 1){
			$.messager.alert('提示','亲,只能选中一行操作哦...'); 
			return false;
		}
		return true;
	},
	/**JS获取URL请求参数*/
	getQueryString:function(name,search) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	    var r = search.substr(1).match(reg);
	    if (r != null) return unescape(r[2]); return null;
    },
    /**获取当前选中项(优先checkbox后selecteds)*/
    getSelects:function(tables){
		var checkRows = tables.datagrid('getChecked');
		var SeleRows = tables.datagrid('getSelections');
		var rows = checkRows.length > 0 ? checkRows : SeleRows;
		return rows;
    },
    /**是否是全选状态*/
    isSelectedAll:function(tables){
    	var rows = Publishtools.getSelects(tables);
    	return rows.length == tables.datagrid("getRows").length;
    }
};