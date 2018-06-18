package com.wlsk.finlearn.entity;

import java.util.Map;

/**
 * use it to parse json to a array
 * @author wucha
 *
 */
public class RowContent {
	private Map<String, String> row;

	public Map<String, String> getRow() {
		return row;
	}

	public void setRow(Map<String, String> row) {
		this.row = row;
	}
}
