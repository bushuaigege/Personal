package com.hk.ws;

import java.util.HashMap;
import java.util.Map;

/**
* <p>@author Buke</p>
* <p>Description:常量字段集合 </p>
* @date 2015年11月25日下午7:56:27
*/
public class ConstantFields<T> {
	/**成功*/
	public final static int SUCCESS = 1;
	/**失败*/
	public final static int FAILURE = 0;
	/**参数传递不合法*/
	public final static int PARAMS_ERROR = 2;
	/**通用返回MAP结构*/
	public static Map<String,Integer> result = new HashMap<String,Integer>(); 
	
	/**session用户Key*/
	public final static String GLOBAL_USER = "GLOBAL_USER";
	
	/**图片验证码Key*/
	public final static String GLOBAL_CAPTCHA = "GLOBAL_CAPTCHA";
}
