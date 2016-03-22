package com.hk.ws.controller.sys;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hk.ws.model.sys.UsersTbl;
import com.hk.ws.service.sys.UserServiceImpl;
import com.hk.ws.vo.SimpleWrap;

/**
 * @ClassName: UserControl
 * @author Buke
 * @Description: 用户登录
 * @date 2016年2月26日 下午4:26:47
 */
@Controller
@RequestMapping("/user")
public class UserControl {

	@Autowired
	private UserServiceImpl userServiceImpl;
	
	@RequestMapping(value = "/{page}/{rows}", method = RequestMethod.GET)
	public @ResponseBody SimpleWrap<UsersTbl> loadInfos(@PathVariable(value = "page") int page,
			@PathVariable(value = "rows") int rows) {
		if (rows == 0 || page == 0)
			return null;
		return userServiceImpl.getUserTurnPage(page, rows);
	}
	
	
	
	@RequestMapping(value = "/{userId}", method = RequestMethod.GET)
	public @ResponseBody UsersTbl login(@PathVariable(value = "userId") String userId) {
		if (userId.isEmpty())return null;
		return userServiceImpl.selectByUserId(userId);
	}
}
