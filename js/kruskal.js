//source algo:http://www.math.uaa.alaska.edu/~afkjm/cs351/handouts/GraphsGreedy.pdf
//refer to https://github.com/filiperoberto/javascriptPrimKruskal/blob/master/grafos.js


var Kruskal = function(_mm)
{
    
    
//var mm=_mm.map;
var mm=_mm.map;
var graph = {};

    
var A = [];
var pi = {};
var rank = {};
var sortededge = [];

var result = {};


    
function initgraph(){
    
    var keys = Object.keys(mm);
    graph['vertices'] = keys;
    graph['edge'] = [];
    //console.log(graph);
    for(var node in mm) {
        var forest = mm[node];
        var dest = Object.keys(forest);
        var tmpx = [null,null,9999];
        for(var i = 0; i<dest.length;i++){
               //sortededge[forest[dest[i]]+node+dest[i]] = {source:node,dest:dest[i]};
                tmpx = [node,dest[i],forest[dest[i]]];
                //console.log('push: '+tmpx);
                graph['edge'].push(tmpx);
        }
    }
}
function make_set(x)
{
	pi[x] = x;
	rank[x] = 0;
}

function find_set(x)
{
    //console.log('start findset='+x);
	while(x != pi[x]){
		x = pi[x];
        
    }
    //console.log('end findset='+x);
	return x;
}

function union(x,y)
{
	rx = find_set(x);
	ry = find_set(y);
	if(rx==ry) return;
	if(rank[rx]>rank[ry])
		pi[ry] = rx;
	else
	{
		pi[rx] = ry;
		if(rank[rx] == rank[ry])
			rank[ry] = rank[ry] + 1;
	}
}

    initgraph();

	for(var i=0;i<graph.vertices.length;i++){
        //console.log('makeset'+graph.vertices[i]);
		make_set(graph.vertices[i]);
    }
    //console.log(graph);
    
    for(var i in graph.edge)
    {
        if(!sortededge[graph.edge[i][2]])
            sortededge[graph.edge[i][2]] = [];
        sortededge[graph.edge[i][2]].push(graph.edge[i]);
    }
    //console.log(sortededge);
    
    
	for(var i in sortededge)  //loop every sorted edges
	{
        //console.log('start weight: '+sortededge[i][0][2]);
		for(var j in sortededge[i]) //loop every same weight
		{
            //console.log('start j0='+sortededge[i][j][0]+' in j1='+sortededge[i][j][1]);
            var results = 'false';
			if(find_set(sortededge[i][j][0]) != find_set(sortededge[i][j][1]))
			{
                results = 'accepted';
				A.push(sortededge[i][j])
				union(sortededge[i][j][0],find_set(sortededge[i][j][1]));
			}
            //console.log(results);
		}
	}
	result.edge = A;
    result.vertices = graph.vertices;
    
    $('#kruskal_console').append('<div class="jquery-console-prompt-box"><span class="jquery-console-prompt-label">Kruskal &gt;</span><span class="jquery-console-prompt"></span></div>');

    
    var tcost = 0;
    var output = [];
    
    var consolepath = [];
    
    
    for(i = 0;i<result.edge.length;i++){
        output.push('#'+result.edge[i][0]+result.edge[i][1]);
        output.push('#'+result.edge[i][1]+result.edge[i][0]);
        
        consolepath.push(result.edge[i][0]+result.edge[i][1]);
        tcost += mm[result.edge[i][0]][result.edge[i][1]];
    }
    
    $('#kruskal_console').append('<div class="jquery-console-message jquery-console-message-value">PATH =&gt; '+consolepath.join(' > ')+'</div>');
    $('#kruskal_console').append('<div class="jquery-console-message jquery-console-message-value">COST =&gt; '+tcost+'</div>');

    //console.log(output);
	return output;
}
