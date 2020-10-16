
var myApp = angular.module("myApp", []);

myApp.directive('validare', function() {
  var regExp = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/;
  return {
    link: function(scope, elm) {
      elm.on("keyup",function(){
        var exista = regExp.test(elm.val());
        if(exista && elm.hasClass('eroare') || elm.val() == ''){
          elm.removeClass('eroare');
        } else if(exista == false && !elm.hasClass('eroare')){
          elm.addClass('eroare');
        }
      });
    }
  }
});

//   myApp.directive("AnaBatirFooter", function() {
//     return {
//         template : '<div class=\"footer\">' +
// 		'<br><p class=\"footer_text\">This is footer</p>' +
// 	    '</div>'
//     };
// });

// Register Service
myApp.service("RegisterService" , function(){
 
	// Save User
	this.save = function(user)  
	{
    var currentUsers =  this.list();
    if (!currentUsers) {
      currentUsers = new Array()
    }
    currentUsers.push(user);
    window.localStorage.setItem('usersAnaBatir', JSON.stringify(currentUsers));

  };
  
	// List Users
	this.list = function()
	{
    var reg = localStorage.getItem("usersAnaBatir");  
    if (!reg) {
      return  null
    } else {
      return JSON.parse(reg);
    }
  };
  
  this.search = function(x) {
    var users = this.list()
    for(var i in users )
    {
      if(users[i].email == x.email && users[i].password == x.password)
      {
        return users[i];
      }
    }
    return null
  };

  this.getCurrentUser = function() {
    return window.localStorage.getItem('CurrentUserAna');
  };

  this.setCurrentUser = function (x) {
    if (!x) {
      window.localStorage.removeItem('CurrentUserAna');
    } else {
      window.localStorage.setItem('CurrentUserAna', x);
    }
  };
  
});

myApp.service('routing', function() {
  this.loadPage =  function (x){
    window.location.href = x;
  }
});

// Register Controller 
myApp.controller("RegisterController" , function($scope , RegisterService){
  console.clear();
  $scope.users = RegisterService.list();
  console.log($scope.users)
  $scope.mesajEroare = "Email is required."
  $scope.disableRegister = true;

  $scope.verificaDisponibilitate = function() {
    $scope.disableRegister =   !$scope.newUser.nume || !$scope.newUser.email ||  !$scope.newUser.login || !$scope.newUser.password
    console.log($scope.newUser)
  }

  $scope.confirma = function()
  {
   console.log($scope.newUser);
   if($scope.newUser == null || $scope.newUser == angular.undefined)
     return;
   RegisterService.save($scope.newUser);
   $scope.users = RegisterService.list();
   console.log($scope.users + "")
   window.location.href = "login.html"
 };		
 $scope.anuleaza = function () {
   $scope.newUser.nume = ""
   $scope.newUser.email = ""
   $scope.newUser.login = ""
   $scope.newUser.parola = ""
 }
});

// Login Controller 
myApp.controller("LoginController" , function($scope , RegisterService, routing){
  $scope.users = RegisterService.list();
  $scope.currentUser = RegisterService.getCurrentUser();
  $scope.updateData = function() {
    $scope.users = RegisterService.list();
    $scope.currentUser = RegisterService.getCurrentUser();
  }

  $scope.loginFunc = function() {
    console.log($scope.loginUser)
    var searchedUser = RegisterService.search($scope.loginUser)

    if (!searchedUser) {
      console.log("nu a fost gasit nimic")
    } else {
      RegisterService.setCurrentUser($scope.loginUser.email)
      console.log("am gasit utilizatorul")
      routing.loadPage("index.html")
    }
  }
  console.log($scope.currentUser)
  console.log($scope.users)

  
});


myApp.service('calculator', function() {
  this.getSuma = function(x) {
    var suma = 0 
    x.forEach((item, index)=> {
      suma += item.pret    
    });
    return suma
  }
});

