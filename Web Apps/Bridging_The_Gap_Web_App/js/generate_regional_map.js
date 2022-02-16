var width = 1100;
var height = 500;

var projection = d3.geoAlbersUsa()
	projection.fitExtent([[0, 0], [width-150, height]],projection).scale([1100]).translate([(width-150)/2,height/2]);


var path = d3.geoPath()
	.projection(projection);


var svg = d3.select(".map-container-center")
	.append("svg")
	.attr("width", width)
	.attr("height", height)
	.attr("id","map");

var dropdown_box = d3.select(".drop-down").append("select")
	.attr('id','RegionDropdown');


function handleclick() {
	var region_selection = this.value
	d3.selectAll("svg > *").remove();
	d3.select("div#tooltip").remove();
	createMapAndLegend(map_data,region_data,region_selection);
	updateNNsection(region_selection);
	updateRFsection(region_selection);
	updateAdasection(region_selection);
	updateLogRegsection(region_selection);
	updateBayessection(region_selection);
	}


var map_data = d3.json("geojson/us_states.json");
var region_data = d3.csv("csv/State_Regions.csv",function(d){
	return {
		State_Name: d.State_Name,
		Region: d.Region
	}

});

Promise.all([map_data,region_data]).then(function(values){
	map_data = values[0];
	region_data = values[1];
	default_color = "#999999";
	ready('',map_data,region_data)
	
});

function ready(error, map_data, region_data) {
	populate_dropdown(dropdown_box);
	createMapAndLegend(map_data,region_data);
	updateNNsection('Southeast');
	updateRFsection('Southeast');
	updateAdasection('Southeast');
	updateLogRegsection('Southeast');
	updateBayessection('Southeast');
	

}

