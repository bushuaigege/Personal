package com.hk.ws.util;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

/**
 * 数据库请求分发类
 * @author 
 *
 */
@Service
public class DistributionDB {

	public void DBhandle(HttpServletRequest request) {
		String str = request.getParameter("ClientMark");
		if(str != null && !"".equals(str)) {
			if(str.equals("jccksite_A")) {
				DynamicDataSource.setCustomerType(DynamicDataSource.DATA_SOURCE_A);
			} else if(str.equals("jccksite_B")) {
				DynamicDataSource.setCustomerType(DynamicDataSource.DATA_SOURCE_B);
			}
			request.setAttribute("ClientMark", str);
		}
	}
	
}
