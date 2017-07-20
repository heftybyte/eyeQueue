angular.module('starter.controllers', [])

.controller('HomeController', function($scope, $http, apiUrl) {

  $http.get(apiUrl + '/restaurants')
    .then(function(response){
      $scope.restaurants = response.data
    })
})

.controller('DetailController', function($scope, $ionicNavBarDelegate, $http, user, socket, $stateParams, apiUrl) {
  // set the title
  $scope.title = 'Detail';
  // show back button
  $ionicNavBarDelegate.showBackButton(true);

  $scope.order = function(meal) {
    var userData = user.getUser()
    $http.post(apiUrl + '/order', {
      meal: meal._id,
      user: userData._id,
      paymentMethodId: userData.paymentMethods[0].card_id
    }).then(function(response){
      var orderNumber = response.data.orderNumber
      alert("Order Sent ("+orderNumber+")! You will be notified when its complete")
      $scope.orderNumber = orderNumber
    })
  }

  $scope.meal = $stateParams.meal
})

.controller('Restaurant', function($scope, socket){
  $scope.orders = []

  socket.removeListener('orderReady')
  socket.on('newOrder', function(order){
    $scope.orders.unshift(order)
    alert("New ORDER! " + order.orderNumber)
  })

  $scope.orderReady = function(order) {
    var index = $scope.orders.indexOf(order);
    $scope.orders.splice(index, 1)
    socket.emit('orderReady', order)
    console.log('order ready', order)
  }
})

.controller('Location', function($scope, $ionicLoading, $compile) {
  function initialize() {
    // set up begining position
    var myLatlng = new google.maps.LatLng(21.0227358,105.8194541);

    // set option for map
    var mapOptions = {
      center: myLatlng,
      zoom: 16,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    // init map
    var map = new google.maps.Map(document.getElementById("map"),
      mapOptions);

    // assign to stop
    $scope.map = map;
  }
  // load map when the ui is loaded
  $scope.init = function() {
    initialize();
  }
  //google.maps.event.addDomListener(window, 'load', initialize);
})

.controller('SearchController', function($scope, $http, apiUrl) {
  $http.get(apiUrl + '/meals')
      .then(function(response){
        $scope.meals = response.data
      })
})

.controller('SearchFilterController', function($scope, $state, $ionicHistory) {
    // apply filter
  $scope.applyFilter = function() {
    // don't show back button in next view
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    // comeback to search screen
    $state.go('tab.meals');
  }
})

.controller('AccountController', function($scope ) {})
.controller('AuthController', function($scope ) {});
