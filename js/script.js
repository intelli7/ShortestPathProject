

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
    
    var cy = cytoscape({
          container: document.getElementById('cy'),

          style: cytoscape.stylesheet()
            .selector('node')
              .css({
                'content': 'data(id)',
                  'text-valign': 'center',
                  'font-size': '12',
                  'color': 'white',
                  'text-outline-width': 2,
                    'text-outline-color': '#888'
              })
            .selector('edge')
              .css({
                  'content': 'data(weight)',
                  'font-size': '8',
                  
                  'text-opacity': '0.7',
                'text-valign': 'center',
                'target-arrow-shape': 'triangle',
                  
                'width': 1,
                'line-color': '#ddd',
                'line-style': 'dashed',
                'target-arrow-color': '#ddd'
              })
            .selector('.highlighted')
              .css({
                'background-color': '#61bffc',
                'line-color': '#61bffc',
                  'width': 3,
                'target-arrow-color': '#61bffc',
                  'line-style': 'solid',
                'transition-property': 'background-color, line-color, target-arrow-color',
                'transition-duration': '0.5s'
              }),

        

          layout: {
            name: 'cose',
            directed: true,
            roots: '#v1',
            padding: 30
          }
        });

    var cyprim = cytoscape({
          container: document.getElementById('cyprim'),

          style: cytoscape.stylesheet()
            .selector('node')
              .css({
                'content': 'data(id)',
                  'text-valign': 'center',
                  'font-size': '12',
                  'color': 'white',
                  'text-outline-width': 2,
                    'text-outline-color': '#888'
              })
            .selector('edge')
              .css({
                  'content': 'data(weight)',
                  'font-size': '8',
                'target-arrow-shape': 'none',
                'width': 1,
                'line-color': '#ddd',
                  'line-style': 'dashed',
                'target-arrow-color': '#ddd'
              })
            .selector('.highlighted')
              .css({
                'background-color': '#61bffc',
                'line-color': '#61bffc',
                  'width': 3,
                  'line-style': 'solid',
                'target-arrow-color': '#61bffc',
                'transition-property': 'background-color, line-color, target-arrow-color',
                'transition-duration': '0.5s'
              }),

        

          layout: {
            name: 'cose',
            directed: true,
            roots: '#v1',
            padding: 30
          }
        });
    
    var cykruskal = cytoscape({
          container: document.getElementById('cykruskal'),

          style: cytoscape.stylesheet()
            .selector('node')
              .css({
                'content': 'data(id)',
                  'text-valign': 'center',
                  'font-size': '12',
                  'color': 'white',
                  'text-outline-width': 2,
                    'text-outline-color': '#888'
              })
            .selector('edge')
              .css({
                  'content': 'data(weight)',
                  'font-size': '8',
                'target-arrow-shape': 'none',
                'width': 1,
                'line-color': '#ddd',
                  'line-style': 'dashed',
                'target-arrow-color': '#ddd'
              })
            .selector('.highlighted')
              .css({
                'background-color': '#61bffc',
                'line-color': '#61bffc',
                  'width': 3,
                  'line-style': 'solid',
                'target-arrow-color': '#61bffc',
                'transition-property': 'background-color, line-color, target-arrow-color',
                'transition-duration': '0.5s'
              }),

        

          layout: {
            name: 'cose',
            directed: true,
            roots: '#v1',
            padding: 30
          }
        });
    
    /*
    var bfs = cy.elements().bfs('#v1', function(){}, true);

    var i = 0;
    var highlightNextEle = function(){
      bfs.path[i].addClass('highlighted');

      if( i < bfs.path.length ){
        i++;
        setTimeout(highlightNextEle, 1000);
      }
    };

    // kick off first highlight
    highlightNextEle();
    
    
    
    */

    $("#inNode").val('v1 v2 v3 v4 v5 v6 v7');
    
    var edgehtml = '';
    edgehtml += 'v1v2 2 v1 v2 \n';
    edgehtml += 'v1v4 1 v1 v4 \n';
    edgehtml += 'v2v4 3 v2 v4 \n';
    edgehtml += 'v2v5 10 v2 v5 \n';
    edgehtml += 'v3v1 4 v3 v1 \n';
    edgehtml += 'v3v6 5 v3 v6 \n';
    edgehtml += 'v4v3 2 v4 v3 \n';
    edgehtml += 'v4v6 8 v4 v6 \n';
    edgehtml += 'v4v7 4 v4 v7 \n';
    edgehtml += 'v4v5 2 v4 v5 \n';
    edgehtml += 'v5v7 6 v5 v7 \n';
    edgehtml += 'v7v6 1 v7 v6';
  

    $("#inEdge").val(edgehtml);
    $("#inStart").val('v1');
    $("#inEnd").val('v7');
    
    
    $('#btnSubmitDij').click(function(){
        
        var map = {};
        
        var xedge = {};
        var in1 = $("#inNode").val().split(' ');
        for(var i =0; i < in1.length; i++){
            cy.add([{ group: "nodes", data: { id: in1[i] }  }]);
            cyprim.add([ { group: "nodes", data: { id: in1[i] }  }]);
            cykruskal.add([ { group: "nodes", data: { id: in1[i] }  }]);
            map[in1[i]] = {};
            
        }
        
        var x = {};
        var in2 = $("#inEdge").val().split('\n');
        for(i =0; i < in2.length; i++){
            var tmp = in2[i].split(' ')
            cy.add([{ group: "edges", data: { id: tmp[0],  weight: tmp[1], source: tmp[2], target: tmp[3] } }]);
            
            cyprim.add([{ group: "edges", data: { id: tmp[0], weight: tmp[1], source: tmp[2], target: tmp[3] } }]);
            cykruskal.add([{ group: "edges", data: { id: tmp[0], weight: tmp[1], source: tmp[2], target: tmp[3] } }]);
            //map.set(xnode[tmp[2]], {tmp[3],tmp[1]});
            if(x[tmp[2]]==null){ x[tmp[2]] = ''; }
            x[tmp[2]] += tmp[3]+'-'+tmp[1]+',';
            
        }
        cy.layout().fit();
        cyprim.layout().fit();
        
        
        var keys = Object.keys(x);
        for(i =0; i < keys.length; i++){
            var tmpmap = {};
            var inn = x[keys[i]].split(",");
            for(var k =0; k < inn.length-1; k++){
                tmpt = inn[k].split('-')
                tmpmap[tmpt[0]] = tmpt[1];   
            }
            map[keys[i]] = tmpmap;
        }
        
        //1) dijkstra();
        
        //console.log(map);
        //var map = {a:{b:3,c:1},b:{a:2,c:1},c:{a:4,b:1}};
        graph = new Graph(map);
        
        var dijres = graph.findShortestPath($('#inStart').val(), $('#inEnd').val());
        //console.log(dijres);
        
        var path = new Array;
        for(i =0; i < dijres.length-1; i++){
            path[i] = '#'+dijres[i]+dijres[i+1];
        }
        //console.log(path);
        cy.$(path.join()).addClass('highlighted');
        
        
        //2) prim();
        /*
        var primres = graph.prim();
        path = new Array;
        for(i =0; i < primres.length-1; i++){
            path[i] = '#'+primres[i]+primres[i+1];
        }
        cyprim.$(path.join()).addClass('highlighted');
        
        
        console.log('prim path: '+primres);
        */
        
        //3) kruskal();
        var resk = cy.elements().kruskal().edges();
        var pathk = new Array;
        for(i =0; i < resk.length; i++){
            pathk[i] = '#'+resk[i].data('id');
        }
        //console.log(path);
        cykruskal.$(pathk.join()).addClass('highlighted');
        cykruskal.layout().fit();
     }); 
        
}); // on dom ready

