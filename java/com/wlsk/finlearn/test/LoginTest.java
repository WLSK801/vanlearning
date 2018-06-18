package com.wlsk.finlearn.test;

import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.wlsk.finlearn.dao.LoginDao;
import com.wlsk.finlearn.dao.SignupDao;
import com.wlsk.finlearn.entity.UserAccount;


public class LoginTest {
	@Test
	public void findUserByIdTest() {
		ApplicationContext ac = new ClassPathXmlApplicationContext("ApplicationContext.xml");
		LoginDao mapper = (LoginDao) ac.getBean("loginDao");
        System.out.println("ªÒ»°alvin");
        UserAccount user = mapper.selectByName("avalon");
        System.out.println(user.getPassw());
	}
	@Test
	public void insertUserAccTest() {
		ApplicationContext ac = new ClassPathXmlApplicationContext("ApplicationContext.xml");
		SignupDao mapper = (SignupDao) ac.getBean("signupDao");
        UserAccount cw = new UserAccount();
        cw.setLoginname("wcc@qq.com");
        cw.setPassw("123");
        
        mapper.insertUser(cw);


        LoginDao mapper2 = (LoginDao) ac.getBean("loginDao");
        
        UserAccount user = mapper2.selectByName("wcc@qq.com");
        System.out.println(user.getLoginname());
	}
}
