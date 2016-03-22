package com.hk.ws.service.sys;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.hk.ws.mapper.sys.UsersTblMapper;
import com.hk.ws.model.sys.UsersTbl;
import com.hk.ws.vo.SimpleWrap;

/**
 * @author Burke
 * 用户服务层实现
 * 2015-7-5下午4:18:43
 */

/**
 * Cacheable注解负责将方法的返回值加入到缓存中 CacheEvict注解负责清除缓存(它的三个参数与@Cacheable的意思是一样的)
 * 
 * @see ------------------------------------------------------------------------
 *      ----------------------------------
 * @see value------缓存位置的名称,不能为空,若使用EHCache则其值为ehcache.xml中的
 *      <cache name="myCache"/>
 * @see key--------缓存的Key,默认为空(表示使用方法的参数类型及参数值作为key),支持SpEL
 * @see condition--只有满足条件的情况才会加入缓存,默认为空(表示全部都加入缓存),支持SpEL
 * @see ------------------------------------------------------------------------
 *      ----------------------------------
 * @see 该注解的源码位于spring-context-3.2.4.RELEASE-sources.jar中
 * @see Spring针对Ehcache支持的Java源码位于spring-context-support-3.2.4.RELEASE-sources.
 *      jar中
 * @see ------------------------------------------------------------------------
 *      ----------------------------------
 * @create Oct 3, 2013 6:17:54 PM
 * @author 玄玉<http://blog.csdn.net/jadyer>
 */
@Service
public class UserServiceImpl4Annotation {
	@Autowired
	private UsersTblMapper usersTblMapper;
	// 将查询到的数据缓存到userCache中,并使用方法名称加上参数中的userNo作为缓存的key
	// 通常更新操作只需刷新缓存中的某个值,所以为了准确的清除特定的缓存,故定义了这个唯一的key,从而不会影响其它缓存值
	/*
	 * @Cacheable(value={"userCache","managerCache"}, key=
	 * "'Accounts' + #user.getAccount()",condition="#user != null")
	 */

	@CacheEvict(value = "matchCache", allEntries = true)
	public void removeUsers() {
		System.out.println("移除缓存中的所有数据");
	}

	/**
	 * @Title: getMathsTurnPage
	 * @Description: 翻页数据
	 * @param page
	 * @param rows
	 * @return 缓存数据和数据库中的数据实现同步
	 */

	// @Transactional(propagation = Propagation.REQUIRED)
	// 设定spring的ecache缓存策略,当编辑机构时候,把缓存全部清除掉,以达到缓存那数据同步;
	// @TriggersRemove(cacheName="departCache",removeAll=true)
	@Cacheable(value = "matchCache", key = "'Match_' + #page + '_' + #rows", condition = "#page != 0 and #rows != 0")
	// @Cacheable(value="matchCache")
	public SimpleWrap<UsersTbl> getMathsTurnPage(int page, int rows) {
		SimpleWrap<UsersTbl> wrap = new SimpleWrap<UsersTbl>();

		PageHelper.startPage(page, rows);
		List<UsersTbl> matchs = usersTblMapper.selectAll();

		PageInfo<UsersTbl> paging = new PageInfo<UsersTbl>(matchs);
		wrap.setTotal(paging.getTotal());
		wrap.setRows(paging.getList());

		return wrap;
	}

	/**
	 * @Title: selectByMatchId
	 * @Description: 查询
	 * @param matchId
	 * @return
	 */
	@Cacheable(value = "matchCache", key = "'Match_' + #matchId", condition = "#matchId != 0")
	public UsersTbl selectByMatchId(int matchId) {
		return usersTblMapper.selectByPrimaryKey(matchId);
	}

	@CacheEvict(value = "matchCache", key = "'Match_' + #matchId", condition = "#matchId != 0")
	public int deleteByMatchId(int matchId) {
		return usersTblMapper.deleteByPrimaryKey(matchId);
	}
}
