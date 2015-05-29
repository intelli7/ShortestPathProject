

var app = angular.module('myApp', []);
    app.controller('myCtrl', function($scope) {
        $scope.appname= "DataStructure";
        $scope.menus= [
            {title:"Homepage",url:"home",action:"home",active:"active"},
            {title:"Dijkstra",url:"dijkstra",action:"dij",active:"inactive"},
            {title:"Prim",url:"prim",action:"prim",active:"inactive"},
            {title:"Kruskal",url:"kruskal",action:"kruskal",active:"inactive"}
        ];
        
        
        $scope.tongglemenu = function(menu) {
            //console.dir(menu);            
          return menu.active = "active" 
        };
    });

$(document).ready(function(){
    $.material.init(); 
});