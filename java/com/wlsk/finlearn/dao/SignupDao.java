package com.wlsk.finlearn.dao;
/**
 * 
 * 
 * @author WLSK801
 * @version 2017.05.18
 */

import org.apache.ibatis.annotations.Param;

import com.wlsk.finlearn.entity.UserAccount;

public interface SignupDao {
	/**
	 * add account
	 * @param loginName, passw
	 */
	public void insertUser(UserAccount userAccount);

}
