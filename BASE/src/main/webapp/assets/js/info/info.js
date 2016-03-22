/**
 * 系统资讯管理
 */
var um,jqNews;

var buildNews = {
		
	factory:function(infosTb,newsDialog,newsForm,newsMenu){
		
		var obj = new Object();
		
		obj.infosTb = infosTb;
		obj.newsDialog = newsDialog;
		obj.newsForm = newsForm;
		
		obj.newsMenu = newsMenu;
		return obj;
	},
	
	initJqNew:function(){
		if(!jqNews)
			jqNews = this.factory($("#infosTb"),$("#newsDialog"),
			$("#newsForm"),$("#newsMenu"));
	},
	
	initInfosTb:function(){
		var dt = VoDataGrid('id', false, false,jqNews.infosTb,true);
		Grid.sportInfos(dt);
		um = UM.getEditor('newsUeditor');
	},
	
	pushHomeOrTop : function(fn,infoId,type){
		var isok = $(fn).hasClass("icon-right");
		var baseUrl = Constans.appName + '/info/push/{0}/{1}/{2}';
		
		/**0 首页  1资讯置顶*/
		$.post(String.format(baseUrl,infoId,type,isok ? 0 : 1),function(result){
			if(result.res){
				$(fn).toggleClass("icon-right");$(fn).toggleClass("icon-error");
			}
		},'json');
	},
	
	addNews:function(){
		this.initNewsForm(jqNews.newsDialog, 
				jqNews.newsForm,jqNews.infosTb,Constans.appName + '/info/add');
		initCompent.initDialog('帮主发布新资讯罗。。。', jqNews.newsDialog,
				jqNews.newsForm, 680, 460);
	},
	
	updateNews:function(){
		var rows = Publishtools.getSelects(jqNews.infosTb);
		
		if(rows.length != 1){
			$.messager.alert('提示','亲,选中一行操作哦...');
			return false;
		}
		
		jqNews.newsForm.form('load',{
			id:rows[0].id,
			title:rows[0].title,
			uId:rows[0].uId,
			typeMainTop:rows[0].typeMainTop,
			typePageTop:rows[0].typePageTop,
			emphasis:rows[0].emphasis,
			bettingOutcome:rows[0].bettingOutcome,
		});
		
		um.setContent("");
		um.execCommand('insertHtml', rows[0].content);
		
		this.initNewsForm(jqNews.newsDialog, 
				jqNews.newsForm,jqNews.infosTb,Constans.appName + '/info/change');
		
		initCompent.initDialog('资讯信息有误,修改一下^V^',
				jqNews.newsDialog,jqNews.newsForm, 680, 700);
	},
	
	deleteNews:function(){
		initCompent.DeleteIds('id',jqNews.infosTb,Constans.appName + '/info/remove');
	},
	
	initNewsForm:function(dialogs,forms,tables,url){
		forms.form({
			url:url,
			onSubmit:function(param){
				/*param.content = UM.getEditor('noticeUeditor').getContent();*/
				var isValid = $(this).form('validate');
				return isValid;
			},
			success:function(date){
				um.execCommand('cleardoc');
				initCompent.validateResult(date, ['资讯信息操作成功！！！','资讯信息操作失败！！！'], 
						dialogs, forms, tables);
			}
		});
	},
	start:function(){
		this.initJqNew();
		this.initInfosTb();
	}
};

$(function(){
	buildNews.start();
	
	initCompent.initRightKeyMenu(jqNews.infosTb, jqNews.newsMenu);
});





