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
				if(!checkVaild(csvArray)) {
					alert("Csv Format Error");
					window.location.reload();
				} 
				var csvArrayData = csvArray.slice(1, csvArray.length);
				var title = csvArray[0][0];
				var subtitle = csvArray[0][1];
				var legends = [];
				for (var i = 0; i < csvArrayData.length; i++) {
					legends.push(csvArrayData[i][0]);
				}
				var values = [];
				for (var i = 0; i < csvArrayData.length; i++) {
					var obj = {};
					obj["value"] = parseFloat(csvArrayData[i][1], 10);
					obj["name"] = csvArrayData[i][0];
					values.push(obj);
					obj = {};
				}
				csvArrayData = null;
				csvArray = null;
				$("#upload-box").hide();
				$("#analysis-box").show();

				//echart_pie_chart

				var myChart = echarts.init($("#echart_pie_chart")[0]);


				option = {
					title: {
						text: title,
						subtext: subtitle,
						x: 'center'
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						left: 'left',
						data: legends
					},
					series: [{
						name: '访问来源',
						type: 'pie',
						radius: '55%',
						center: ['50%', '60%'],
						data: values,
						itemStyle: {
							emphasis: {
								shadowBlur: 10,
								shadowOffsetX: 0,
								shadowColor: 'rgba(0, 0, 0, 0.5)'
							}
						}
					}]
				};


				myChart.setOption(option);

				$("#re-upload").on("click", function(evt) {
					window.location.reload();
				});

				// parse csv to object
				//table.rows.add($.csv.toObjects(e.target.result)).draw();
			}
			r.readAsText(f);
		} else {
			alert("Failed to load file");
		}
	});

});

function checkVaild(csvArray) {
	if(csvArray.length < 2) {
		return false;
	}
	if(csvArray[0].length != 2) {
		return false;
	}
	if (csvArray.length > 15) {
		return false;
	}
	for(var i = 1; i < csvArray.length; i++) {
		if(csvArray[i].length != 2) return false;
		if(isNaN(parseInt(csvArray[i][1], 10))) {
			return false;
		}
	}
	return true;
}