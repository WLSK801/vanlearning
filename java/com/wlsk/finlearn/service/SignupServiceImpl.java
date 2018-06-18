package com.wlsk.finlearn.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wlsk.finlearn.dao.LoginDao;
import com.wlsk.finlearn.dao.SignupDao;
import com.wlsk.finlearn.entity.UserAccount;

@Service("SignupService")
public class SignupServiceImpl implements SignupService {

	@Autowired
	LoginDao loginMapper;

	@Autowired
	SignupDao signupMapper;

	/**
	 * check whether user name exist in DB
	 * 
	 * @param loginname
	 * 
	 * @return result
	 */
	public boolean accountCheck(String loginname) {
		UserAccount user = loginMapper.selectByName(loginname);
		if (user == null)
			return false;
		else
			return true;
	}

	/**
	 * 
	 */
	public void signup(String loginname, String passw) {
		UserAccount user = new UserAccount();
		user.setLoginname(loginname);
		user.setPassw(passw);
		signupMapper.insertUser(user);

	}

}
