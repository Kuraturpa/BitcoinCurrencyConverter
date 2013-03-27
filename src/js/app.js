angular.module('bitcoincalc', ['calc', 'app']);

angular.module('calc', []).factory('apiService', function($http) {
	var api = {};
	//api.url = "http://blockchain.info/ticker?format=json&callback=JSON_CALLBACK";
	//api.url = "http://bitcoincharts.com/t/markets.json";
	api.url = "ticker.json";
	api.getRates = function(callback, error) {
		console.log('get rates');
		$http.get(api.url).success(callback).error(error);
		//callback();
	};

	return api;
});

angular.module('app', []).controller('uiController', function($scope, apiService) {
	$scope.rates = {};
	$scope.currencies = [];
	$scope.bitcoinAmount = 0;
	$scope.init = function(param) {
		console.log('app init');
		$scope.refreshRates();
	};

	$scope.refreshRates = function() {
		console.log('refresh rates');
		apiService.getRates(function(rates) {
			console.log('rates recieved');
			console.log(rates);
			$scope.rates = rates;
			$scope.currencies = Object.keys(rates);
		},
		function(data){
			console.log("error");
			console.log(data);
		});
	};

});