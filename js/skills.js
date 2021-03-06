
function GenerateSkills(){
    var window_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    var window_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var MinHeight = 700;
    var MinWidth = 1000;
    GenerateSkillTables()
    if (window_height < MinHeight|| window_width < MinWidth){
        GenerateSkillTables();
    }else{
        GenerateSkillBubbles();
    }

};


function GenerateSkillBubbles(){
    var SkillBubbleSection = document.getElementById('skill-visual-container');
    SkillBubbleSection.innerHTML = ''
    var SkillBubleSVGHTML = `
    <div class="skill-bubble-container">
    <svg class="skills-svg"></svg>
    <svg class="legend-svg"></svg>
    </div>`
    SkillBubbleSection.innerHTML = SkillBubleSVGHTML;

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
        
        var legend_width = 100;
        var legend_height = h;
        var legend_x_margin = 10;
        var circle_legend_margin = 10;
        

        var legend_svg = d3.select('.legend-svg')
                        .attr('width',legend_width)
                        .attr('height',legend_height);

        legend_svg.append('text')
            .text('Skill Type')
            .attr('x', legend_width/2)
            .attr('y', 45)
            .attr("font-family","sans-serif")
            .attr("font-size","16px")
            .attr("fill","black");
        


    
        var radius_scale_factor = 10;
    
        var nodes = test_nodes.map(function(data) {
            category_dict = create_catagory_dict(test_nodes);
            return {
                radius: data.Skill_Level*radius_scale_factor,
                category: category_dict[data.Skill_Type],
                name: data.Skill_Name,
                
            }
        });

        var categories_array = Object.keys(category_dict);
        var legend_circle_margin = Math.floor(legend_height/(categories_array.length+3));
        for (let i=0;i<categories_array.length;i++){
            legend_svg.append('circle')
                .attr('r',5)
                .style('fill',colorScale[i])
                .attr('cx', legend_x_margin)
                .attr('cy', 50+legend_circle_margin*(i+1));

            legend_svg.append('text')
                .text(categories_array[i])
                .attr('x', legend_x_margin + circle_legend_margin)
                .attr('y', (50+legend_circle_margin*(i+1))+4)
                .attr("font-family","sans-serif")
                .attr("font-size","14px")
                .attr("fill","black");

            
        }
        legend_svg.attr('width',220);
    
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
        .force('charge', d3.forceManyBody().strength(.5))
        .force("boundary", forceBoundary(0,0,w, h).strength(.25))
        .force('collision', d3.forceCollide().radius(function(d) {return d.radius;}).strength(.6))
        .force('link',d3.forceLink().links(attracting_edges).id(function(d){return d.name}).strength(.5))
        .on('tick', ticked);
    
        function ticked() {
            var circles = d3.select('.skills-svg')
                .attr('width',w)
                .attr('height',h)
                .selectAll('circle')
                .data(nodes)
                .join('circle')
                .attr('r', function(d) {return d.radius;})
                .style('fill', function(d) {return colorScale[d.category];})
                .attr('cx', function(d) {return d.x;})
                .attr('cy', function(d) {return d.y;})
        
            var text_data = d3.select('.skills-svg')
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
    
                
        };
    
    });
    

}






