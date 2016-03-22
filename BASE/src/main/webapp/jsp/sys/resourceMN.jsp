<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/jsp/base.jsp"%>

<!DOCTYPE>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>赛事推荐</title>
<script type="text/javascript" src="<%=easyui%>/jquery.portal.js"></script>
<script type="text/javascript" src="<%=js%>/sys/resourceMN.js"></script>
<script type="text/javascript" src="<%=easyui%>/jquery.edatagrid.js"></script>

</head>
<body class="easyui-layout">
	<div data-options="border:false,region:'center'">
		<div id="portals" style="position: relative;"
			data-options="border:false,fit:true">
			<div style="width: 25%;">
				<div title="非关联资讯焦点图(推荐页、等级专家页)" data-options="closable:true">
					<table id="nrlSlideTb"></table>
				</div>

				<div id="nrlSlideOperMenu" class="easyui-menu"
					style="width: 120px;" data-options="duration:500">
					<div data-options="iconCls:'icon-edit'"
						onclick="initResource.changeSlideInfo(0);">修改信息</div>
						
						<div data-options="iconCls:'icon-edit'"
						onclick="initResource.addSlideInfo(0);">添加信息</div>
				</div>
			</div>


			<div style="width: 25%;">
				<div title="关联资讯焦点图(首页、咨询页)" data-options="closable:true">
					<table id="sprotInfoTb"></table>
				</div>

				<div id="sportSlideOperMenu" class="easyui-menu"
					style="width: 120px;" data-options="duration:500">
					<div data-options="iconCls:'icon-edit'"
						onclick="initResource.changeSlideInfo(1);">修改信息</div>
						<div data-options="iconCls:'icon-edit'"
						onclick="initResource.addSlideInfo(1);">添加信息</div>
				</div>
			</div>

			<div style="width: 25%;"></div>
			<div style="width: 25%;"></div>
		</div>
	</div>


	<div id="slideOpeDialg" style="display: none;">
		<form id="slideform" method="post"
			enctype="multipart/form-data">
			<table style="border-collapse: separate; border-spacing: 10px;">
				<tr>
					<td>
						<input type="hidden" name="id"> 
						<input type="hidden" name="associatedid"> 
						
						<select name="type" class="easyui-combobox" id="siteSelector"
						data-options="value:'请选择终图片类型'">
							<option value="0">首页轮播图</option>
							<option value="1">资讯右侧轮播图</option>
							
							<option value="1">推荐页最上方单图</option>
							<option value="2">推荐页中间3图</option>
							<option value="3">等级专家侧边图</option>
						</select>
					</td>
					
					
				</tr>
				
				<tr>
					<td>
						<input class="easyui-numberspinner"  
							data-options="prompt:'图片排序',value:1,min:1" name="sort" > 
					</td>
				</tr>
				
				<tr>
					<td>
						<input class="easyui-filebox"
						data-options="buttonText:'选择图片',prompt:'请选择焦点广告图...',
							onChange:function(newValue,oldValue){
								initResource.checkImageType(this,newValue);
							}"
						name="image_file">
					</td>
				</tr>
			</table>
		</form>
		
		
		
		
	</div>
</body>
</html>