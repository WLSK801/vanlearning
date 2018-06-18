$(document).ready(function() {
	notraining_1();
	$.ajax({
		type: "POST",
		url: "./analysis/check/logisticregression.do",
		success: function(data) {
			if(data.isTrained == "true") {
				$("#re-upload2").on("click", function(evt) {
					reupload();
				});
				$("#re-upload3").on("click", function(evt) {
					reupload();
				});
				startpredict_4();
				$("#fileinput2").on("change", function(evt) {

					//var f = evt.target.files[0];

					var ext = $('#fileinput2').val().split('.').pop().toLowerCase();
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
								var arrLen = csvArrayData[0].length;

								csvArrayData = null;
								csvArray = null;
								uploadpredict_5();

								$("#kmeans-submit2").on("click", function(evt) {
									NProgress.start();
									$.ajax({
										type: "POST",
										url: "./analysis/check/logisticregression.do",
										success: function(data) {
											if(data.isTrained == "true") {
												$.ajax({
													type: "POST",
													url: "./analysis//predict/logisticregression.do",
													data: {
														column: 1,
														value: JSON.stringify($.csv.toObjects(e.target.result))
													},
													success: function(data) {
														NProgress.done();

														if(data.result == "success") {
															finishpredict_6();

															var alldata = JSON.parse(data.predictResult);

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
																$('#csvtable2').DataTable({
																	dom: 'Bfrtip',
																	buttons: [
																		'copy', 'csv', 'excel', 'pdf', 'print'
																	],
																	data: newdata,
																	columns: headObj
																});
															}
														} else {
															alert("ERROR: PREIDCT DATA ERROR");
															reupload();
														}

													}

												});

											} else {
												alert("No Model Exist");
												window.location.reload();
											}
										}
									});

								});

							} else {
								alert("Csv Format Error");
								window.location.reload();
							}

							// parse csv to object
							//table.rows.add($.csv.toObjects(e.target.result)).draw();
						}
						r.readAsText(f);
					} else {
						alert("Failed to load file");
					}

				});

			} else {
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
								var arrLen = csvArrayData[0].length;

								csvArrayData = null;
								csvArray = null;
								uploadtraining_2();

								$("#kmeans-submit").on("click", function(evt) {
									NProgress.start();
									var cluNum = $("#output-column").val()
									if(cluNum != 'null' && !isNaN(parseInt(cluNum, 10)) &&
										cluNum >= 1 && cluNum <= arrLen) {
										$.ajax({
											type: "POST",
											url: "./analysis/logisticregression.do",
											data: {
												column: cluNum,
												value: JSON.stringify($.csv.toObjects(e.target.result)),
												token: grecaptcha.getResponse()
											},
											success: function(data) {
												NProgress.done();
												if (data.result == "success") {
													finishtraining_3();
												}
												else {
													alert("ERROR: Training ERROR");
													window.location.reload();
												}
												
												
											}

										});
									} else {
										alert("Output Column Select Error");
										$("#output-column").val('');
										NProgress.done();
									}

								});
							} else {
								alert("Csv Format Error");
								window.location.reload();
							}

							$("#re-upload").on("click", function(evt) {
								reupload();
							});

							// parse csv to object
							//table.rows.add($.csv.toObjects(e.target.result)).draw();
						}
						r.readAsText(f);
					} else {
						alert("Failed to load file");
					}

				});

			}
		}

	});

});

function checkVaild(csvArray) {
	if(csvArray.length < 2) {

		return false;
	}

	if(csvArray[0].length < 1 || csvArray[0].length >= 6) {

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

function predict() {

}

function notraining_1() {
	$("#analysis-box").hide();
	$("#result_table").hide();
	$("#upload-box2").hide();
	$("#upload-box3").hide();
	$("#kmeans-submit2").hide();

}

function uploadtraining_2() {
	$("#upload-box").hide();
	$("#analysis-box").show();

}

function finishtraining_3() {
	alert("Model Training Success!");
	window.location.reload();

}

function startpredict_4() {
	$("#analysis-box").hide();
	$("#upload-box").hide();
	$("#upload-box2").show();

}

function uploadpredict_5() {
	$("#fileinput2").hide();
	$("#kmeans-submit2").show();
	$("#re-upload2").show();
}

function finishpredict_6() {
	$("#upload-box2").hide();
	$("#upload-box3").show();
	$("#result_table").show();
	$("#original_table").hide();

}

function reupload() {

	$.ajax({
		type: "POST",
		url: "./analysis/destory/logisticregression.do",
		success: function(data) {
			// TODO
		}

	});
	window.location.reload();

}