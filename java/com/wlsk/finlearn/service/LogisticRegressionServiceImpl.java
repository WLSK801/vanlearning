

package com.wlsk.finlearn.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.vanilla.data.datacolumn.Series;
import com.vanilla.data.dataframe.DataFrame;
import com.vanilla.io.reader.JsObjectReader;
import com.vanilla.io.writer.JsObjectWriter;

import com.vanilla.supervised.classification.logistic.LogisticRegression;
import com.vanilla.supervised.model.Model;

/**
 * Service interface for Kmeans Cluster Analysis
 * @author wucha
 *
 */
@Service("LogisticRegressionService")
public class LogisticRegressionServiceImpl implements LogisticRegressionService {
	
	
	public Model analysis(String input, int outputColumn) {
		Model model = new LogisticRegression();
		try {
			JsObjectReader reader = new JsObjectReader();
			DataFrame df= reader.read(input);
			
			int column = -1;
			if (outputColumn - 1 < 0 )  column = 0;
			else if (outputColumn > df.getRowNum()) column = df.getRowNum() - 1;
			else column = outputColumn - 1;
			for (Series ser : df.getRowList()) {
				double val = Double.parseDouble(ser.getValueByPosition(column));
				if (val < 1) {
					ser.setValue(column, "0");
				}
				else {
					ser.setValue(column, "1");
				}
				
			}
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
			for (int i = 0; i < pre.size(); i++) {
				double val = Double.parseDouble(pre.get(i));
				if (val < 0.5) {
					pre.set(i, "0");
				}
				else {
					pre.set(i, "1");
				}
			}
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
