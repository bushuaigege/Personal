<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/jsp/base.jsp"%>

<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>赛事推荐</title>
<script type="text/javascript" src="<%=js%>/recomm/recomm.js"></script>
<script type="text/javascript" src="<%=easyui%>/jquery.edatagrid.js"></script>
</head>
<body>
	<table id="recommsTb"></table>

	<!-- 右键操作 -->
	<div id="recommMatchMenu" class="easyui-menu" style="width: 120px;"
		data-options="duration:500">
		<div>
			<span>置顶...</span>
			<div style="width: 150px;">
				<div data-options="iconCls:'icon-edit'" onclick="">修改(来自本地)</div>
			</div>
		</div>
	</div>

</body>
</html>