function createMapAndLegend(map_data,region_data,selectRegion='Southeast'){

	var chart_selection = d3.select("svg#map");

	chart_selection.append('g')
		.attr('id','state');

	var state_path_group = d3.select('#state');

	chart_selection.append('g')
		.attr('id','legend')
		.attr("transform", "translate(0,150)");

	var chart_legend_group = d3.select('#legend');

	var region_dict = get_region_dict(region_data)
	

	var tip = d3.tip().attr('class', 'd3-tip').attr('id','tooltip').offset([10,0]).html(function(d){ 
		return '<b>State:</b>'+ ' '+ d.properties.name+ '<br><b>Region:</b>'+ ' '+ region_dict[d.properties.name]});
		


	chart_selection.call(tip)

	state_path_group.selectAll("path")
		.data(map_data.features)
		.enter()
		.append("path")
		.attr("fill",function(d){
			if(region_dict[d.properties.name] ==  selectRegion){
				return 'rgb(102,178,255)'
			}else{
				return 'rgb(192,192,192)'
			}
		})
		.attr("stroke","rgb(224,224,224)")
		.attr("stroke-widhth","1")
		.attr("d",path)
		.attr("id",function(d){return d.properties.name})
		.on('mouseover', tip.show)
		.on("mousemove", function(){return tip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
		.on('mouseout', tip.hide);
		
	var legendText = ["Southeast", "North Central", "Northeast", "Northwest", "South Central","Florida","Upper Midwest", "West"];
	chart_legend_group.append("text")
			.attr("text-anchor", "start")
			.style("fill", "black")
			.attr("x",width-160)
			.attr("y",-35)
			.text("Modeling Region")
			.style('font-size','12pt')
			.style('font-weight','700');

	for (let i=0;i<legendText.length;i++){

		chart_legend_group.append("circle")
			.attr("r",5)
			.attr("fill", function(d){
				if(legendText[i] ==  selectRegion){
					return 'rgb(102,178,255)'
				}else{
					return 'rgb(192,192,192)'
				}
			})
			.attr("stroke", "none")
			.attr("cx",width-150)
			.attr("cy",(i*30));

		chart_legend_group.append("text")
			.attr("text-anchor", "start")
			.style("fill", "black")
			.attr("x",width-135)
			.attr("y",(i*30)+5)
			.text(function(d){
				return legendText[i]
			})
			.style('font-size','10pt');
	}

		
}

function populate_dropdown(selection){
	region_list = ["Southeast", "North Central", "Northeast", "Northwest", "South Central","Florida","Upper Midwest", "West"]
	for (let i=0;i<region_list.length;i++){
		selection.append('option')
			.text(region_list[i])
			.attr('id',region_list[i])
			.attr('value',region_list[i]);
			//.on("click", handleclick);
	}
	selection.on('change', handleclick)
}

function get_region_dict(data){
	let region_dict = {}
	for (let i=0;i<data.length;i++){
		region_dict[data[i].State_Name] = data[i].Region
	}
	return region_dict
}

function updateNNsection(region_selection){
	var nn_div = d3.select("#NN-container");
	nn_div.selectAll("img").remove();
	var base_img_path = "Images/";
	var region_img_path = base_img_path + region_selection + '/';
	var nn_prod_strings = ["_NN_Production_Confusion_Matrix.png", "_NN_Production_Accuracy.png","_NN_Production_Loss.png"]
	var nn_cv_strings = ["_NN_CV_Test_Accuracy.png","_NN_CV_Train_Accuracy.png","_NN_CV_Train_Loss.png","_NN_CV_Test_Loss.png"]
	for (let i=0;i<nn_cv_strings.length;i++){
		nn_cv_strings[i] = region_img_path+region_selection+nn_cv_strings[i]
	}

	for (let i=0;i<nn_prod_strings.length;i++){
		nn_prod_strings[i] = region_img_path+region_selection+nn_prod_strings[i]
	} 
	var prod_count = 0;
	for (let i=0;i<nn_prod_strings.length;i++){
		sel_prod_string = '#nn-prod-img-'+String(prod_count)
		d3.select(sel_prod_string).append('img')
			.attr("src",nn_prod_strings[i])
			.style("width","620px")
			.style("height","378px");
		if(i === 1){
			prod_count++
		}
	}
	model_arch_str =  region_img_path +'model_arch.png'
	d3.select(sel_prod_string).append('img')
			.attr("src",model_arch_str)
			.style("width","275px")
			.style("height","378px");

	var cv_count = 0;
	for (let i=0;i<nn_cv_strings.length;i++){
		
		sel_cv_string = '#nn-cv-img-'+String(cv_count)
		d3.select(sel_cv_string).append('img')
		.attr("src",nn_cv_strings[i])
		.style("width","620px")
		.style("height","378px");
		if(i === 1){
			cv_count++
		}
	}
	

	


};


function updateRFsection(region_selection){
	var rf_div = d3.select("#RF-container");
	rf_div.selectAll("img").remove();
	var base_img_path = "Images/";
	var region_img_path = base_img_path + region_selection + '/';
	var rf_prod_string = region_img_path+region_selection+'_RF_Production_Confusion_Matrix.png';
	var rf_cv_string_max = region_img_path+region_selection+'_RF_Max_Depth_GridSearch_CV_Accuracy.png';
	var rf_cv_string_nest = region_img_path+region_selection+'_RF_N_Estimators_GridSearch_CV_Accuracy.png';
	var sel_cv_string = '#'+'rf-img-0';
	var sel_prod_string = '#'+'rf-img-1';
	d3.select(sel_cv_string).append('img')
		.attr("src",rf_cv_string_max)
		.style("width","620px")
		.style("height","378px");

	d3.select(sel_cv_string).append('img')
		.attr("src",rf_cv_string_nest)
		.style("width","620px")
		.style("height","378px");

	d3.select(sel_prod_string).append('img')
		.attr("src",rf_prod_string)
		.style("width","620px")
		.style("height","378px");

};

function updateBayessection(region_selection){
	var bayes_div = d3.select("#bayes-container");
	bayes_div.selectAll("img").remove();
	var base_img_path = "Images/";
	var region_img_path = base_img_path + region_selection + '/';
	var bayes_prod_string = region_img_path+region_selection+'_Bayes_Production_Confusion_Matrix.png';
	var bayes_cv_string = region_img_path+region_selection+'_Bayes_GridSearch_CV_Accuracy.png';
	var sel_cv_string = '#'+'bayes-img-0';
	var sel_prod_string = '#'+'bayes-img-0';
	d3.select(sel_cv_string).append('img')
		.attr("src",bayes_cv_string)
		.style("width","620px")
		.style("height","378px");

	d3.select(sel_prod_string).append('img')
		.attr("src",bayes_prod_string)
		.style("width","620px")
		.style("height","378px");

};

function updateLogRegsection(region_selection){
	var logreg_div = d3.select("#logreg-container");
	logreg_div.selectAll("img").remove();
	var base_img_path = "Images/";
	var region_img_path = base_img_path + region_selection + '/';
	var logreg_prod_string = region_img_path+region_selection+'_LogReg_Production_Confusion_Matrix.png';
	var logreg_cv_string = region_img_path+region_selection+'_LogReg_GridSearch_CV_Accuracy.png';
	var sel_cv_string = '#'+'logreg-img-0';
	var sel_prod_string = '#'+'logreg-img-0';
	d3.select(sel_cv_string).append('img')
		.attr("src",logreg_cv_string)
		.style("width","620px")
		.style("height","378px");

	d3.select(sel_prod_string).append('img')
		.attr("src",logreg_prod_string)
		.style("width","620px")
		.style("height","378px");

};

function updateAdasection(region_selection){
	var ada_div = d3.select("#ada-container");
	ada_div.selectAll("img").remove();
	var base_img_path = "Images/";
	var region_img_path = base_img_path + region_selection + '/';
	var ada_prod_string = region_img_path+region_selection+'_Adaboost_Production_Confusion_Matrix.png';
	var ada_cv_string_nest = region_img_path+region_selection+'_Adaboost_N_Estimators_GridSearch_CV_Accuracy.png';
	var ada_cv_string_lr = region_img_path+region_selection+'_Adaboost_Learning_Rate_GridSearch_CV_Accuracy.png';
	var sel_cv_string = '#'+'ada-img-0';
	var sel_prod_string = '#'+'ada-img-1';
	d3.select(sel_cv_string).append('img')
		.attr("src",ada_cv_string_nest)
		.style("width","620px")
		.style("height","378px");

	d3.select(sel_cv_string).append('img')
		.attr("src",ada_cv_string_lr)
		.style("width","620px")
		.style("height","378px");

	d3.select(sel_prod_string).append('img')
		.attr("src",ada_prod_string)
		.style("width","620px")
		.style("height","378px");

};