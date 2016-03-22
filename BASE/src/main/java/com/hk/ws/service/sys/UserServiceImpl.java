package com.hk.ws.service.sys;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hk.ws.mapper.sys.UsersTblMapper;
import com.hk.ws.model.sys.UsersTbl;
import com.hk.ws.util.cache.RedisCache;
import com.hk.ws.vo.SimpleWrap;


/** 
* @ClassName: UserServiceImpl 
* @author bushuai
* @Description: redis
* @date 2016年3月21日 下午3:10:21 
*/
@Service
public class UserServiceImpl {
	@Autowired
	private UsersTblMapper usersTblMapper;
	
	@Autowired
	private RedisCache<String,SimpleWrap<UsersTbl>> redisCache;
	/**
	 * @Title: getMathsTurnPage
	 * @Description: 翻页数据
	 * @param page
	 * @param rows
	 * @return 缓存数据和数据库中的数据实现同步
	 */
	@SuppressWarnings("unchecked")
	public SimpleWrap<UsersTbl> getUserTurnPage(int page, int rows) {
		SimpleWrap<UsersTbl> wrap = new SimpleWrap<UsersTbl>();
		
		if(redisCache.get("User_" + page + "" + rows) != null){
			//不可运行
			wrap = (SimpleWrap<UsersTbl>) redisCache.get("User_" + page + "" + rows).get();
		}else{
			PageHelper.startPage(page, rows);
			List<UsersTbl> users = usersTblMapper.selectAll();
			PageInfo<UsersTbl> paging = new PageInfo<UsersTbl>(users);
			wrap.setTotal(paging.getTotal());
			wrap.setRows(paging.getList());
			redisCache.put("User_" + page + "" + rows , wrap);
		}
		return wrap;
	}

	/**
	 * @Title: selectByMatchId
	 * @Description: 查询
	 * @param matchId
	 * @return
	 */
	public UsersTbl selectByUserId(String userId) {
		return usersTblMapper.selectByPrimaryKey(userId);
	}

	public int deleteByMatchId(String userId) {
		return usersTblMapper.deleteByPrimaryKey(userId);
	}
}
