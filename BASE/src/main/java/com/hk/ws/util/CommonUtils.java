package com.hk.ws.util;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.io.StringReader;
import java.io.StringWriter;
import java.lang.reflect.Method;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import javax.xml.bind.JAXBContext;
import javax.xml.bind.JAXBException;
import javax.xml.bind.Marshaller;
import javax.xml.bind.Unmarshaller;
import com.google.gson.Gson;

/**
 * @author Buke
 * 常用工具集合
 * 2015-8-14下午6:03:50
 */
public class CommonUtils {
	public final static Gson gson = new Gson();
	
	
	public static String getEncryption(String originString) {
		String result = "";
		if (originString != null) {
			try {
				// 指定加密的方式为MD5
				MessageDigest md = MessageDigest.getInstance("MD5");
				// 进行加密运算
				byte bytes[] = md.digest(originString.getBytes());
				for (int i = 0; i < bytes.length; i++) {
					// 将整数转换成十六进制形式的字符串 这里与0xff进行与运算的原因是保证转换结果为32位
					String str = Integer.toHexString(bytes[i] & 0xFF);
					if (str.length() == 1) {
						str += "F";
					}
					result += str;
				}
			} catch (NoSuchAlgorithmException e) {
				e.printStackTrace();
			}
		}
		return result.toUpperCase();
	}

	/**
	 * 当前时间格式化
	 * 
	 * @param parseFormat
	 * @return
	 */
	public static String DateFormat(String parseFormat, Date date) {
		SimpleDateFormat simpleFormat = new SimpleDateFormat(parseFormat);
		return simpleFormat.format(date);
	}
	
	
	/**
	 * @return 生成唯一标识符
	 * CommonUtils
	 * 2015-6-19下午2:26:53
	 */
	public static String GenerateUUID(){
		return UUID.randomUUID().toString().replace("-", "");
	}
	
	
	/**
	 * @Title: getHKEncryption
	 * @Description: 获取华康加密字符串
	 * @return
	 */
	public static String getHKEncryption(String partnerkey) {
		Calendar calc = Calendar.getInstance();
		String tmp = DateFormat("yyyy-MM-dd H:m:s", calc.getTime());
		tmp = tmp.concat(partnerkey);
		return getEncryption(tmp);
	}

	/**
	 * @Title: objectToMap
	 * @Description: 对象转换为MAP
	 * @param obj
	 * @return
	 * @throws Exception
	 */
	public static Map<String, Object> objectToMap(Object obj) throws Exception {
		if (obj == null)
			return null;

		Map<String, Object> map = new ConcurrentHashMap<String, Object>();

		BeanInfo beanInfo = Introspector.getBeanInfo(obj.getClass());
		PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
		for (PropertyDescriptor property : propertyDescriptors) {
			String key = property.getName();
			if (key.compareToIgnoreCase("class") == 0) {
				continue;
			}
			Method getter = property.getReadMethod();
			Object value = getter != null ? getter.invoke(obj) : null;
			map.put(key, value);
		}
		return map;
	}

	
	/** 
	* @Title: XML2Object 
	* @Description: XML反序列化为对象
	* @param clazz
	* @param xmlStr
	* @return
	* @throws JAXBException  
	*/
	@SuppressWarnings("unchecked")
	public static <T> T converyToJavaBean(Class<T> clazz, String xmlStr) {
		T entity = null;
		try {
			JAXBContext context = JAXBContext.newInstance(clazz);
			Unmarshaller unmarshaller = context.createUnmarshaller();
			entity = (T) unmarshaller.unmarshal(new StringReader(xmlStr));
		} catch (JAXBException e) {
			e.printStackTrace();
		}
		return entity;
	}
	
	
	/** 
     * JavaBean转换成xml 
     * @param obj 
     * @param encoding  
     * @return  
     */  
    public static String convertToXml(Object obj, String encoding) {  
        String result = null;  
        try {  
            JAXBContext context = JAXBContext.newInstance(obj.getClass());  
            Marshaller marshaller = context.createMarshaller();  
            marshaller.setProperty(Marshaller.JAXB_FORMATTED_OUTPUT, true);  
            marshaller.setProperty(Marshaller.JAXB_ENCODING, encoding);  
  
            StringWriter writer = new StringWriter();  
            marshaller.marshal(obj, writer);  
            result = writer.toString();  
        } catch (Exception e) {  
            e.printStackTrace();  
        }  
  
        return result;  
    }
	
	
}
