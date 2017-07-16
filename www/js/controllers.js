angular.module('starter.controllers', [])

.controller('HomeController', function($scope) {})

.controller('DetailController', function($scope, $ionicNavBarDelegate) {
  // set the title
  $scope.title = 'Detail';
  // show back button
  $ionicNavBarDelegate.showBackButton(true);
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

.controller('SearchController', function($scope ) {})

.controller('SearchFilterController', function($scope, $state, $ionicHistory) {
  // apply filter
  $scope.applyFilter = function() {
    // put your code hear
    // don't show back button in next view
    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    // comeback to search screen
    $state.go('tab.search');
  }
})

.controller('AccountController', function($scope ) {})
.controller('AuthController', function($scope ) {});
