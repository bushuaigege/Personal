package com.jcck.ysdt;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.hk.ws.mapper.sys.UsersTblMapper;
import com.hk.ws.util.DynamicDataSource;


/**
 * @ClassName: TestUserService
 * @author Administrator
 * @Description:
 * @date 2016年1月20日 下午7:37:39
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = { "classpath:spring.xml", "classpath:spring-mybatis.xml" })
public class TestUserService {

	private Map<String, String> map = new HashMap<String, String>();

	@Autowired
	private UsersTblMapper usersTblMapper;

	@Test
	public void testUserLogin() {
		// 设置数据源为MySql,使用了AOP测试时请将下面这行注释
		DynamicDataSource.setCustomerType("jccksite_A");
		System.out.println(usersTblMapper.selectAll().size());
		// 设置数据源为SqlServer,使用AOP测试时请将下面这行注释
		DynamicDataSource.setCustomerType("jccksite_B");
		System.out.println(usersTblMapper.selectAll().size());
	}

	@Test
	public void synMap() {
		//获取多线程环境下同步HashMap
		Collections.synchronizedMap(map);
		
		ConcurrentHashMap<String, String> conMap = new ConcurrentHashMap<String, String>();
		conMap.put("a", "a");
	}

}
