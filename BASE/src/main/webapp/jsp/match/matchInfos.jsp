<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/jsp/base.jsp"%>

<!DOCTYPE>
<html>
<head>
<title>赛事列表</title>
<script type="text/javascript" src="<%=js%>/match/matchInfos.js"></script>

</head>
<body>
	<table id="matchInfo"></table>
	
	<!-- 赛事右键操作 -->
	<div id="matchMenu" class="easyui-menu" style="width: 120px;"
		data-options="duration:500">
		<div data-options="iconCls:'icon-edit'"
			onclick="initMatchInfos.buildOddsDialog();">修改初始赔率</div>
		<div data-options="iconCls:'icon-add'"
			onclick="initMatchInfos.addExtension();">补充数据</div>
		<div data-options="iconCls:'icon-save'"
			onclick="initMatchInfos.addhisRs();">点评澳彩历史数据</div>
	</div>
	
	
	<!-- 赛事筛选工具栏 -->
	<div id="screenTools" style="padding:2px 5px;">
		<!-- value设置为javascript可能是由于 -->
		从~: <input class="easyui-datetimebox" data-options="required:true,editable:false,showSeconds:false" id="startTime" value=" 00:00">
		~至: <input class="easyui-datetimebox" data-options="required:true,editable:false,showSeconds:false" id="endTime" value=" 00:00">
		
		<a href="javascript:initMatchInfos.reload4Time();" 
				class="easyui-linkbutton" data-options="iconCls:'icon-search'" >Search</a>
	</div>
	
	
	<!-- 赢胜数据对话框 -->
	<div id="ysEditDialog" style="display: none;" data-options="iconCls:'icon-add'">
		<form id="ysForm" method="post" data-options="novalidate:true">
			<table style="border-collapse: separate; border-spacing: 20px;">
				<tbody>
					<tr>
						<td>
							<input type="hidden" name="matchId">
							<input type="text" class="easyui-numberbox" data-options="iconCls:'icon-search',prompt:'胜',required:true" name="win"> 
						</td>

						<td>
							<input type="text" class="easyui-numberbox" data-options="prompt:'平',required:true" name="draw"/>
						</td>
						
						<td>
							<input type="text" class="easyui-numberbox" data-options="prompt:'负',required:true" name="loss"/>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
	</div>
	
	
	<!-- 赛事点评对话框 -->
	<div id="reviewDialog" style="display: none;" data-options="iconCls:'icon-save'">
		<form id="reviewForm" method="post" data-options="novalidate:true">
			
			<table style="border-collapse: separate; border-spacing: 20px;">
				<tbody>
					<tr>
						<td>
							<input type="hidden" name="id">
							<input type="hidden" name="matchId">
							<input type="text" class="easyui-numberbox" data-options="iconCls:'icon-search',prompt:'胜',required:true" name="win"> 
						</td>

						<td>
							<input type="text" class="easyui-numberbox" data-options="prompt:'平',required:true" name="draw"/>
						</td>
						
						
						<td>
							<input type="text" class="easyui-numberbox" data-options="prompt:'负',required:true" name="loss"/>
						</td>
					</tr>
					
					<tr>
						<td colspan="3">
							 <textarea  class="easyui-tooltip" rows="10" 
								title="关于这条赛事,你想说点什么..."  
								style="resize:none;width:100%" 
								onscroll="this.rows++;" name="content"></textarea>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
	</div>
	
	
	
	
	<!-- 赛事点评澳彩历史数据-->
	<div id="aoHisRsDialog" style="display: none;" data-options="iconCls:'icon-add'">
		<form id="aoHisRsForm" method="post">
			<input type="hidden" name="id">
			<input type="hidden" name="matchId">
			
			<table style="border-collapse: separate; border-spacing: 20px;">
				<tbody>
					<tr>
						<td>
							<select name="type" id="reviewAoType" class="easyui-combobox" data-options="value:0,panelHeight:64,value:0,editable:false,onSelect:function(record){
									initMatchInfos.toggleType(record);
								}">
									<option value=0 selected="selected">请选择数据类型</option>
									<option value=1>临场降水</option>
									<option value=2>临场升水</option>
							</select>
						</td>
						<td><input class="easyui-textbox" data-options="prompt:'精选',required:true" name="choiceness"></td> 
					</tr>
					
					<!-- 胜平负  -->
					<tr>
						<td>
							<input type="text" class="easyui-numberbox" data-options="iconCls:'icon-search',prompt:'胜',required:true" name="win"> 
							
						</td>

						<td>
							<input type="text" class="easyui-numberbox" data-options="prompt:'平',required:true" name="draw"/>
						</td>
						
						<td>
							<input type="text" class="easyui-numberbox" data-options="prompt:'负',required:true" name="loss"/>
						</td>
					</tr>
					
					<!-- 盘路 -->
					<tr>
						<td>
							<input type="text" class="easyui-numberbox" 
							data-options="iconCls:'icon-search',prompt:'上盘次数',required:true" name="upHandicap"> 
						</td>

						<td>
							<input type="text" class="easyui-numberbox" data-options="prompt:'走盘',required:true" name="goHandicap"/>
						</td>
						
						<td>
							<input type="text" class="easyui-numberbox" data-options="prompt:'下盘',required:true" name="downHandicap"/>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
	</div>
	
	
	
	
	<!-- 赛事补充数据对话框 -->
	<div id="extensionDialog" style="display: none;" data-options="iconCls:'icon-save'">
		<form id="extensionForm" method="post" data-options="novalidate:true">
			<input type="hidden" name="id">
			<input type="hidden" name="matchScheduleId">
							
			<table style="border-collapse: separate; border-spacing: 12px;">
				<tbody>
					<tr>
						<td><strong>对阵双方比分=></strong></td>
						<td>
							<input type="text" class="easyui-numberbox" 
							data-options="iconCls:'icon-search',prompt:'主队比分',min:0" name="home"> 
						</td>
						
						<td>
							<input type="text" class="easyui-numberbox" 
							data-options="prompt:'客队比分',min:0" name="away"> 
						</td>
					</tr>
					
					
					<tr>
						<td><strong>赛事初盘及水位=></strong></td>
						<td>
							<select name="initHandicap" class="easyui-combobox"
								data-options="prompt:'初始盘口',panelHeight:282,editable:false">
									<option value="平手">平手</option>
									<option value="受平手">受平手</option>
									
									<option value="平半">平半</option>
									<option value="受平半">受平半</option>
									
									<option value="半球">半球</option>
									<option value="受半球">受半球</option>
									
									<option value="半一">半一</option>
									<option value="受半一">受半一</option>
									
									<option value="一球">一球</option>
									<option value="受一球">受一球</option>
									
									<option value="一球球半">一球球半</option>
									<option value="受一球球半">受一球球半</option>
									
									<option value="球半">球半</option>
									<option value="受球半">受球半</option>
							</select>
							
						</td>
						
						
						<td>
							<input class="easyui-numberbox" 
							data-options="prompt:'初始水位',min:0,precision:2" name="initWl"> 
						</td>
					</tr>
					
					
					<tr>
						<td><strong>赛事临盘及水位=></strong></td>
						<td>
							<select name="endHandicap" class="easyui-combobox"
								data-options="prompt:'临场盘口',panelHeight:282,editable:false">
									<option value="平手">平手</option>
									<option value="受平手">受平手</option>
									
									<option value="平半">平半</option>
									<option value="受平半">受平半</option>
									
									<option value="半球">半球</option>
									<option value="受半球">受半球</option>
									
									<option value="半一">半一</option>
									<option value="受半一">受半一</option>
									
									<option value="一球">一球</option>
									<option value="受一球">受一球</option>
									
									<option value="一球球半">一球球半</option>
									<option value="受一球球半">受一球球半</option>
									
									<option value="球半">球半</option>
									<option value="受球半">受球半</option>
							</select>
						</td>
						
						<td>
							<input type="text" class="easyui-numberbox" 
								data-options="prompt:'临场水位',min:0,precision:2" name="spotWl"/>
						</td>
					</tr>
					
					<tr>
						<td>
							<strong>赛事盘路=></strong>
						</td>
						
						
						<td>
							<select name="handicapRoad" class="easyui-combobox"
								data-options="panelHeight:86,editable:false">
									<option value=0>请选择盘路</option>
									<option value=1>上盘</option>
									<option value=2>走</option>
									<option value=3>下盘</option>
							</select>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
	</div>
	
</body>
</html>