package com.hk.ws.intercefilter;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;


/** 
* @ClassName: MultipleDataSourceAspectAdvice 
* @author Buke
* @Description: AOP通过拦截请求切换数据源
* @date 2016年2月26日 下午2:46:12 
*/
@Component
@Aspect
public class MultipleDataSourceAspectAdvice {
	
	@Around("execution(* com.jcck.ysdt.mapper.*.*.*(..))")
	public Object doAround(ProceedingJoinPoint jp) throws Throwable {
		/*if (jp.getTarget() instanceof MySqlMapper) {
			DynamicDataSource.setCustomerType("jccksite_A");
		} else if (jp.getTarget() instanceof SqlServerMapper) {
			DynamicDataSource.setCustomerType("jccksite_B");
		}*/
		return jp.proceed();
	}
}
