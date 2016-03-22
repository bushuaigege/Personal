<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/jsp/base.jsp"%>

<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link href="<%=libs%>/ueditor/themes/default/css/umeditor.min.css" type="text/css" rel="stylesheet">
<script type="text/javascript" charset="utf-8" src="<%=libs%>/ueditor/umeditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="<%=libs%>/ueditor/umeditor.min.js"></script>
<script type="text/javascript" src="<%=libs%>/ueditor/lang/zh-cn/zh-cn.js"></script>
<script type="text/javascript" src="<%=js%>/sys/notice.js?ver=12312"></script>
</head>
<body>
	<!-- 系统公告表格 -->
	<div id="noticeTb"></div>
	
	<!-- 公告编辑Dialog -->
	<div id="noticeDialog" style="display: none;" data-options="iconCls:'icon-search'">
		<form id="noticeForm" method="post" data-options="novalidate:false">
			<table style="border-collapse: separate; border-spacing: 25px;">
				<tr>
					<td><input type="hidden" name="id" /> 
					<input class="easyui-textbox" data-options="prompt:'公告标题',
						required:true,iconCls:'icon-search',width:200"
						name="title">
					</td>
				</tr>
				
				<tr>
					<!-- 加载编辑器的容器 -->
					<!-- <script id="noticeUeditor" type="text/plain" name="content"></script> -->
				</tr>
			</table>
		</form>
	</div>


	<!-- 右键菜单 -->
	<div id="noticeMenu" class="easyui-menu" style="width: 120px;"
		data-options="duration:500">
		<div data-options="iconCls:'icon-add'"
			onclick="buildNotice.addNotice();">添加公告</div>
		<div data-options="iconCls:'icon-edit'"
			onclick="buildNotice.updateNotice();">修改公告</div>
		<div data-options="iconCls:'icon-remove'"
			onclick="buildNotice.deleteNotice();">删除公告</div>
	</div>
</body>
</html>