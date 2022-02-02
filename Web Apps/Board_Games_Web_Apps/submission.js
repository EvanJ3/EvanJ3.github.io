
function calculate_degree_dict(data){
    var degree_dict = {};
    for (i=0;i<data.length;i++){
        let source_name = data[i].source.name
        let target_name = data[i].target.name
        if (Object.keys(degree_dict).includes(source_name)){
            degree_dict[source_name]++
        }else{
            degree_dict[source_name] = 1
        }

        if (Object.keys(degree_dict).includes(target_name)){
            degree_dict[target_name]++
        }else{
            degree_dict[target_name] = 1
        }
    }
    return degree_dict
}

function get_max_degree(degree_dict){
    let value_array = Object.values(degree_dict);
    let max = value_array.reduce(function(a, b) {
        return Math.max(a, b);
    }, 0);
    return max
}

function get_min_degree(degree_dict){
    let value_array = Object.values(degree_dict);
    let min = value_array.reduce(function(a, b) {
        return Math.min(a, b);
    }, 0);
    return min
}

function minMaxScale(maxValue,minValue,x){
    return (x-minValue)/(maxValue-minValue)
}



d3.dsv(",", "board_games.csv", function(d) {
    return {
    source: d.source,
    target: d.target,
    value: +d.value
    }
    
}).then(function(data) {

    
    var links = data;
    var nodes = {};

    // compute the distinct nodes from the links.
    links.forEach(function(link) {
        link.source = nodes[link.source] || (nodes[link.source] = {name: link.source});
        link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
    });


    var deg_dict = calculate_degree_dict(links);
    var maxDegree = get_max_degree(deg_dict);
    var minDegree = get_min_degree(deg_dict);

    var width = 1200,
        height = 700;

    var minRadius = 3;
    var maxRadius = 20;
    var  rScale = d3.scaleLinear()
        .range([minRadius,maxRadius])
        .domain([minDegree,maxDegree]);


    var force = d3.forceSimulation()
        .nodes(d3.values(nodes))
        .force("link", d3.forceLink(links).distance(100))
        .force('center', d3.forceCenter(width / 2, height / 2))
        .force("x", d3.forceX())
        .force("y", d3.forceY())
        .force("charge", d3.forceManyBody().strength(-250))
        .alphaTarget(1)
        .on("tick", tick);

    var svg = d3.select("body").append("svg")
        .attr("width", width)
        .attr("height", height);

    // add the links
    var path = svg.append("g")
        .selectAll("path")
        .data(links)
        .enter()
        .append("path")
        .attr("class", function(d) { 
            if (d.value == 0){
                return "link-strong"
            }else if (d.value == 1){
                return "link-weak"
            }else{
                return "link-null"
            };
            });

    // define the nodes
    var node = svg.selectAll(".node")
        .data(force.nodes())
        .enter().append("g")
        .attr("class", "node")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // add the nodes
    node.append("circle")
        .attr("id", function(d){
            return (d.name.replace(/\s+/g,'').toLowerCase());
        })
        .attr("r", function(d) {
            return rScale(deg_dict[d.name])
        })
        .attr("fill", function(d){
            return d3.interpolateBlues(minMaxScale(maxDegree+3,minDegree,deg_dict[d.name]))
        });

    node.append("text")
        .text(function(d){return d.name;});
    

    // add the curvy lines
    function tick() {
        path.attr("d", function(d) {
            var dx = d.target.x - d.source.x,
                dy = d.target.y - d.source.y,
                dr = Math.sqrt(dx * dx + dy * dy);
            return "M" +
                d.source.x + "," +
                d.source.y + "A" +
                dr + "," + dr + " 0 0,1 " +
                d.target.x + "," +
                d.target.y;
        });

        node.attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")"; 
        });
    };

    function dragstarted(d) {
        if (!d3.event.active) force.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    };

    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
        d.fixed = true;
    };

    function dragended(d) {
        if (!d3.event.active) force.alphaTarget(0.3);
        if (d.fixed == true) {
            d.fx = d.x;
            d.fy = d.y;
            d3.select(this)
                .select("circle")
                .attr("class","pinned-node")
        }
        else {
            d.fx = null;
            d.fy = null;
        }
    }

    d3.selectAll("g")
        .on("dblclick",function(d){
            if (d.fixed == true){
                d.fixed = false;
                d.fx = null;
                d.fy = null;
                d3.select(this)
                .select("circle")
                .attr("class",null)
            }
            
        });


    
    }).catch(function(error) {
    console.log(error);
});
