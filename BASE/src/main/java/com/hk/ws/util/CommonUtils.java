package com.hk.ws.util;

import java.nio.charset.Charset;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.junit.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

/**
 * @author Buke
 * 常用工具集合
 * 2015-8-14下午6:03:50
 */
public class CommonUtils {
	
	/**
	 * @param strArray 字符串数组
	 * @param isFull (true判断是否全部不为空	false至少一个不为空)
	 * @return
	 * CommonUtils 验证字符串数组
	 * 2015-8-14下午6:02:43
	 */
	public static boolean valiteStrArray(String strArray[],boolean isFull){
		int result = 0;
		for (String str : strArray) {
			result += (str != null && !str.isEmpty()) ? 1 : 0; 
		}
		boolean fullOrJustOne = isFull ? result == strArray.length : result > 0;
		return fullOrJustOne;
	}
	
	
	
	
	/**
	 * 判断对象是否为NULL 或者为空
	 * @param object
	 * @return
	 */
	public static boolean isValid(Object object){
		if(object == null){
			return false;
		}
		if(object instanceof List){
			return !((List<?>) object).isEmpty();
		}
		if(object instanceof Map){
			return !((Map<?, ?>) object).isEmpty();
		}
		if(object instanceof String){
			return !((String) object).isEmpty();
		}
		
		return true;
	}
	
	
	
	/**
	 * @param val
	 * @param split
	 * @return
	 * 作用：字符串数组转整形数组
	 */
	public static int[] str2IntArr(String val,String split){
		if(val == null || val.isEmpty() || split == null || split.isEmpty()){
			return null;
		}
		String str[] = val.replaceAll("'", "").split(split);
		int result[] = new int[str.length];
		for (int i = 0 ;i <str.length ;i++) {
			result[i] = string2Int(str[i]);
		}
		return result;
	}
	
	
	/**
	 * string 转化成int
	 * @param value
	 * @return
	 */
	public static int string2Int(String value) {
		try {
			if (value == null || value.equals("")) {
				return 0;
			}
			return Integer.parseInt(value);
		} catch (Exception e) {
			return 0;
		}
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
	 * 生成json
	 * 
	 * @param msgCode
	 * @param body
	 * @return
	 */
	public static ResponseEntity<String> toJson(int msgCode, String body) {
		HttpHeaders responseHeaders = new HttpHeaders();
		MediaType mediaType = new MediaType("text", "html",
				Charset.forName("UTF-8"));
		responseHeaders.setContentType(mediaType);
		String value = "{\"msgCode\":" + msgCode + ",\"body\":" + body + "}";
		ResponseEntity<String> responseEntity = new ResponseEntity<String>(
				value, responseHeaders, HttpStatus.CREATED);
		return responseEntity;
	}
	
	
	public static ResponseEntity<String> toJson(String value) {
		HttpHeaders responseHeaders = new HttpHeaders();
		MediaType mediaType = new MediaType("text", "html",
				Charset.forName("UTF-8"));
		responseHeaders.setContentType(mediaType);
		
		ResponseEntity<String> responseEntity = new ResponseEntity<String>(
				value, responseHeaders, HttpStatus.CREATED);
		return responseEntity;
	}
	
	/**
	 * MD5加密
	 * @param originString
	 * @return
	 */
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
	 * @param parseFormat
	 * @return
	 */
	public static String DateFormat(String parseFormat,Date date){
		SimpleDateFormat simpleFormat = new SimpleDateFormat(parseFormat);
		return simpleFormat.format(date);
	}
	
	@Test
	public void test(){
		System.out.println(CommonUtils.getEncryption("admin"));
	}
}