myApp.controller("IndexController" , function($scope , RegisterService, routing, calculator){
  $scope.users = RegisterService.list();
  $scope.currentUser = RegisterService.getCurrentUser();
  $scope.verifica = "Nu este ng-non-bindable"
  $scope.telefoane = [
  {nume: "Apple Iphone 11", imagine: "https://enter.online/images/detailed/84/apple_iphone_11_black1a_gtho-s8.png", pret:15999},
  {nume: "OnePlus Nord", imagine: "https://enter.online/images/detailed/100/one_plus_nord_gray_1_6m7d-ru.png", pret:9799},        
  {nume: "Apple Iphone 11 Pro Max", imagine: "https://enter.online/images/detailed/84/apple_iphone_11_pro_max1a_9l7r-nn.png", pret:20999},
  {nume: "Apple Iphone XR", imagine: "https://enter.online/images/detailed/84/apple_iphone_xr_red2_djnu-sf.png", pret:12999},
  {nume: "Xiaomi Redmi Note 8 Pro", imagine: "https://enter.online/images/detailed/85/redmi_note_8pro_green_1.png", pret:3879},
  {nume: "Xiaomi Redmi 8A", imagine: "https://enter.online/images/detailed/85/redmi_8a_blue_1.png", pret:1999},
  {nume: "Samsung Galaxy A70 A705", imagine: "https://enter.online/images/detailed/76/samsung_galaxy_a705_blue0.png", pret:6299},
  {nume: "Xiaomi Redmi 8A", imagine: "https://enter.online/images/detailed/85/redmi_8a_red_1.png", pret:1999}, 
  {nume: "Samsung Galaxy A70 A705", imagine: "https://enter.online/images/detailed/76/samsung_galaxy_a705_black0.png", pret:6229},
  {nume: "Huawei P30 Pro", imagine: "https://enter.online/images/detailed/74/huawei_p30_pro_blue_light7_l9kh-q3.png", pret:12299}, 
  {nume: "Huawei P30 Lite", imagine: "https://enter.online/images/detailed/74/huawei_p30_lite_peacock_blue7.png", pret:1229},
  {nume: "OnePlus 8", imagine: "https://enter.online/images/detailed/94/one_plus_8_green_1.png", pret:12999},
  {nume: "Apple Iphone 11", imagine: "https://enter.online/images/detailed/84/apple_iphone_11_green1a_nmx4-w8.png", pret:15999}, 
  {nume: "OnePlus Nord", imagine: "https://enter.online/images/detailed/100/one_plus_nord_blue_1.png", pret:10999},
  {nume: "Xiaomi Redmi Note 9", imagine: "https://enter.online/images/detailed/95/xiaomi_redmi_note_9_green_1.png", pret:3299}, 
  {nume: "Cubot Quest Lite", imagine: "https://enter.online/images/detailed/80/cubot_quest_lite_black_red1.png", pret:2299}, 
  ]
  $scope.telefoaneCart = new Array();
  $scope.addToCart = function(x) {
    $scope.telefoaneCart.push(x);
    console.log($scope.telefoaneCart)
  }

  $scope.removeFromCart = function(x) {
    $scope.telefoaneCart.splice(x, 1);
  }

  $scope.getSumaFromCart = function() {
    return calculator.getSuma($scope.telefoaneCart)
  }

  
});

myApp.directive('modal', function () {
  return {
    template: '<div class="modal fade">' + 
    '<div class="modal-dialog">' + 
    '<div class="modal-content">' + 
    '<div class="modal-header">' + 
    '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
    '<h4 class="modal-title">{{ title }}</h4>' + 
    '</div>' + 
    '<div class="modal-body" ng-transclude></div>' + 
    '</div>' + 
    '</div>' + 
    '</div>',
    restrict: 'E',
    transclude: true,
    replace:true,
    scope:true,
    link: function postLink(scope, element, attrs) {
      scope.title = attrs.title;

      scope.$watch(attrs.visible, function(value){
        if(value == true)
          $(element).modal('show');
        else
          $(element).modal('hide');
      });

      $(element).on('shown.bs.modal', function(){
        scope.$apply(function(){
          scope.$parent[attrs.visible] = true;
        });
      });

      $(element).on('hidden.bs.modal', function(){
        scope.$apply(function(){
          scope.$parent[attrs.visible] = false;
        });
      });
    }
  };
});


myApp.controller("HeaderController" , function($scope , RegisterService, routing){
  $scope.users = RegisterService.list();
  $scope.currentUser = RegisterService.getCurrentUser();
  
  console.log($scope.currentUser)
  console.log($scope.users)

  $scope.logout = function() {
    RegisterService.setCurrentUser(null);
    routing.loadPage('index.html')
  }

  $scope.showModal = false;
  $scope.toggleModal = function(){
    $scope.showModal = !$scope.showModal;
  };


  
});