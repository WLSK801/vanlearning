package com.wlsk.finlearn.service;
/**
 * Service interface for signup
 * @author wucha
 *
 */
public interface SignupService {
	public boolean accountCheck(String loginname);
	public void signup(String loginname, String passw);
}
