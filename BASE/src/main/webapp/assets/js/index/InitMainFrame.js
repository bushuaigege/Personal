﻿var InitMainFrame = {
		InitLeftMenu:function(){
			$("#nav").accordion({animate:false});

		    $.each(_menus.menus, function(i, n) {
				var menulist ='';
				menulist +='<ul>';
		        $.each(n.menus, function(j, o) {
					menulist += '<li><div><a ref="'+o.menuid+'" href="#" rel="' + o.url + '" ><span class="icon '+o.icon+'" >&nbsp;</span><span class="nav">' + o.menuname + '</span></a></div></li> ';
		        });
				menulist += '</ul>';

				$('#nav').accordion('add', {
		            title: n.menuname,
		            content: menulist,
		            iconCls: 'icon ' + n.icon
		        });

		    });

			$('.easyui-accordion li a').click(function(){
				var tabTitle = $(this).children('.nav').text();

				var url = $(this).attr("rel");
				var menuid = $(this).attr("ref");
				var icon = InitMainFrame.getIcon(menuid);
				
				InitMainFrame.addTab(tabTitle,url,icon);
				$('.easyui-accordion li div').removeClass("selected");
				$(this).parent().addClass("selected");
			}).hover(function(){
				$(this).parent().addClass("hover");
			},function(){
				$(this).parent().removeClass("hover");
			});

			//选中第一个
			var panels = $('#nav').accordion('panels');
			var t = panels[0].panel('options').title;
		    $('#nav').accordion('select', t);
		},
		
		addTab: function(subtitle,url,icon){
			icon += " tab-padding";
			if(!$('#tabs').tabs('exists',subtitle)){
				$('#tabs').tabs('add',{
					title:subtitle,
					content: InitMainFrame.createFrame(url),
					closable:true,
					icon:icon
				});
			}else{
				$('#tabs').tabs('select',subtitle);
				$('#mm-tabupdate').click();
			}
			this.tabClose();
		},
		
		/**获取左侧导航的图标*/
		getIcon:function(menuid){
			var icon = 'icon ';
			$.each(_menus.menus, function(i, n) {
				 $.each(n.menus, function(j, o) {
				 	if(o.menuid == menuid){
						icon += o.icon;
					}
				 });
			});

			return icon;
		},
		
		/**注册右键菜单具体事件*/
		tabCloseEven:function(){
			//关闭当前
			$('#mm-tabclose').click(function(){
				var currtab_title = $('#mm').data("currtab");
				$('#tabs').tabs('close',currtab_title);
			});
			
			
			//全部关闭
			$('#mm-tabcloseall').click(function(){
				$('.tabs-inner span').each(function(i,n){
					var t = $(n).text();
					$('#tabs').tabs('close',t);
				});
			});
			
			
			//关闭除当前之外的TAB
			$('#mm-tabcloseother').click(function(){
				$('#mm-tabcloseright').click();
				$('#mm-tabcloseleft').click();
			});
			
			
			//关闭当前右侧的TAB
			$('#mm-tabcloseright').click(function(){
				var nextall = $('.tabs-selected').nextAll();
				if(nextall.length==0){
					console.debug("到头了，前边没有啦~~");
					return false;
				}
				nextall.each(function(i,n){
					var t=$('a:eq(0) span',$(n)).text();
					$('#tabs').tabs('close',t);
				});
				return false;
			});
			
			
			//关闭当前左侧的TAB
			$('#mm-tabcloseleft').click(function(){
				var prevall = $('.tabs-selected').prevAll();
				if(prevall.length==0){
					console.debug("到头了，前边没有啦~~");
					return false;
				}
				prevall.each(function(i,n){
					var t=$('a:eq(0) span',$(n)).text();
					$('#tabs').tabs('close',t);
				});
				return false;
			});

			//退出
			$("#mm-exit").click(function(){
				$('#mm').menu('hide');
			});
		},
		/**创建嵌套页面*/
		createFrame:function(url)
		{
			var s = '<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
			return s;
		},
		/**Bind 右键Tab事件*/
		tabClose:function(){
			/*双击关闭TAB选项卡*/
			$(".tabs-inner").dblclick(function(){
				var subtitle = $(this).children(".tabs-closable").text();
				$('#tabs').tabs('close',subtitle);
			});
			/*为选项卡绑定右键*/
			$(".tabs-inner").bind('contextmenu',function(e){
				$('#mm').menu('show', {
					left: e.pageX,
					top: e.pageY
				});

				var subtitle =$(this).children(".tabs-closable").text();

				$('#mm').data("currtab",subtitle);
				$('#tabs').tabs('select',subtitle);
				return false;
			});
		}
};


/**页面时间调度*/
function clockon() {
    var now = new Date();
    var year = now.getFullYear(); //getFullYear getYear
    var month = now.getMonth();
    var date = now.getDate();
    var day = now.getDay();
    var hour = now.getHours();
    var minu = now.getMinutes();
    var sec = now.getSeconds();
    var week;
    month = month + 1;
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minu < 10) minu = "0" + minu;
    if (sec < 10) sec = "0" + sec;
    var arr_week = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
    week = arr_week[day];
    var time = "";
    time = year + "年" + month + "月" + date + "日" + " " + hour + ":" + minu + ":" + sec + " " + week;

    $(".footer").html(time);

    var timer = setTimeout("clockon()", 200);
}
