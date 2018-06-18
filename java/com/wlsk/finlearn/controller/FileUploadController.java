package com.wlsk.finlearn.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.multipart.MultipartFile;

import com.wlsk.finlearn.entity.UserAccount;
import com.wlsk.finlearn.service.LoginService;


@Controller

@RequestMapping("/file")

@Scope("prototype")
public class FileUploadController {

	@RequestMapping("/upload")
	public @ResponseBody Map<String, Object> fileUploadHandler( @RequestParam("file") MultipartFile file) {
		Map<String, Object> map = new HashMap<String, Object>();
		if (!file.isEmpty()) {
			try {
				byte[] bytes = file.getBytes();
				String completeData = new String(bytes);
				String[] rows = completeData.split("#");
				//String[] columns = rows[3].split(",");
				for (String r : rows) {
					String[] columns = r.split(",");
					for (String c : columns) {
						System.out.println(c);
					}
				}
				//System.out.println(columns[1]);
			} catch (Exception e) {
				
			}
		}
		return map;
	}

}