//source algo:http://www.math.uaa.alaska.edu/~afkjm/cs351/handouts/GraphsGreedy.pdf
//refer to https://github.com/filiperoberto/javascriptPrimKruskal/blob/master/grafos.js


var Kruskal = function(_mm)
{
    
    
//var mm=_mm.map;
var mm=_mm.map;
var grafo = {};

    
var A = [];
var pi = {};
var rank = {};
var indiceInvertido = [];

var result = {};


    
function initgraph(){
    
    var keys = Object.keys(mm);
    grafo['vertices'] = keys;
    grafo['edge'] = [];
    //console.log(grafo);
    for(var node in mm) {
        var forest = mm[node];
        var dest = Object.keys(forest);
        var tmpx = [null,null,9999];
        for(var i = 0; i<dest.length;i++){
               //sortededge[forest[dest[i]]+node+dest[i]] = {source:node,dest:dest[i]};
                tmpx = [node,dest[i],forest[dest[i]]];
                //console.log('push: '+tmpx);
                grafo['edge'].push(tmpx);
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

	for(var i=0;i<grafo.vertices.length;i++){
        //console.log('makeset'+grafo.vertices[i]);
		make_set(grafo.vertices[i]);
    }
    //console.log(grafo);
    
    for(var i in grafo.edge)
    {
        if(!indiceInvertido[grafo.edge[i][2]])
            indiceInvertido[grafo.edge[i][2]] = [];
        indiceInvertido[grafo.edge[i][2]].push(grafo.edge[i]);
    }
    //console.log(indiceInvertido);
    
    
	for(var i in indiceInvertido)  //loop every sorted edges
	{
        //console.log('start weight: '+indiceInvertido[i][0][2]);
		for(var j in indiceInvertido[i]) //loop every same weight
		{
            //console.log('start j0='+indiceInvertido[i][j][0]+' in j1='+indiceInvertido[i][j][1]);
            var results = 'false';
			if(find_set(indiceInvertido[i][j][0]) != find_set(indiceInvertido[i][j][1]))
			{
                results = 'accepted';
				A.push(indiceInvertido[i][j])
				union(indiceInvertido[i][j][0],find_set(indiceInvertido[i][j][1]));
			}
            //console.log(results);
		}
	}
	result.edge = A;
    result.vertices = grafo.vertices;
    
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
