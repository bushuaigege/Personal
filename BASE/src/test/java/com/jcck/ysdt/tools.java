package com.jcck.ysdt;

import org.junit.Test;

public class tools {
	@Test
	public void T(){
		String arr[] = "ABC^ AND win > 0 AND draw > 0 AND loss < 0".split("^");
		System.err.println(arr[0]);
		System.err.println(arr[1]);
	}
}
