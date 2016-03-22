<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/jsp/base.jsp"%>

<!DOCTYPE>
<html>
<head>
<title>额外赛事添加</title>
</head>
<body>

	<!-- 别弄反了	Win胜	Draw平	loss负 -->
	<div class="easyui-panel" title="额外赛事数据录入">
		<form id="extensionForm" method="post" data-options="novalidate:true" action="<%=webapp%>/match/addOther">
			<table style="border-collapse: separate; border-spacing: 12px;">
				<tbody>
					<tr>
						<td><strong>第一条赛事数据=></strong></td>
						<td>
							<input type="text" class="easyui-textbox" 
									data-options="prompt:'主队名称',required:true" name="homeName"/>
							
							<input type="text" class="easyui-textbox" 
									data-options="prompt:'客队名称',required:true" name="awayName"/>
									
						</td>
						
						<td><strong>比赛得分</strong></td>
						<td>
							
							<input type="text" class="easyui-numberbox" 
							data-options="iconCls:'icon-search',prompt:'主队得分',required:true" name="home"> 
							
							<input type="text" class="easyui-numberbox" 
							data-options="prompt:'客队得分',min:0,required:true" name="away"> 
						</td>
						
						<td><strong>初始数据</strong></td>
						
						<td>
							<input type="text" class="easyui-numberbox" 
							data-options="prompt:'胜',required:true" name="init_win"> 
							
							<input type="text" class="easyui-numberbox" 
							data-options="prompt:'平',required:true" name="init_draw"> 
							
							<input type="text" class="easyui-numberbox" 
							data-options="prompt:'负',required:true" name="init_loss"> 
						</td>
						
						<td><strong>即时数据</strong></td>
						
						<td>
							<input type="text" class="easyui-numberbox" 
							data-options="prompt:'胜',required:true" name="now_win"> 
							
							<input type="text" class="easyui-numberbox" 
							data-options="prompt:'平',required:true" name="now_draw"> 
							
							<input type="text" class="easyui-numberbox" 
							data-options="prompt:'负',required:true" name="now_loss"> 
							
						</td>
						
						<td><strong>盘口</strong></td>
						
						<td>
							<select name="initHandicap" class="easyui-combobox"
								data-options="prompt:'初始盘口',required:true,panelHeight:282,editable:false">
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
					</tr>
				</tbody>
			</table>
			
			
		    <div style="text-align:center;">
		    	<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-save'" onclick="submitForm()">提交</a>
		    	<a href="javascript:void(0)" class="easyui-linkbutton" data-options="iconCls:'icon-remove'" onclick="clearForm()">清空</a>
		    </div>
		</form>
	</div>
</body>

<script type="text/javascript">
	function submitForm() {
		$('#extensionForm').form('submit', {
			onSubmit : function() {
				return $(this).form('enableValidation').form('validate');
			},
			success:function(data){ 
				initCompent.validateResult(data, ['保存赛事成功!!!','存储赛事失败!!!'], null, $('#extensionForm'));
		    }  
		});
	}
	
	function clearForm() {
		$('#extensionForm').form('clear');
	}
</script>


</html>