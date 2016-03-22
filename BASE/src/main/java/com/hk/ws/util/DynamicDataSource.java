package com.hk.ws.util;

import org.springframework.jdbc.datasource.lookup.AbstractRoutingDataSource;

public class DynamicDataSource extends AbstractRoutingDataSource {

	public static final String DATA_SOURCE_A = "jccksite_A";

	public static final String DATA_SOURCE_B = "jccksite_B";
	
	/** 
	* @Fields contextHolder : 
	* DynamicDataSource实现determineCurrentLookupKey方法,
	* Spring使用自定义数据源时就会调用这俩个方法,但是如果使用List或者Set等
	* 集合存储datasource String类型变量会造成线程修改混乱,因为spring单例会使实例对象变量数据共享
	* 也可以修改prototype来达到DynamicDataSource多例模式,推荐使用ThreadLocal存储
	* ThreadLocal为每个使用该变量的线程提供独立的变量副本，所以每一个线程都可以独立地改变自己的副本，而不会影响其它线程所对应的副本
	*/
	private static final ThreadLocal<String> contextHolder = new ThreadLocal<String>();


	public static void setCustomerType(String customerType) {
		contextHolder.set(customerType);
	}

	public static String getCustomerType() {
		return contextHolder.get();
	}

	public static void clearCustomerType() {
		contextHolder.remove();
	}

	@Override
	protected Object determineCurrentLookupKey() {
		return getCustomerType();
	}

}