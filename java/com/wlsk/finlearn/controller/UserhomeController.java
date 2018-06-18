package com.wlsk.finlearn.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

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
public class UserhomeController {
	
	@RequestMapping("/userhome")
	public @ResponseBody Map<String, Object> userInfroPresent(HttpServletRequest request) {
		
		
		Map<String, Object> map = new HashMap<String, Object>();
		if (request.getSession().getAttribute("loginname") != null) {
			map.put("exist", "true");
			map.put("loginname", request.getSession().getAttribute("loginname"));
		}
		else {
			map.put("exist", "false");
		}
		return map;
	}

}