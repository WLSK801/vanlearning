

package com.wlsk.finlearn.service;

import com.vanilla.supervised.model.Model;

/**
 * Service interface for Kmeans Cluster Analysis
 * @author wucha
 *
 */
public interface LinearRegressionService {
	public Model analysis(String input, int outputColumn);
	
	public String predict(String input, Model model);
}
