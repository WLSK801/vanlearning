$(document).ready(function() {
	$("#analysis-box").hide();

	$("#fileinput").on("change", function(evt) {

		//var f = evt.target.files[0];

		var ext = $('#fileinput').val().split('.').pop().toLowerCase();
		if($.inArray(ext, ['csv']) == -1) {
			$('#fileinput').val('');
		}

		var f = evt.target.files[0];
		// file size in kb
		var fsize = f.size / 1024;
		if (fsize > 1024) {
			alert(" File Size extra limit!, Please upload again!");
			window.location.reload();
		}
		if(f) {
			var r = new FileReader();
			r.onload = function(e) {
				//$("#fileinput").hide();
				// parse csv to 2d array
				var csvArray;
				try {
					csvArray = $.csv.toArrays(e.target.result);
				}
				catch (err) {
					alert("CSV DATA ERROR!");
					window.location.reload();
				}
				var rows = csvArray.length;
				var columns = csvArray[0].length;
				var colArray = [];
				for(var i = 0; i < columns; i++) {
					var element = {
						"title": csvArray[0][i]
					};
					colArray.push(element);
					element = {};
				}
				if(checkVaild(csvArray)) {
					var csvArrayData = csvArray.slice(1, csvArray.length);
					var title = csvArray[0][0];
					var legends = [];
					for(var i = 0; i < csvArrayData.length; i++) {
						legends.push(csvArrayData[i][0]);
					}
					var line_names = [];
					for(var i = 1; i < csvArray[0].length; i++) {
						line_names.push(csvArray[0][i]);
					}
					var values = [];
					for(var i = 1; i < csvArrayData[0].length; i++) {
						var obj = {};
						var dataArray = [];
						for (var j = 0; j < csvArrayData.length; j++) {
							dataArray.push(parseFloat(csvArrayData[j][i], 10));
						}
						obj["data"] = dataArray;
						obj["name"] = csvArray[0][i];
						obj["type"] = "line";
						obj["stack"] = "total";
						values.push(obj);
						obj = {};
					}

					csvArrayData = null;
					csvArray = null;
					$("#upload-box").hide();
					$("#analysis-box").show();

					//echart_pie_chart

					var myChart = echarts.init($("#echart_line_chart")[0]);


					option = {
						title: {
							text: title
						},
						tooltip: {
							trigger: 'axis'
						},
						legend: {
							data: line_names
						},
						grid: {
							left: '3%',
							right: '4%',
							bottom: '3%',
							containLabel: true
						},
						toolbox: {
							feature: {
								saveAsImage: {}
							}
						},
						xAxis: {
							type: 'category',
							boundaryGap: false,
							data: legends
						},
						yAxis: {
							type: 'value'
						},
						series: values
					};


					myChart.setOption(option);

					$("#re-upload").on("click", function(evt) {
						window.location.reload();
					});

					// parse csv to object
					//table.rows.add($.csv.toObjects(e.target.result)).draw();
				} else {
					alert("Csv Format Error");
					window.location.reload();
				}
				
			}
			r.readAsText(f);
		} else {
			alert("Failed to load file");
		}
	});

});

function checkVaild(csvArray) {
	if(csvArray.length < 2 || csvArray.length > 30) {
		return false;
	}
	if(csvArray[0].length < 2 || csvArray[0].length > 7) {
		return false;
	}
	for(var i = 1; i < csvArray.length; i++) {
		if(csvArray[i].length != csvArray[0].length) return false;
		for(var j = 0; j < csvArray[0].length; j++) {
			if(isNaN(parseInt(csvArray[i][j], 10))) {
				return false;
			}
		}

	}
	return true;
}