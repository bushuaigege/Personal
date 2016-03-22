/**
 * 系统公告管理
 */
var um,jqNotice;

var buildNotice = {
		
	factory:function(noticeTb,noticeDialog,noticeForm,noticeMenu){
		
		var obj = new Object();
		
		obj.noticeTb = noticeTb;
		obj.noticeDialog = noticeDialog;
		obj.noticeForm = noticeForm;
		
		obj.noticeMenu = noticeMenu;
		return obj;
	},
	
	initJqNotice:function(){
		if(!jqNotice)
			jqNotice = this.factory($("#noticeTb"),$("#noticeDialog"),
			$("#noticeForm"),$("#noticeMenu"));
	},
	
	
	initNoticesTb:function(){
		var dt = VoDataGrid('id', false, false,jqNotice.noticeTb,true);
		Grid.notice(dt);
		um = UM.getEditor('noticeUeditor');
	},
	
	
	addNotice:function(){
		this.initNoticeForm(jqNotice.noticeDialog, 
				jqNotice.noticeForm,jqNotice.noticeTb,Constans.appName + '/notice/release');
		initCompent.initDialog('帮主发布新公告罗。。。', jqNotice.noticeDialog,
				jqNotice.noticeForm, 680, 460);
	},
	
	
	updateNotice:function(){
		var rows = Publishtools.getSelects(jqNotice.noticeTb);
		
		if(rows.length != 1){
			$.messager.alert('提示','亲,选中一行操作哦...');
			return false;
		}
		
		jqNotice.noticeForm.form('load',{
			id:rows[0].id,
			title:rows[0].title
		});
		
		um.setContent("");
		um.execCommand('insertHtml', rows[0].content);
		
		this.initNoticeForm(jqNotice.noticeDialog, 
				jqNotice.noticeForm,jqNotice.noticeTb,Constans.appName + '/notice/change');
		
		initCompent.initDialog('公告信息有误,修改一下^V^',
				jqNotice.noticeDialog,jqNotice.noticeForm, 680, 700);
	},
	
	
	
	deleteNotice:function(){
		initCompent.DeleteIds('id',jqNotice.noticeTb,Constans.appName + '/notice/delete');
	},
	
	initNoticeForm:function(dialogs,forms,tables,url){
		forms.form({
			url:url,
			onSubmit:function(param){
				/*param.content = UM.getEditor('noticeUeditor').getContent();*/
				var isValid = $(this).form('validate');
				return isValid;
			},
			success:function(date){
				um.execCommand('cleardoc');
				initCompent.validateResult(date, ['公告信息操作成功！！！','公告信息操作失败！！！'], 
						dialogs, forms, tables);
			}
		});
	},
	start:function(){
		this.initJqNotice();
		this.initNoticesTb();
	}
};

$(function(){
	buildNotice.start();
	initCompent.initRightKeyMenu(jqNotice.noticeTb, jqNotice.noticeMenu);
});





