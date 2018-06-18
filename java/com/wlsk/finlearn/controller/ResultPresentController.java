package com.wlsk.finlearn.controller;


import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;





@Controller
@RequestMapping("/result")
@Scope("prototype")
public class ResultPresentController {

	@RequestMapping("/table")
	public @ResponseBody Map<String, String> tableReturnHandler(HttpServletRequest request) {
		Map<String, String>  resultMap = new HashMap<String, String>();
		if (request.getSession().getAttribute("inputTable") == null) {
			resultMap.put("result", "success");
		}
		else {
			resultMap.put("inputTable", (String) request.getSession().getAttribute("inputTable"));	
			resultMap.put("result", "fail");
		}
			
		return resultMap;
		
	}
	

}