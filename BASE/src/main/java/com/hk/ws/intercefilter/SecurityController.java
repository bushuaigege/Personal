package com.hk.ws.intercefilter;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.hk.ws.ConstantFields;


/**
* <p>@author Buke</p>
* <p>Description: 登录拦截器 </p>
* @date 2015年11月30日下午5:22:55
*/
public class SecurityController implements HandlerInterceptor{
	
	private List<String> excludedUrls = null;
	
	public void setExcludedUrls(List<String> excludedUrls) {
		this.excludedUrls = excludedUrls;
	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		String reqUrl = request.getRequestURI();
		
		for (String url : excludedUrls) {
			if (reqUrl.contains(url)) return true;
		}
		
		HttpSession session = request.getSession(true);
		/** 从session 里面获取用户名的信息 */
		Object obj = session.getAttribute(ConstantFields.GLOBAL_USER);
		
		/** 判断如果没有取到用户信息，就跳转到登陆页面，提示用户进行登陆 */
		if (obj == null){
			response.sendRedirect("/user/loginPage");
			//response.getWriter().write("<script>   top.window.location.href = '/user/loginPage?r='+Math.random() ;</script>");
			return false;
		}
		return true;
	}

	@Override
	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			ModelAndView modelAndView) throws Exception {
		
	}

	@Override
	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		
	}
}