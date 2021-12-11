function generate_x_centers(width,num_catagories,padding){
	let step = Math.floor((width - padding)/num_catagories);
	let xCenters = [];
	for (i=0;i<num_catagories;i++){
		xCenters.push(step*(i+1))
	}
	return xCenters
}

function generate_y_centers(height,num_catagories,padding){
	let step = Math.floor((height - padding)/num_catagories);
	let yCenters = [];
	for (i=0;i<num_catagories;i++){
		yCenters.push(step*(i+1))
	}
	return yCenters
}


var colorScale = d3.schemeTableau10;
var nCats = 3;
var w = 1000;
var h = 1000;



var xpadding = 100;
var ypadding = 100;
var xCenter = generate_x_centers(w,nCats,xpadding);
var yCenter = generate_y_centers(h,nCats,ypadding);

var test_nodes = [
	{"Skill_Name":"Python", "Skill_Type": "Programming Language", "Skill_Level":100},
	{"Skill_Name":"C", "Skill_Type": "Programming Language", "Skill_Level":60},
	{"Skill_Name":"Matlab", "Skill_Type": "Programming Language", "Skill_Level":80},
	{"Skill_Name":"R", "Skill_Type": "Programming Language", "Skill_Level":50},
	{"Skill_Name":"Lisp", "Skill_Type": "Programming Language", "Skill_Level":10},
	{"Skill_Name":"Javascript", "Skill_Type": "Programming Language", "Skill_Level":20},
	{"Skill_Name":"Cuda", "Skill_Type": "Programming Language", "Skill_Level":25},
	{"Skill_Name":"C++", "Skill_Type": "Programming Language", "Skill_Level":75},
	{"Skill_Name":"SQL", "Skill_Type": "Databases", "Skill_Level":45},
	{"Skill_Name":"Mathematica", "Skill_Type": "Programming Language", "Skill_Level":90},
	{"Skill_Name":"Hive", "Skill_Type": "Databases", "Skill_Level":100},
	{"Skill_Name":"D3", "Skill_Type": "Web Development", "Skill_Level":60},
	{"Skill_Name":"Latex", "Skill_Type": "Other", "Skill_Level":80},
	{"Skill_Name":"Git", "Skill_Type": "Other", "Skill_Level":50},
	{"Skill_Name":"Tensorflow", "Skill_Type": "Machine Learning", "Skill_Level":10},
	{"Skill_Name":"Pytorch", "Skill_Type": "Machine Learning", "Skill_Level":20},
	{"Skill_Name":"CSS/SCSS", "Skill_Type": "Web Development", "Skill_Level":25},
	{"Skill_Name":"PHP", "Skill_Type": "Programming Language", "Skill_Level":75},
	{"Skill_Name":"HTML", "Skill_Type": "Web Development", "Skill_Level":45},
	{"Skill_Name":"React", "Skill_Type": "Web Development", "Skill_Level":90}
	];

function create_catagory_dict(data){
	var string_list = [];
	for(i=0;i<data.length;i++){
		string_list.push(data[i].Skill_Type)
	}
	var category_dict = new Object();
	var string_set = new Set(string_list);
	var count = 1;
	string_set.forEach(function(value){
		category_dict[value] = count;
		count++;
	})
	return category_dict;
}



var numNodes = test_nodes.length;
var nodes = test_nodes.map(function(data, index) {
	category_dict = create_catagory_dict(test_nodes);
	return {
		radius: data.Skill_Level,
		category: category_dict[data.Skill_Type],
		name: data.Skill_Name,
		
	}
});

console.log(nodes);

//var t1 = create_catagory_dict(nodes);
//console.log(t1);

//alpha value determines how hot our simulation is starts at 1 and decays to zero by defualt of a set number of iterations 
//300 by default

// velocity decay: really a friction value used to slow the simulation naturally by iteration 
//ranges 1 no friction to zero total friction

//Charge simulates mutual "n-body" forces; 
//a positve charge indicates attraction whereas a negative charge indicates repullsion


//Positional Forces:
//X postional forces pulls all particles to a specific point in that dimension
//Y positional forces do the same just in the y dimension

//Collision Force:
//used to prevent collided particles from being overlapping one another by fixing their radius



var simulation = d3.forceSimulation(nodes)
	.force('charge', d3.forceManyBody().strength(0))
	.force('x', d3.forceX().x(function(d) {
		return 500;
	}))
	.force('y', d3.forceY().y(function(d) {
		return 500;
	}))
	.force('collision', d3.forceCollide().radius(function(d) {
		return d.radius;
	}).strength(1))
	.on('tick', ticked);

function ticked() {
	var circles = d3.select('svg')
		.attr('width',w)
		.attr('height',h)
		.selectAll('circle')
		.data(nodes)
		.join('circle')
		.attr('r', function(d) {
			return d.radius;
		})
		.style('fill', function(d) {
			return colorScale[d.category];
		})
		.attr('cx', function(d) {
			return d.x;
		})
		.attr('cy', function(d) {
			return d.y;
		})

	var text_data = d3.select('svg')
		.selectAll('text')
		.data(nodes)
		.join('text')
		.text(function(d){
			return d.name;
		})
		.attr('x', function(d) {
			return d.x;
		})
		.attr('y', function(d) {
			return d.y;
		})
		.attr("font-family","sans-serif")
		.attr("font-size","11px")
		.attr("text-anchor","middle")
		.attr("fill","black");
		


	
}