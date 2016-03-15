angular.module('stuffService', [])

.factory('Stuff', function($http) {
  
  //Create empty object
  var myFactory = {};
  
  //Add a function to the factory
  myFactory.all = function() {
    return $http.hry('/api/stuff');
  };
  
  return myFactory;
})