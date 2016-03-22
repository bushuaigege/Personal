package com.hk.ws.util;

import java.io.File;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

/**
* <p>@author Buke</p>
* <p>Description: 文件工具类</p>
* @date 2015年11月26日上午11:58:57
*/
public class FileUtil{
	
	private static Logger logger = Logger.getLogger(FileUtil.class);
	
	/**
	 * 单文件上传
	 * @param ClientFile
	 * @param configReal
	 * @return
	 */
	public static String headleUploadFileData(CommonsMultipartFile ClientFile,String configReal){
		
		String uuid = CommonUtils.GenerateUUID();
		/**日期文件夹*/
		String prefix = CommonUtils.DateFormat("yyyyMMdd", new Date()) + "/";
		
		/**真实文件名和类型*/
		String FileName = ClientFile.getOriginalFilename();
		String FileType = FileName.substring(FileName.lastIndexOf("."));

		/**新文件名*/
		String newFileName = uuid + FileType;;
		/**上传真实路径*/
		String realPath = configReal + prefix + newFileName;
		
		File Sf = new File(realPath);
		
		if(!Sf.exists())	Sf.mkdirs();
		
		try {
			ClientFile.transferTo(Sf);
		} catch (Exception e) {
			logger.error("resource image Upload error...", e);
			return null;
		}
		
		return prefix + newFileName;
	}
	
	
	public static Map<String, Object> MultifileUpload(HttpServletRequest req,String configReal){
		/**<KEY> INPUT控件		<VALUE>	文件上传后路径**/
		Map<String,Object> keyPath = new HashMap<String,Object>();
		
		String prefix = CommonUtils.DateFormat("yyyyMMdd", new Date()) + "/";
		
		CommonsMultipartResolver resolver = new CommonsMultipartResolver(req.getSession().getServletContext());
		
		if(resolver.isMultipart(req)){
			
			MultipartHttpServletRequest multipart = (MultipartHttpServletRequest)req;
			
			Iterator<String> iterator = multipart.getFileNames();
			
			while(iterator.hasNext()){
				
				MultipartFile Clientfile = multipart.getFile(iterator.next());
				
				if(Clientfile != null){
					
				    String uuid = CommonUtils.GenerateUUID();
				    
				    String ClientfileName = Clientfile.getOriginalFilename();
				    
				    String fileType = ClientfileName.substring(ClientfileName.lastIndexOf("."));
				    /*生成的保存路径<TIME＋DATE＋FILE　TYPE>**/
				    String relativePath = prefix + uuid + fileType;
				    /*文件需要保存绝对路径**/
					String absolutePath = configReal + relativePath;
					
					File ServerFile = new File(absolutePath);
					
					if(!ServerFile.exists())ServerFile.mkdirs();
					
					try {
						Clientfile.transferTo(ServerFile);
					} catch (Exception e) {
						logger.error("more file upload failure...", e);
					}
					keyPath.put(Clientfile.getName(),relativePath);
				}
			}
		}
		return keyPath;
	}
	
	/**
	 * @param fileName
	 * @param types
	 * @return 检测文件类型
	 * FileUtils
	 * 2015-9-15下午2:02:20
	 */
	public static boolean checkFileType(String fileName,String types[]) {
		Iterator<String> type = Arrays.asList(types).iterator();
		while (type.hasNext()) {
			String ext = type.next();
			if (fileName.toLowerCase().endsWith(ext)) {
				return true;
			}
		}
		return false;
	}
}
