package com.hk.ws.intercefilter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.hk.ws.ConstantFields;

/**
* <p>@author Buke</p>
* <p>Description: 登录权限拦截器</p>
* @date 2015年11月30日上午11:07:19
*/

public class SecurityJSP implements Filter{
	
	private final String LOGIN_URL[] = {"/user/loginPage","/user/signIn"};
	
	
	public void doFilter(ServletRequest req, ServletResponse rep, FilterChain chain) throws IOException, ServletException {
		
		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) rep;
		HttpSession session = request.getSession(true);
		
		String reqUrl = request.getRequestURI();
		
		// 排除 /user/login.do 和/user/loginPage.do
		for (String s : LOGIN_URL) {
			if (reqUrl.contains(s)){
				chain.doFilter(request, response);
				return;
			}
		}
		
		/** 从session 里面获取用户名的信息 */
		Object obj = session.getAttribute(ConstantFields.GLOBAL_USER);
		/** 判断如果没有取到用户信息，就跳转到登陆页面，提示用户进行登陆 */
		if (obj != null) {
			chain.doFilter(request, response);
			return;
		}
		response.getWriter().write("<script>   top.window.location.href = '"+ request.getContextPath() +"/user/loginPage?r='+Math.random() ;</script>");
		//request.getRequestDispatcher("/user/loginPage").forward(request, response);
	}

	public void init(FilterConfig filterConfig) throws ServletException {
		 System.out.println("begin do the encoding filter!");  
	}

	public void destroy() {
		
	}
}