package com.wlsk.finlearn.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.wlsk.finlearn.entity.UserAccount;
import com.wlsk.finlearn.service.LoginService;
import com.wlsk.finlearn.util.RCVerifyUtil;


@Controller

@RequestMapping("/user")

@Scope("prototype")

public class LoginController {

	@Autowired LoginService userService;

	@RequestMapping("/login")
	public @ResponseBody Map<String, Object> login(UserAccount user, HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		request.getSession().setMaxInactiveInterval(60 * 10);
		boolean verify = RCVerifyUtil.verify((String)request.getParameter("token"));
		if (!verify) {
			map.put("code", "2");
			return map;
		}

		boolean loginType = userService.login(user.getLoginname(),
				user.getPassw());
		
		if (loginType) {

			
			map.put("code", "0");

			request.getSession().setAttribute("loginname", user.getLoginname()); 
		} else {

			map.put("code", "1");
		}
		//System.out.println(loginType);
		return map;
	}
	
	@RequestMapping("/logout")
	public @ResponseBody Map<String, Object> logout(HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		request.getSession().invalidate();
		return map;
	}

}