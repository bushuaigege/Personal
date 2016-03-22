package com.hk.ws.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

/**
 * @author Buke
 * 读取配置字段
 */
@Configuration
public class ConfigurationFields {
	/**资讯资源上传路径*/
	@Value("#{pValue['sys.path.infoRes']}")
	protected String infoRes;
	/**文件资源上传路径*/
	@Value("#{pValue['sys.path.uploadRes']}")
	protected String uploadRes;

	/**验证码资源上传路径*/
	@Value("#{pValue['sys.path.verificationRes']}")
	protected String verificationRes;
	
	/**验证码图片后缀*/
	@Value("#{pValue['sys.code.Suffix']}")
	protected String codeSuffix;
	
	/**图片宽度*/
	@Value("#{pValue['sys.code.Width']}")
	protected int codeWidth;
	
	/**图片高度*/
	@Value("#{pValue['sys.code.Height']}")
	protected int codeHeight;
	
	/**发布资讯允许上传的图片格式*/
	@Value("#{pValue['sys.info.imgTypeSupport']}")
	protected String imgTypeSupport;
}
