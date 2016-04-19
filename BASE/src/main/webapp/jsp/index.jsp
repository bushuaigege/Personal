<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ include file="base.jsp"%>
<html>
  <head>
    <title>后台管理首页</title>
	<link rel="stylesheet" type="text/css" href="<%=css%>/index/InitMainFrame.css" />
	<script type="text/javascript" src="<%=js%>/index/InitMainFrame.js"></script>
	
	<script type="text/javascript">
	 	 var path = "<%=webapp%>/jsp/";
	 	 
		 var _menus = {"menus":[
							{"menuid":"1","icon":"icon-sys","menuname":"核心管理",
								"menus":[
										{"menuid":"1","menuname":"赛事管理","icon":"icon-football","url":path + "match/matchInfos.jsp"},
										{"menuid":"2","menuname":"热门推荐","icon":"icon-new","url":path + "recomm/recommMatch.jsp"},
										{"menuid":"3","menuname":"系统资源","icon":"icon-special","url":path+ "sys/resourceMN.jsp"},
										{"menuid":"4","menuname":"发布资讯","icon":"icon-user","url":path+ "info/releaseInfo.jsp"},
										{"menuid":"5","menuname":"系统公告","icon":"icon-log","url":path+ "sys/notice.jsp"},
									]
							},
							{"menuid":"6","icon":"icon-sys","menuname":"其他",
								"menus":[
										{"menuid":"7","menuname":"额外赛事数据","icon":"icon-special","url":path + "match/OtherMatch.jsp"},
										{"menuid":"8","menuname":"铃声馆首发","icon":"icon-starting","url":path + "module/RingStarting.jsp"},
										{"menuid":"9","menuname":"小编精心挑选","icon":"icon-new","url":path+ "module/MaisieOmnibus.jsp"},
										{"menuid":"10","menuname":"橱窗管理","icon":"icon-log","url":path+ "module/ShowCase.jsp"},
										{"menuid":"11","menuname":"模块管理","icon":"icon-module","url":path+ "module/ModuleManager.jsp"},
									]
							},
							{"menuid":"12","icon":"icon-sys","menuname":"权限管理",
								"menus":[
										{"menuid":"13","menuname":"功能管理","icon":"icon-log","url":path + "sys/sourceMap.jsp"},
										{"menuid":"14","menuname":"权限组(角色)管理","icon":"icon-log","url":path + "sys/roleGroup.jsp"},
										{"menuid":"15","menuname":"用户管理","icon":"icon-log","url":path + "sys/accountControl.jsp"}
									]
							}
					]};
		 
				 	$(function(){
						/**初始化左侧风琴*/
						InitMainFrame.InitLeftMenu();
						/**关闭Tab*/
						InitMainFrame.tabClose();
						/**Tab右击事件*/
						InitMainFrame.tabCloseEven();
						/**时间函数*/
						clockon();
					});
	</script>
</head>
<body class="easyui-layout" style="overflow-y: hidden">
	<!-- 头部分 -->
	<div class="headTitle" data-options="border:false,split:true,region:'north'">
		<img src="<%=imgs%>/log.png" style="padding-left:10px;margin-top: -3px;"/>
		<div class="log_title_div">
			<span>深圳精彩创客(JCCK)网络有限公司</span>
		</div>
	</div>
	
	<!-- foot部分 -->
	<div style="height: 30px; background: #D2E0F2;" data-options="split:true,region:'south'">
		<div class="footer"></div>
	</div>
	
	
	<!-- 手风琴导航部分 -->
	<div title="导航菜单" style="width:180px;" id="west" data-options="hide:true,split:true,region:'west'">
		<div id="nav" class="easyui-accordion" data-options="border:false,fit:true">
			<!--导航内容 -->
		</div>
	</div>

	<!-- Center公司信息部分-->
	<div id="mainPanle" style="background: #eee; overflow-y:hidden"	data-options="region:'center'">
		<div id="tabs" class="easyui-tabs" data-options="border:false,fit:true">
			<div title="欢迎使用" style="padding:20px;overflow:hidden; color:red; ">
					<h1 style="font-weight: bolder">赢胜数据,扬帆起航!!!<%=new Date() %></h1>
			</div>
		</div>
	</div>
	
	<!-- Tab右键菜单 -->
	<div id="mm" class="easyui-menu" style="width:150px;" data-options="duration:500">
		<div id="mm-tabclose">关闭</div>
		<div id="mm-tabcloseall">全部关闭</div>
		<div id="mm-tabcloseother">除此之外全部关闭</div>
		<div class="menu-sep"></div>
		<div id="mm-tabcloseright">当前页右侧全部关闭</div>
		<div id="mm-tabcloseleft">当前页左侧全部关闭</div>
		<div class="menu-sep"></div>
		<div id="mm-exit">退出</div>
	</div>
</body>
</html>