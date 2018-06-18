package com.wlsk.finlearn.controller;

import java.util.HashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.wlsk.finlearn.entity.LinearRegressionInput;
import com.vanilla.supervised.model.Model;
import com.wlsk.finlearn.service.DecisionTreeService;
import com.wlsk.finlearn.service.LinearRegressionService;
import com.wlsk.finlearn.service.LogisticRegressionService;
import com.wlsk.finlearn.util.RCVerifyUtil;


@Controller

@RequestMapping("/analysis")
@Scope("prototype")
public class DecisionTreeController {
	
	@Autowired DecisionTreeService decisionTreeService;
	
	@RequestMapping("/decisiontree")
	public @ResponseBody Map<String, Object> fileUploadHandler(HttpServletRequest request, LinearRegressionInput input) {
		Map<String, Object> map = new HashMap<String, Object>();
		boolean verify = RCVerifyUtil.verify((String)request.getParameter("token"));
		if (!verify) {
			map.put("result", "fail");
			return map;
		}
		Model res = decisionTreeService.analysis(input.getValue(), input.getColumn());
		
		
		
		if (!res.isTrain()) {
			map.put("result", "fail");
		}
		else {
			request.getSession().setAttribute("model", res);
			map.put("result", "success");
		}

		return map;
	}
	@RequestMapping("/check/decisiontree")
	public @ResponseBody Map<String, Object> isTrainedHandler(HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		if (request.getSession().getAttribute("model") == null) {
			map.put("isTrained", "false");
		}
		else {
			map.put("isTrained", "true");
		}

		
		return map;
	}
	@RequestMapping("/destory/decisiontree")
	public @ResponseBody Map<String, Object> destoryHandler(HttpServletRequest request) {
		Map<String, Object> map = new HashMap<String, Object>();
		request.getSession().setAttribute("model", null);

		map.put("result", "success");
		return map;
	}
	@RequestMapping("/predict/decisiontree")
	public @ResponseBody Map<String, Object> predictHandler(HttpServletRequest request, LinearRegressionInput input) {
		
		Map<String, Object> map = new HashMap<String, Object>();
		Model model = (Model) request.getSession().getAttribute("model");
		String res = decisionTreeService.predict(input.getValue(), model);
		if (res.length() == 0) {
			map.put("result", "fail");
		}
		else {
			map.put("predictResult", res);
			map.put("result", "success");
		}
		request.getSession().setAttribute("model", null);
		
		return map;
	}
}