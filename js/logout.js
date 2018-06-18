$(document).ready(function() {
	$("#log-out").on("click", function(evt) {
		$.ajax({
			type: "POST",
			url: "./user/logout.do",
			data: "result?"

		});

	});

});