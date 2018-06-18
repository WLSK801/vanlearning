$(document).ready(function() {
	$("#analysis-box").hide();
	$("#kmeans-result").hide();

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
				// parse csv to 2d array
				var csvArray;
				try {
					csvArray = $.csv.toArrays(e.target.result);
				}
				catch (err) {
					alert("CSV DATA ERROR!");
					window.location.reload();
				}
				if(checkVaild(csvArray)) {
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
					var csvArrayData = csvArray.slice(1, csvArray.length);
					var table = $("#csvtable").DataTable({
						columns: colArray,
						data: csvArrayData
					});
					var arrLen = csvArrayData.length;

					csvArrayData = null;
					csvArray = null;
					$("#upload-box").hide();
					$("#analysis-box").show();

					$("#kmeans-submit").on("click", function(evt) {
						var cluNum = $("#clusters-num").val()
						if(cluNum != 'null' && !isNaN(parseInt(cluNum, 10)) &&
							cluNum >= 1 && cluNum <= arrLen) {
							$.ajax({
								type: "POST",
								url: "./analysis/kmeans.do",
								data: {
									clusters: cluNum,
									value: JSON.stringify($.csv.toObjects(e.target.result)),
									token: grecaptcha.getResponse()
								},
								success: function(data) {
									if (data.result == "success") {
										showResult();
									}
									else {
										alert("ERROR: training data error");
									}
									

								}

							});
						} else {
							alert("Cluster Number Error");
							$("#clusters-num").val('');
						}

					});
				} else {
					alert("Csv Format Error");
					window.location.reload();
				}

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

	if(csvArray[0].length < 1 || csvArray[0].length >= 10) {
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

function showResult() {
	$("#kmeans-training").hide();
	$("#kmeans-result").show();
	$("#clusters-num").attr("disabled", true);
	$("#kmeans-submit").attr("disabled", true);

	$.ajax({
		type: "POST",
		url: "./result/table.do",
		data: "result?",
		success: function(value) {

			var alldata = JSON.parse(value.inputTable);

			if(alldata.length > 0) {
				var heads = Object.keys(alldata[0]);
				var headObj = [];
				for(var i = 0; i < heads.length; ++i) {
					var hd = {
						"title": heads[i]
					};
					headObj.push(hd);
					hd = {};
				}
				var newdata = [];
				for(var i = 0; i < alldata.length; ++i) {
					var arr = Object.keys(alldata[i]).map(function(key) {
						return alldata[i][key];
					});
					newdata.push(arr);
				}


				$('#result-table').DataTable({
					dom: 'Bfrtip',
					buttons: [
						'copy', 'csv', 'excel', 'pdf', 'print'
					],
					data: newdata,
					columns: headObj
				});
			}

		}

	});

}