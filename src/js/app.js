angular.module('bitcoincalc', ['calc', 'app']);

angular.module('calc', []).factory('apiService', function($rootScope, $http) {
	var api = {};
	api.url = "ticker.json";
	api.refresh = 900000; // 15mins

	api.refreshRates = function() {
		$http.get(api.url).success(function(rates) {
			$rootScope.$broadcast('api.rates', rates);
		});
	};

	setInterval(function() {
		api.refreshRates();
	}, api.refresh);

	api.refreshRates();

	return api;
});

angular.module('app', []).controller('uiController', function($scope, apiService) {
	$scope.rates = [];
	$scope.bitcoinAmount = 1;
	$scope.cur = null;
	$scope.curAmount = 0;

	$scope.$on('api.rates', function(e, rates) {
		for(var i=0;i<Object.keys(rates).length;i++) {
			var rate = {};
			rate.name = Object.keys(rates)[i];
			rate.last = rates[Object.keys(rates)[i]].last;
			rate.symbol = rates[Object.keys(rates)[i]].symbol;
			$scope.rates.push(rate);
		}
		if($scope.cur == null)
			$scope.cur = $scope.rates[0];
		$scope.btcAmountChanged();
	});

	$scope.convertToCurrency = function(amount) {
		$scope.bitcoinAmount = parseFloat($scope.bitcoinAmount);
		if($scope.bitcoinAmount >= 0 && typeof($scope.bitcoinAmount) == "number" && !isNaN($scope.bitcoinAmount) && $scope.bitcoinAmount != "")
			return amount * $scope.bitcoinAmount;
		return 0;
	};

	$scope.convertToBitcoin = function(amount) {
		$scope.curAmount = parseFloat($scope.curAmount);
		if($scope.curAmount >= 0 && typeof($scope.curAmount) == "number" && !isNaN($scope.curAmount) && $scope.bitcoinAmount != "")
			return amount / $scope.curAmount;
		return 0;
	};

	$scope.setCur = function(cur) {
		$scope.cur = cur.rate;
		$scope.curAmountChanged();
	};

	$scope.btcAmountChanged = function() {
		$scope.curAmount = $scope.convertToCurrency($scope.cur.last);
	};

	$scope.curAmountChanged = function() {
		$scope.bitcoinAmount = $scope.convertToBitcoin($scope.cur.last);
	};

});