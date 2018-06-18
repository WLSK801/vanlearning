$(document).ready(function() {
	$.ajax({
		type: "POST",
		url: "../../result/table.do",
		data: "result?",
		success: function(value) {
			if(data.result == "success") {
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

					alert(JSON.stringify(headObj));
					alert(newdata);
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
			else {
				alert("Data did not trained");
				window.location.href = "./kmeans.html";

			}

		}

	});

});