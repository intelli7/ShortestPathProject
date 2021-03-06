

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
    edgehtml += 'v4v7 40 v4 v7 \n';
    edgehtml += 'v4v5 2 v4 v5 \n';
    edgehtml += 'v5v7 6 v5 v7 \n';
    edgehtml += 'v7v6 1 v7 v6';
  

    $("#inEdge").val(edgehtml);
    $("#inStart").val('v1');
    $("#inEnd").val('v7');
    
    
    $('#btnSubmitDij').click(function(){
        //cyprim.destroy();
        
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
                'target-arrow-color': '#ddd',
                  
              })
            .selector('.hidden')
              .css({
                  'display': 'none'
              })
        
            .selector('.highlighted')
              .css({
                'background-color': '#61bffc',
                'line-color': '#61bffc',
                  'width': 3,
                  'line-style': 'solid',
                'target-arrow-color': '#61bffc',
                'transition-property': 'background-color, line-color, target-arrow-color',
                'transition-duration': '0.5s',
                  'display': 'block'
                  
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
            .selector('.hidden')
              .css({
                  'display': 'none'
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
        
        
        var map = {};
        
        var xedge = {};
        var in1 = $("#inNode").val().split(' ');
        for(var i =0; i < in1.length; i++){
            cy.add([{ group: "nodes", data: { id: in1[i] }  }]);
            cyprim.add([ { group: "nodes", data: { id: in1[i] }  }]);
            cykruskal.add([ { group: "nodes", data: { id: in1[i] }  }]);
            map[in1[i]] = {};
            
        }
        
        var objedge = {};
        var objedgedij = {};
        var in2 = $("#inEdge").val().split('\n');
        for(i =0; i < in2.length; i++){
    
            var tmp = in2[i].split(' ');
            var idedge1 = tmp[2]+tmp[3];
            var idedge2 = tmp[3]+tmp[2];
            
            
            cy.add([{ group: "edges", data: { id: tmp[0],  weight: tmp[1], source: tmp[2], target: tmp[3] } }]);
            
               cyprim.add([{ group: "edges", data: { id: idedge1, weight: tmp[1], source: tmp[2], target: tmp[3] } }]);
               cyprim.add([{ group: "edges",classes: 'hidden', data: { id: idedge2, weight: tmp[1], source: tmp[3], target: tmp[2] } }]);
            
            cykruskal.add([{ group: "edges", data: { id: idedge1, weight: tmp[1], source: tmp[2], target: tmp[3] } }]);
            cykruskal.add([{ group: "edges",classes: 'hidden', data: { id: idedge2, weight: tmp[1], source: tmp[3], target: tmp[2] } }]);
            //map.set(xnode[tmp[2]], {tmp[3],tmp[1]});
            
            if(objedge[tmp[2]]==null){ 
                objedge[tmp[2]] = ''; 
                objedgedij[tmp[2]] = ''; 
            }
            if(objedge[tmp[3]]==null){ 
                objedge[tmp[3]] = ''; 
                objedgedij[tmp[3]] = ''; 
            }
            objedge[tmp[2]] += tmp[3]+'-'+tmp[1]+',';
            objedgedij[tmp[2]] += tmp[3]+'-'+tmp[1]+',';
            
            objedge[tmp[3]] += tmp[2]+'-'+tmp[1]+',';
            
        }
       
        var keys = Object.keys(objedge);
        for(i =0; i < keys.length; i++){
            var tmpmap = {};
            var inn = objedge[keys[i]].split(",");
            for(var k =0; k < inn.length-1; k++){
                tmpt = inn[k].split('-')
                tmpmap[tmpt[0]] = parseFloat(tmpt[1]);   
            }
            map[keys[i]] = tmpmap;
        }
        
        
        
        //console.log(objedgedij);
        var mapdij = {};
        var keys2 = Object.keys(objedgedij);
        for(i =0; i < keys2.length; i++){
            var tmpmap = {};
            var inn = objedgedij[keys2[i]].split(",");
            for(var k =0; k < inn.length-1; k++){
                tmpt = inn[k].split('-')
                tmpmap[tmpt[0]] = parseFloat(tmpt[1]);   
            }
            mapdij[keys2[i]] = tmpmap;
        }
        //console.log(map);
        //var map = {a:{b:3,c:1},b:{a:2,c:1},c:{a:4,b:1}};
        graphdij = new Graph(mapdij);
        graph = new Graph(map);
        
        
        //1) dijkstra();
        $('#dij_console').append('<div class="jquery-console-prompt-box"><span class="jquery-console-prompt-label">Dijkstra &gt;</span><span class="jquery-console-prompt"> Start: '+$('#inStart').val()+' End '+$('#inEnd').val()+'</span></div>');
        
        var dijres = graphdij.findShortestPath($('#inStart').val(), $('#inEnd').val());
        //console.log(dijres);
        
        var path = new Array;
        var tcost = 0;
        for(i =0; i < dijres.length-1; i++){
            path[i] = '#'+dijres[i]+dijres[i+1];
            tcost += mapdij[dijres[i]][dijres[i+1]];
        }
        
        $('#dij_console').append('<div class="jquery-console-message jquery-console-message-value">PATH =&gt; '+dijres.join(' > ')+'</div>');
        $('#dij_console').append('<div class="jquery-console-message jquery-console-message-value">COST =&gt; '+tcost+'</div>');

        
        //console.log(path);
        cy.$(path.join()).addClass('highlighted');
        cy.layout().fit();
        
        //2) prim();
        
        var primres = graph.prim();
        
        cyprim.$(primres.join()).addClass('highlighted');
        cyprim.layout().fit();
        
        //console.log('prim path: '+primres);
        
        
        //3) kruskal();
        
        var kruskalres = Kruskal(graph);
        cykruskal.$(kruskalres.join()).addClass('highlighted');
        cykruskal.layout().fit();
        
     }); 
        
}); // on dom ready

