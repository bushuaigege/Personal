package com.hk.ws.vo;

import java.io.Serializable;
import java.util.List;

/**
* <p>@author Buke</p>
* <p>Description: Easyui Datagrid封装数据对象</p>
* @param <T>
* @date 2015年11月23日下午6:59:49
*/
public class SimpleWrap<T> implements Serializable {
	
	private static final long serialVersionUID = 1245501847273399989L;
	/* 总数目 **/
	private long total;
	/* 行记录集合 **/
	private List<T> rows;

	public SimpleWrap() {
		super();
	}

	public SimpleWrap(int total, List<T> rows) {
		super();
		this.total = total;
		this.rows = rows;
	}

	public List<T> getRows() {
		return rows;
	}

	public void setRows(List<T> rows) {
		this.rows = rows;
	}

	public long getTotal() {
		return total;
	}

	public void setTotal(long total) {
		this.total = total;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
}
