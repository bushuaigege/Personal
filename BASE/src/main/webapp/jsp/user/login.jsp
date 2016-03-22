<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@include file="/jsp/base.jsp"%>
<!DOCTYPE html>
<html lang="en" class="no-js">
<head>
<title>精彩创客登录(Login)</title>
<!-- CSS -->
<link rel="stylesheet" href="<%=css%>/login/reset.css">
<link rel="stylesheet" href="<%=css%>/login/supersized.css">
<link rel="stylesheet" href="<%=css%>/login/style.css">
<link rel='icon' href='favicon.ico' type='image/x-ico' />

<script src="<%=js%>/login/supersized.3.2.7.min.js"></script>
<script src="<%=js%>/login/supersized-init.js"></script>
<script src="<%=js%>/login/scripts.js"></script>
<script type="text/javascript" src="<%=js%>/login/jquery.md5.js"></script>

</head>
<body>
	<div class="page-container">
		<h1>赢胜数据后台(Sign in)</h1>
		
		<form action="<%=webapp%>/user/signIn" method="post">
			<div class="error"><span>${tips}</span></div>
			
			<input type="text" name="account" class="username"
				placeholder="请输入您的用户名！"> 
				<input type="password"
				name="password" class="password" placeholder="请输入您的用户密码！">

			<!-- TODO 增加验证码和错误信息提示 name="captcha"-->
			<input type="text" class="Captcha"  placeholder="请输入验证码！" name="captcha">
            <img id="valiteCode" onclick="initOper.refreshCaptcha();" title="点击图片刷新验证码" style="padding: 13px 0px 0px 15px; cursor: pointer;"/>
            

			<button type="submit" class="submit_button" id="signIn">登录</button>

		</form>
		
		<div class="connect">
			<p>快捷</p>
			<p>
				<a class="icon_qq" href="" target="_blank" title="QQ帐号登录"></a> 
				<a class="icon_wechat" href="" target="_blank" title="微信帐号登录"></a>
			</p>
		</div>
	</div>
</body>


<script type="text/javascript">
	var initOper = {
		refreshCaptcha : function(){
			$.get(Constans.appName + "/commons/code.do", function(code){$("#valiteCode").attr("src",Constans.verificationRes + code);});
		}
	};
	
	$(function() {
		// 登陆按钮提交事件
		$('.submit_button').click(function() {
			var $p = $("input[name='password']");
			
			if(!$("input[name='account']").val() || !$p.val() || !$("input[name='captcha']").val()){
				$(".error span").text("必填字段不能为空!!!");
				return false;
			}
			
			// md5加密
			
			$p.val($.md5($p.val()).toUpperCase());
		});
		
		initOper.refreshCaptcha();
	});
</script>
</html>
