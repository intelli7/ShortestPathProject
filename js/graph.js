var Graph = (function (undefined) {

	var extractKeys = function (obj) {
		var keys = [], key;
		for (key in obj) {
		    Object.prototype.hasOwnProperty.call(obj,key) && keys.push(key);
		}
		return keys;
	}

	var sorter = function (a, b) {
		return parseFloat (a) - parseFloat (b);
	}

	var findPaths = function (map, start, end, infinity) {
        //console.log('start findpaths: '+start+' , '+end)
		
        infinity = infinity || Infinity;

		var costs = {},
		    open = {'0': [start]},
		    predecessors = {},
		    keys;

		var addToOpen = function (cost, vertex) {
			var key = "" + cost;
			if (!open[key]) open[key] = [];
			open[key].push(vertex);
		}

		costs[start] = 0;

		while (open) {
			if(!(keys = extractKeys(open)).length) break;

			keys.sort(sorter);

            //console.log(keys);
            
			var key = keys[0],
			    bucket = open[key],
			    node = bucket.shift(),
			    currentCost = parseFloat(key),
			    adjacentNodes = map[node] || {};

            //console.log('key:'+key+' ,bucket:'+bucket+' ,node:'+node+' ,currentCost:'+currentCost+' ,adjacentNodes:');
            //console.log(adjacentNodes);
			if (!bucket.length){
                //console.log('delete open[key]');
                //console.log(open[key]);
                delete open[key];
            }

			for (var vertex in adjacentNodes) {
                //console.log('for every vertex'+vertex);
			    if (Object.prototype.hasOwnProperty.call(adjacentNodes, vertex)) {
					var cost = adjacentNodes[vertex],
					    totalCost = cost + currentCost,
					    vertexCost = costs[vertex];
                    //console.log('cost'+cost+' ,totalCost'+totalCost+' ,vertexCost'+vertexCost);
					if ((vertexCost === undefined) || (vertexCost > totalCost)) {
						costs[vertex] = totalCost;
						addToOpen(totalCost, vertex);
						predecessors[vertex] = node;
					}
				}
			}
		}

		if (costs[end] === undefined) {
			return null;
		} else {
			return predecessors;
		}

	}

	var extractShortest = function (predecessors, end) {
		var nodes = [],
		    u = end;

		while (u) {
			nodes.push(u);
			predecessor = predecessors[u];
			u = predecessors[u];
		}

		nodes.reverse();
		return nodes;
	}

	var findShortestPath = function (map, nodes) {
		var start = nodes.shift(),
		    end,
		    predecessors,
		    path = [],
		    shortest;

		while (nodes.length) {
			end = nodes.shift();
			predecessors = findPaths(map, start, end);

			if (predecessors) {
				shortest = extractShortest(predecessors, end);
				if (nodes.length) {
					path.push.apply(path, shortest.slice(0, -1));
				} else {
					return path.concat(shortest);
				}
			} else {
				return null;
			}

			start = end;
		}
	}

	

	var Graph = function (map) {
		this.map = map;
	}

	Graph.prototype.findShortestPath = function (start, end) {
        //console.log(this.map);
        return findShortestPath(this.map, [start, end]);
	}

	
    
    Graph.prototype.prim = function (){
        //console.log('start prim: mm=>');
        var mm = this.map;
        //console.log(mm);
        
        var keys = extractKeys(mm)
        keys.sort(sorter);
        
        var result = [];
        var respath = [];
        var usedNodes = {};

        function findMin(mm) {
            var min = [999999,null,null];
            //var adjlist = mm[node];
            for(var i=0;i<result.length;i++){ 
                var adjlist = mm[result[i]];
                if(result[i]==null) break;
                
                Object.getOwnPropertyNames(adjlist).forEach(function(val, idx, array) {
                    //console.log(val);
                    var tmplength= parseInt(adjlist[val]);
                    
                    //console.log(val+' '+usedNodes[val]);
                    if(tmplength < min[0] && usedNodes[val] === undefined){
                        min = [tmplength, val, result[i]];
                    }
                    
                });
            }
            //console.log('return '+min);
            return min;
        }

        // Pick random start point
        //var node = keys[0];
        var node = keys[Math.round(Math.random()*(keys.length-1))];
        
        //console.log('start node:'+node);
        result.push(node);
        usedNodes[node] = true;

        var min = findMin(mm);
        
        
        while(min[1] != null) {
            //console.log(min);
            result.push(min[1]);
            usedNodes[min[1]] = true;
            if(min[1] != result[0]){
                respath.push('#'+min[2]+min[1]);
                respath.push('#'+min[1]+min[2]);
            }
            
            min = findMin(mm);
            
            
        }
        //console.log('end prim: result');
        //console.log(respath);
        return respath;
    }
    
    
	return Graph;

})();

