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
import com.wlsk.finlearn.service.SignupService;


@Controller

@RequestMapping("/user")
@Scope("prototype")
public class SignupController {

	@Autowired SignupService signupService;
	@RequestMapping("/signup")
	public @ResponseBody Map<String, Object> signUp(UserAccount user, HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();

		boolean checkAccount = signupService.accountCheck(user.getLoginname());
		if (!checkAccount) {
			signupService.signup(user.getLoginname(), user.getPassw());
			map.put("check", "success");
		}
		else {
			map.put("check", "fail");
		}
		return map;
	}

}