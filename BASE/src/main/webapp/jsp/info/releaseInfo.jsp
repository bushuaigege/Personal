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
<script type="text/javascript" src="<%=js%>/info/info.js?ver=asdfas"></script>
</head>
<body>
	<!-- 系统资讯表格 -->
	<div id="infosTb"></div>

	<!-- 新闻编辑Dialog -->
	<div id="newsDialog" style="display: none;" data-options="iconCls:'icon-search'">
		<form id="newsForm" method="post" data-options="novalidate:false">
			<table style="border-collapse: separate; border-spacing: 25px;">
				<tr>
					<td><input type="hidden" name="id" /> 
					
					<input class="easyui-textbox" data-options="prompt:'新闻标题',
						required:true,iconCls:'icon-search',width:210"
						name="title">
						
						<input type="checkbox" name="typeMainTop" value="1"/>推送首页
						
						<input type="checkbox" name="typePageTop" value="1"/>文章置顶
						
						<input type="checkbox" name="emphasis" value="1"/>重点新闻
						
						<!-- 新闻类型 -->
						<select class="easyui-combobox" name="bettingOutcome" data-options="prompt:'新闻类型',
									required:true,panelHeight:46,width:100,editable:false">   
						    <option value=0>竞彩</option>   
						    <option value=1>胜负彩</option>   
						</select> 
					</td>
				</tr>
				<tr>
					<!-- 加载编辑器的容器 -->
					<!-- <script id="newsUeditor" type="text/plain" name="content"></script> -->
				</tr>
			</table>
		</form>
	</div>



	<!-- 右键菜单 -->
	<div id="newsMenu" class="easyui-menu" style="width: 120px;"
		data-options="duration:500">
		<div data-options="iconCls:'icon-add'"
			onclick="buildNews.addNews();">添加资讯</div>
		<div data-options="iconCls:'icon-edit'"
			onclick="buildNews.updateNews();">修改资讯</div>
		<div data-options="iconCls:'icon-remove'"
			onclick="buildNews.deleteNews();">删除资讯</div>
	</div>
</body>
</html>