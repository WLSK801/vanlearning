$(document).ready(function() {

	function MyController($scope, $http) {
		$http({
			method: 'POST',
			url: '../../kmeans-result/table.do'
		}).then(function successCallback(response) {
			alert(response.data);
		}, function errorCallback(response) {
			alert("error");
		});
	}

});