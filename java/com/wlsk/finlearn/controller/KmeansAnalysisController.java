package com.wlsk.finlearn.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.wlsk.finlearn.entity.ClusterInput;

import com.wlsk.finlearn.service.KmeanClusteringService;
import com.wlsk.finlearn.util.RCVerifyUtil;


@Controller

@RequestMapping("/analysis")

@Scope("prototype")
public class KmeansAnalysisController {

	@Autowired KmeanClusteringService kmeansService;

	@RequestMapping("/kmeans")
	public @ResponseBody Map<String, Object> fileUploadHandler(HttpServletRequest request, ClusterInput input) {
		Map<String, Object> map = new HashMap<String, Object>();
		boolean verify = RCVerifyUtil.verify((String)request.getParameter("token"));
		if (!verify) {
			map.put("result", "fail");
			return map;
		}
		String res = kmeansService.analysis(input.getValue(), input.getClusters());
		if (res.length() == 0) {
			map.put("result", "fail");
		}
		else {
			request.getSession().setAttribute("inputTable", res);
			map.put("result", "success");
		}
		

		
		return map;
	}
}