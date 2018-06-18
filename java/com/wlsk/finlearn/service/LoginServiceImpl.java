package com.wlsk.finlearn.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.wlsk.finlearn.dao.LoginDao;
import com.wlsk.finlearn.entity.UserAccount;

@Service("LoginService")
public class LoginServiceImpl implements LoginService {
	
	
	@Autowired LoginDao Mapper;

	
	public boolean login(String loginname, String passw) {

		UserAccount user = Mapper.selectByName(loginname);
		if (user != null) {

			if (user.getLoginname().equals(loginname)
					&& user.getPassw().equals(passw))
				return true;

		}
		return false;

	}

}
