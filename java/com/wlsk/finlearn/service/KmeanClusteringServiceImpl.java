

package com.wlsk.finlearn.service;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.vanilla.data.dataframe.DataFrame;
import com.vanilla.io.reader.JsObjectReader;
import com.vanilla.io.writer.JsObjectWriter;
import com.vanilla.unsupervised.kmeans.Kmeans;
/**
 * Service interface for Kmeans Cluster Analysis
 * @author wucha
 *
 */
@Service("KmeanClusteringService")
public class KmeanClusteringServiceImpl implements KmeanClusteringService {
	
	
	public String analysis(String input, int cluster) {
		String res;
		try {
			JsObjectReader reader = new JsObjectReader();
			DataFrame df = reader.read(input);
			
			Kmeans kmeans = new Kmeans();
			List<Integer> clusters = kmeans.process(df, cluster);
			List<String> stringClusters = new ArrayList<String>(clusters.size());
			for (Integer c : clusters) { 
				stringClusters.add(String.valueOf(c + 1)); 
			}
			df.writeColumn("Clusters", stringClusters);
			JsObjectWriter writer = new JsObjectWriter();
			res = writer.write(df);
		} 
		catch (Exception e) {
			res = "";
		}
		
		return res;
		
	}
}
