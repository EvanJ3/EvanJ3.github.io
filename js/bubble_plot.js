
var test_nodes = d3.csv('./csv/Skill_Data_csv/skill_data.csv',function(data){
	return {
		Skill_Name: data.Skill_Name,
		Skill_Type: data.Skill_Type,
		Skill_Level: data.Skill_Level
	}
}).then(function(test_nodes){

	function create_catagory_dict(data){
		var string_list = [];
		for(i=0;i<data.length;i++){
			string_list.push(data[i].Skill_Type)
		}
		var category_dict = new Object();
		var string_set = new Set(string_list);
		var count = 0;
		string_set.forEach(function(value){
			category_dict[value] = count;
			count++;
		})
		return category_dict;
	};
	
	var colorScale = d3.schemeTableau10;
	var w = 700;
	var h = 700;

	var y_center = Math.floor(h/2);
	var x_center = Math.floor(w/2);
	var radius_scale_factor = 10;

	var nodes = test_nodes.map(function(data) {
		category_dict = create_catagory_dict(test_nodes);
		return {
			radius: data.Skill_Level*radius_scale_factor,
			category: category_dict[data.Skill_Type],
			name: data.Skill_Name,
			
		}
	});

	function get_attracting_edges(nodes){
	var edges = [];
	var unique_sources = [];
	for(i=0;i<nodes.length;i++){
		let source_node_name = nodes[i].name;
		let source_node_catagory = nodes[i].category;
		for(j=0;j<nodes.length;j++){
			let target_node_name = nodes[j].name;
			let target_node_catagory = nodes[j].category;
			if(target_node_name!=source_node_name && target_node_catagory === source_node_catagory && !unique_sources.includes(target_node_name)){
				edges.push({"source":source_node_name, "target":target_node_name});
			}

		}
		unique_sources.push(source_node_name)
	}
	return edges
};

	var attracting_edges = get_attracting_edges(nodes);
	
	

var simulation = d3.forceSimulation(nodes)
	.force('charge', d3.forceManyBody().strength(1))
	.force("boundary", forceBoundary(0,0,w, h).strength(.5))
	.force('collision', d3.forceCollide().radius(function(d) {return d.radius;}).strength(.7))
	.force('link',d3.forceLink().links(attracting_edges).id(function(d){return d.name}).strength(1))
	.on('tick', ticked);

	function ticked() {
		var circles = d3.select('svg')
			.attr('width',w)
			.attr('height',h)
			.selectAll('circle')
			.data(nodes)
			.join('circle')
			.attr('r', function(d) {return d.radius;})
			.style('fill', function(d) {return colorScale[d.category];})
			.attr('cx', function(d) {return d.x;})
			.attr('cy', function(d) {return d.y;})
	
		var text_data = d3.select('svg')
			.selectAll('text')
			.data(nodes)
			.join('text')
			.text(function(d){return d.name})
			.attr('x', function(d) {return d.x;})
			.attr('y', function(d) {return d.y;})
			.attr("font-family","sans-serif")
			.attr("font-size","11px")
			.attr("text-anchor","middle")
			.attr("fill","black");

		var legend = d3.select('svg')
			.selectAll('circle')

			
	};

});