function GenerateSkillTables(){

    var SkillTableSection = document.getElementById('skill-visual-container');
    SkillTableSection.innerHTML = ''
    var table_id_names = ['Programming','MachineLearning','Webdev','Other'];
    var table_inner_html_array = [];
    
    var ProgrammingTableHTML = `<div class="table-container">
                    <table id="skill" >
                        <tr>
                        <th colspan="3">Programming</th>
                        </tr>
                        <tr>
                        <td>Python
                            <div class="skill-bar" style="width: calc(5 / 5* 75%);"></div>
                        </td>
                        <td>
                            Matlab
                            <div class="skill-bar" style="width: calc(4 / 5* 75%);"></div>
                        </td>
                        <td>Javascript
                            <div class="skill-bar" style="width: calc(4 / 5* 75%);"></div>
                        </td>
                        
                        </tr>
                        <tr>
                        <td>Mathematica
                            <div class="skill-bar" style="width: calc(3 / 5* 75%);"></div>
                        </td>
                        <td>R
                            <div class="skill-bar" style="width: calc(4 / 5* 75%);"></div>
                        </td>
                        <td>C++
                            <div class="skill-bar" style="width: calc(2 / 5* 75%);"></div>
                        </td>
                        </tr>
                        <tr>
                        <td>Php
                            <div class="skill-bar" style="width: calc(2 / 5* 75%);"></div>
                        </td>
                        <td>SQL
                            <div class="skill-bar" style="width: calc(4 / 5* 75%);"></div>
                        </td>
                        </tr>
                        
                        
                    </table>
                </div>`

    var MachineLearningTableHTML = `<div class="table-container">
                    <table id="skill">
                        <tr>
                        <th colspan="3">Machine Learning</th>
                        </tr>
                        <tr>
                        <td>Tensorflow
                            <div class="skill-bar" style="width: calc(5 / 5* 75%);"></div>
                        </td>
                        <td>
                            Pytorch
                            <div class="skill-bar" style="width: calc(5 / 5* 75%);"></div>
                        </td>
                        <td>
                            NumPy
                            <div class="skill-bar" style="width: calc(5 / 5* 75%);"></div>
                        </td>
                        </tr>
                        <tr>
                        <td>Sklearn
                            <div class="skill-bar" style="width: calc(5 / 5* 75%);"></div>
                        </td>
                        <td>Keras
                            <div class="skill-bar" style="width: calc(5 / 5* 75%);"></div>
                        </td>
                        <td>SciPy
                            <div class="skill-bar" style="width: calc(4 / 5* 75%);"></div>
                        </td>
                        </tr>
                        <tr>
                        <td>Hadoop
                            <div class="skill-bar" style="width: calc(3 / 5* 75%);"></div>
                        </td>
                        <td>
                            Spark
                            <div class="skill-bar" style="width: calc(3 / 5* 75%);"></div>
                        </td>
                        <td>Pig
                            <div class="skill-bar" style="width: calc(3 / 5* 75%);"></div>
                        </td>
                        </tr>
                        
                        </td>
                        <td>AWS
                            <div class="skill-bar" style="width: calc(3 / 5* 75%);"></div>
                        </td>
                        <td>Azure
                            <div class="skill-bar" style="width: calc(3 / 5* 75%);"></div>
                        </td>
                        <td>GC
                            <div class="skill-bar" style="width: calc(3 / 5* 75%);"></div>
                        </td>
                        
                        </tr>
                    </table>
                </div>`

    var WebDevTableHTML = `<div class="table-container">
                    <table id="skill">
                        <tr>
                        <th colspan="2">Web Devlopment</th>
                        
                        </tr>
                        <tr>
                        <td>Django
                            <div class="skill-bar" style="width: calc(4 / 5* 75%);"></div>
                        </td>
                        <td>
                            Flask
                            <div class="skill-bar" style="width: calc(4 / 5* 75%);"></div>
                        </td>
                        </tr>
                        <tr>
                        <td>Bootstrap
                            <div class="skill-bar" style="width: calc(4 / 5* 75%);"></div>
                        </td>
                        <td>jQuery
                            <div class="skill-bar" style="width: calc(3 / 5* 75%);"></div>
                        </td>
                        </tr>
                        <tr>
                        <td>Scss/Css
                            <div class="skill-bar" style="width: calc(4 / 5* 75%);"></div>
                        </td>
                        <td>HTML
                            <div class="skill-bar" style="width: calc(5 / 5* 75%);"></div>
                        </td>
                        </tr>
                        
                        <tr>
                        <td>D3
                            <div class="skill-bar" style="width: calc(4 / 5* 75%);"></div>
                        </td>
                        </tr>
                        
                    </table>
                </div>`

    var OtherSkillTableHTML = `<div class="table-container">
                    <table id="skill">
                        <tr>
                        <th colspan="2">Other</th>
                        </tr>
                        <tr>
                        <td>Jupyter
                            <div class="skill-bar" style="width: calc(5 / 5* 75%);"></div>
                        </td>
                        <td>
                            LaTeX
                            <div class="skill-bar" style="width: calc(4 / 5* 75%);"></div>
                        </td>
                        </tr>
                        <tr>
                        <td>OpenRefine
                            <div class="skill-bar" style="width: calc(4 / 5* 75%);"></div>
                        </td>
                        <td>Docker
                            <div class="skill-bar" style="width: calc(4 / 5* 75%);"></div>
                        </td>
                        </tr>
                        <tr>
                        <td>Powershell
                            <div class="skill-bar" style="width: calc(2 / 5* 75%);"></div>
                        </td>
                        <td>Git
                            <div class="skill-bar" style="width: calc(3 / 5* 75%);"></div>
                        </td>
                        </tr>
                        <tr>
                        <td>Looker
                            <div class="skill-bar" style="width: calc(2 / 5* 75%);"></div>
                        </td>
                        <td>Tableau
                            <div class="skill-bar" style="width: calc(3 / 5* 75%);"></div>
                        </td>
                        </tr>
                        <tr>
                        <td>Matplotlib
                            <div class="skill-bar" style="width: calc(4 / 5* 75%);"></div>
                        </td>
                        <td>Tensorboard
                            <div class="skill-bar" style="width: calc(4 / 5* 75%);"></div>
                        </td>
                        </tr>

                        
                    </table>
                </div>`

    table_inner_html_array.push(ProgrammingTableHTML)
    table_inner_html_array.push(MachineLearningTableHTML)
    table_inner_html_array.push(WebDevTableHTML)
    table_inner_html_array.push(OtherSkillTableHTML)

    for (let i=0;i<table_id_names.length;i++){
        let table_i = document.createElement('div');
        table_i.className = 'table-container'
        table_i.id = table_id_names[i];
        table_i.innerHTML = table_inner_html_array[i];
        SkillTableSection.appendChild(table_i);
        
    }
}

GenerateSkills()


window.addEventListener('resize', function(event){
    GenerateSkills()
});
