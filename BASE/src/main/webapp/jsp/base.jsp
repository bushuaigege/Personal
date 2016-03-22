<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String webapp = request.getContextPath();
	String css = webapp + "/assets/css";
	String js = webapp + "/assets/js";
	String imgs = webapp + "/assets/imgs";
	String libs = webapp + "/assets/libs";
	
	String easyui = libs + "/easyui";
	String uploadRes = "/football/uploadRes/";
%>
<link rel="stylesheet" type="text/css" href="<%=easyui%>/themes/gray/easyui.css" />

<link rel="stylesheet" type="text/css" href="<%=easyui%>/themes/icon.css" />

<link rel="stylesheet" type="text/css" href="<%=css%>/tailoring_icons.css" />

<link rel="stylesheet" type="text/css" href="<%=css%>/general.css" />

<script type="text/javascript" src="<%=easyui%>/jquery.min.js"></script>

<script type="text/javascript" src="<%=easyui%>/jquery.easyui.min.js"></script>

<script type="text/javascript" src="<%=easyui%>/locale/easyui-lang-zh_CN.js"></script>

<!-- Custom Tools -->
<script type="text/javascript" src="<%=js%>/tools/platform_tools.js"></script>
<script type="text/javascript" src="<%=js%>/tools/common.js"></script>
<script type="text/javascript" src="<%=js%>/tools/component_build.js"></script>
<script type="text/javascript" src="<%=js%>/tools/generalGrid.js"></script>

<script type="text/javascript">
	/**1  内部服务器   2外网  3本机*/
	var isServer = 2;
	switch (isServer) {
		case 1:
			var Constans = {
				uploadRes : "<%=uploadRes%>",
				appName:"<%=webapp%>",
				infoRes:"/football/infoRes/",
				verificationRes:"/football/verificationRes/",
			};
			break;
		case 2:
			var Constans = {
				uploadRes : "<%=uploadRes%>",
				appName:"<%=webapp%>",
				infoRes:"/football/infoRes/",
				verificationRes:"/football/verificationRes/",
			};
			break;
		case 3:
			var Constans = {
				uploadRes : "<%=uploadRes%>",
				appName:"<%=webapp%>",
				infoRes:"/football/infoRes/",
				verificationRes:"/football/verificationRes/",
			};
			break;
		default:
			break;
	}
	
/* 	var globalFun = {
		jumpLoginPage:function(){
			if (top != self) {
				if (top.location != self.location) {
					top.location = Constans.appName + '/user/loginPage';
				}
			}
		}
	}; */
</script>




