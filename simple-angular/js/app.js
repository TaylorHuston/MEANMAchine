//Name of app
angular.module('firstApp', [])

.controller('mainController', function() {
  
  //Bind this to View Model
  var vm = this;
  vm.message = "Hey There";
  vm.computers = [
    { name: 'Macbook Pro', color: 'Silver', nerdness: 7},
    { name: 'Yoga 2 Pro', color: 'Gray', nerdness: 6},
    { name: 'Chromebook', color: 'Black', nerdness: 5}
  ];
  
  vm.computerData = {};
  
  vm.addComputer = function () {
    
    //Push new computer onto array
    vm.computers.push({
      name: vm.computerData.name,
      color: vm.computerData.color,
      nerdness: vm.computerData.nerdness
    });
    
    //Clear form
    vm.computerData = {};
  };
  
  
});