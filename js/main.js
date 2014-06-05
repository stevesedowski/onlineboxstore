var boxApp = angular.module('boxApp', []);
boxApp.controller('boxCtrl', function($scope, $http){
   $scope.shippingCost = 9.99;
   $scope.shoppingCart = [];
   $scope.boxes = [];
   $scope.totalCost = 0;
   var cartObj = {};
  
   $http.get('http://tsljs.herokuapp.com/boxes.json').success(function(results) {
       $scope.boxes = results;
   }); 
  
   $scope.addToCart = function(e, box){
    if ($scope.shoppingCart.length > 0) {
      len = $scope.shoppingCart.length;
      for (var i = 0;  i < len ; i++) {
        if($scope.shoppingCart[i].id === box.id) {
          //console.log('addToCart:'+ box.id + ' shoppingCartID: '+$scope.shoppingCart[i].id + 'quantity: '+$scope.shoppingCart[i].quantity);
          //console.log('index: ' + i);
          $scope.shoppingCart[i].quantity += 1;
          
          $scope.totalCost += box.price; 
          checkTotal();
          
          /*The problem is: for any ID that is greater than 1, the 'if' statement
          evaluates to FALSE and then the 'else' statement is executed. How to solve this?
          How to loop through ALL of the shoppingcart array before executing the 'else'
          statement?*/
          return;
        } 
      }
      addNewItem(box); 
     } else {
          addNewItem(box);
     }
   };
  
  function addNewItem(box) {
      
      /*Wow!!! Big Ah ha! MOment here!! I had previously had this statemenet:
      $scope.shoppingCart.push(cartObj); to add new objects to the cart. And it didn't 
      work too well. What happened was that whatever items I added became ALL of the items in 
      the array. For example, if I had clicked on the first product button, then the second
      button, both items would now be the second item. the first item was REPLACED by the second item. 
      Crazy huh? Don't know why but it happened. So I replace the statement by explicity adding the object's properties
      to the array via this line: $scope.shoppingCart.push({id: box.id, price: parseFloat(box.price), title: box.title, quantity: 1});
      */
      $scope.shoppingCart.push({id: parseFloat(box.id), price: parseFloat(box.price), title: box.title, quantity: 1});
      
      $scope.totalCost = $scope.totalCost + box.price; 
      checkTotal();
      return;
  };

  $scope.deleteItem = function(index, price){
    //console.log('quantity before--> ' + $scope.shoppingCart[index].quantity );

    $scope.shoppingCart[index].quantity -= 1;
    //console.log('quantity after--> ' + $scope.shoppingCart[index].quantity );
    if($scope.shoppingCart[index].quantity == 0) {  
      $scope.shoppingCart.splice(index, 1);
    }
    
    $scope.totalCost = $scope.totalCost - price; 
    checkTotal();
  };

  function checkTotal(){
    if ($scope.totalCost > 20 ){
      $scope.shippingCost = 0;
    } else {
      $scope.shippingCost = 9.99;
    }
  };
});