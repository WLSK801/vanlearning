

package com.wlsk.finlearn.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.vanilla.data.dataframe.DataFrame;
import com.vanilla.io.reader.JsObjectReader;
import com.vanilla.io.writer.JsObjectWriter;

import com.vanilla.supervised.classification.decisiontree.DecisionTree;
import com.vanilla.supervised.model.Model;
import com.vanilla.supervised.regression.linear.LinearRegression;

/**
 * Service interface for Kmeans Cluster Analysis
 * @author wucha
 *
 */
@Service("DecisionTreeService")
public class DecisionTreeServiceImpl implements DecisionTreeService {
	
	
	public Model analysis(String input, int outputColumn) {
		DecisionTree tree = new DecisionTree();
		tree.setMaxDepth(10);
		tree.setMinSize(3);
		Model model = tree;
		try {
			JsObjectReader reader = new JsObjectReader();
			DataFrame df= reader.read(input);
			
			int column = -1;
			if (outputColumn - 1 < 0 )  column = 0;
			else if (outputColumn > df.getRowNum()) column = df.getRowNum() - 1;
			else column = outputColumn - 1;
			model.train(df, column);
		}
		catch (Exception e) {
			
		}
		

		return model;
		
	}

	public String predict(String input, Model model) {
		String res;
		try {
			JsObjectReader reader = new JsObjectReader();
			DataFrame df= reader.read(input);
			List<String> pre = model.predict(df);
			df.writeColumn("PREDICT_RESULT", pre);
			JsObjectWriter writer = new JsObjectWriter();
			res = writer.write(df);
		}
		catch (Exception e) {
			res = "";
		}
		
		return res;
	}
}
