angular.module('bitcoincalc', ['calc', 'app']);

angular.module('calc', []).factory('apiService', function($http) {
	var api = {};
	//api.url = "http://blockchain.info/ticker?format=json&callback=JSON_CALLBACK";
	//api.url = "http://bitcoincharts.com/t/markets.json";
	api.url = "ticker.json";
	api.getRates = function(callback, error) {
		console.log('get rates');
		$http.get(api.url).success(callback).error(error);
	};

	return api;
});

angular.module('app', []).controller('uiController', function($scope, apiService) {
	$scope.rates = [];
	$scope.bitcoinAmount = 1;
	$scope.cur = null;
	$scope.curAmount = 0;
	$scope.init = function(param) {
		console.log('app init');
		$scope.refreshRates();
	};

	$scope.refreshRates = function() {
		console.log('refresh rates');
		apiService.getRates(function(rates) {
			for(var i=0;i<Object.keys(rates).length;i++) {
				var rate = {};
				rate.name = Object.keys(rates)[i];
				rate.last = rates[Object.keys(rates)[i]].last;
				rate.symbol = rates[Object.keys(rates)[i]].symbol;
				$scope.rates.push(rate);
			}
			if($scope.cur == null)
				$scope.cur = $scope.rates[0];
		},
		function(data){
			console.log("error");
			console.log(data);
		});
	};

	$scope.convertToCurrency = function(amount) {
		$scope.bitcoinAmount = parseFloat($scope.bitcoinAmount);
		if($scope.bitcoinAmount >= 0 && typeof($scope.bitcoinAmount) == "number" && !isNaN($scope.bitcoinAmount) && $scope.bitcoinAmount != "")
			return amount * $scope.bitcoinAmount;
		return 0;

	};

	$scope.convertToBitcoin = function(amount) {

	};

	$scope.setCur = function(cur) {
		$scope.cur = cur.rate;
	};

	$scope.btcAmountChanged = function() {
		$scope.curAmount = $scope.convertToCurrency($scope.cur.last);
	};

	$scope.curAmountChanged = function() {
		$scope.bitcoinAmount = $scope.curAmount / $scope.cur.last;
	};

});