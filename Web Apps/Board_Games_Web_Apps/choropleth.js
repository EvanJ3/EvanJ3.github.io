        var width = 800;
        var height = 500;

        

        var dropdown_box = d3.select("body").append("select")
        .attr('id','gameDropdown');

        var chart_div = d3.select("body").append("div")
            .attr("id","choropleth")
            .attr("class","chart-container");

        chart_div.append("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("id","choropleth");
        
        projection = d3.geoNaturalEarth1()
        projection.translate([width/2,height/2]).scale(175);
        //projection.fitExtent([[0, 0], [width, height]],world).scale([175]).translate([width/2,height/2]);

        path = d3.geoPath();
        path.projection(projection)

        
    function handleclick() {
            //var game_selection = this.text
            var game_selection = this.value
            d3.selectAll("svg > *").remove();
            d3.select("div#tooltip").remove();
            createMapAndLegend(world,gameData,game_selection)
            }

        

        

        var world = d3.json("world_countries.json");
        var gameData = d3.csv("ratings-by-country.csv",function(d){
            return {
                game_name: d.Game,
                country: d.Country,
                users: +d['Number of Users'],
                avg_rating: +d['Average Rating']
    }
});

        Promise.all([world,gameData]).then(function(values){
            gameData = values[1];
            world = values[0];
            default_color = "#999999";
            //color_gradient_list = ["#ffffb2","#fecc5c","#fd8d3c","#e31a1c"];
            color_gradient_list = ["#fee5d9","#fcae91","#fb6a4a","#cb181d"];
            ready('',world,gameData)
            
        });
        
        function ready(error, world, gameData) {
            
            var unique_games = get_unique_games(gameData);
            populate_dropdown(unique_games,dropdown_box);
            createMapAndLegend(world,gameData);
            

        }

        
        function createMapAndLegend(world,gameData,selectGame='6 nimmt!'){

            var chart_selection = d3.select("svg#choropleth");

            

            chart_selection.append('g')
            .attr('id','countries');

            var country_path_group = d3.select('#countries');

            chart_selection.append('g')
            .attr('id','legend')
            .attr("transform", "translate(10,300)");

            var chart_legend_group = d3.select('#legend');

            var selected_game_data = gameData.filter(function(d){return d.game_name == selectGame})
            
            var avg_rating_array = get_avg_rating_array(selected_game_data);
            var color_scale = d3.scaleQuantile()
                .range(color_gradient_list)
                .domain(avg_rating_array);
                //.domain([d3.min(selected_game_data, d => d.avg_rating),d3.max(selected_game_data, d => d.avg_rating)]);
            
            var game_country_dict = rating_dict(selected_game_data);
            var users_dict = get_country_user_dict(selected_game_data);



            var tip = d3.tip().attr('class', 'd3-tip').attr('id','tooltip').offset([10, -10]).html(function(d){ 
                let line_1 = "Country: " + d.properties.name;
                let line_2 = "Game: " + selectGame;
                let rates = game_country_dict[d.properties.name] || 'N/A'
                let line_3 = "average rating: " + rates;
                let users = users_dict[d.properties.name] || 'N/A'
                return '<b>Country:</b>'+ ' '+ d.properties.name+ '<br><b>Game:</b>'+ ' '+ selectGame + '<br><b>Avg Rating:</b>'+ ' ' + rates + '<br><b>Number of Users:</b>' + ' '+ users});
                //return '<span>'+ line_1 + '</span>'+'<br>'+ '<span>'+ line_2+ '</span>'+'<br>' + '<span>'+ line_3+ '</span>' +'<br>'+ '<span>'+ 'users ' +'</span>'+'<span>'+ users.toString() +'</span>'});


            chart_selection.call(tip)

            country_path_group.selectAll("path")
                .data(world.features)
                .enter()
                .append("path")
                .attr("fill",function(d){
                    return color_scale(game_country_dict[d.properties.name]) || default_color;
                })
                .attr("stroke","white")
                .attr("stroke-widhth","1")
                .attr("d",path)
                .attr("id",function(d){return d.properties.name})
                //.on("mouseover", function(d){tip.html(d); return tip.style("visibility", "visible");})
                
                //.on("mouseout", function(){return tip.style("visibility", "hidden");});
                .on('mouseover', tip.show)
                .on("mousemove", function(){return tip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");})
                .on('mouseout', tip.hide);
                
            
            /*for (let i=0;i<color_gradient_list.length;i++){

                chart_legend_group.append("circle")
                    .attr("r",2)
                    .attr("fill", color_gradient_list[i])
                    .attr("stroke", "none")
                    .attr("cx",width-35)
                    .attr("cy",100+(i*30));

                chart_legend_group.append("text")
                    .attr("text-anchor", "start")
                    .style("fill", "black")
                    .attr("x",width-30)
                    .attr("y",100+(i*30)+5)
                    .text(function(d){
                        let range = color_scale.invertExtent(color_gradient_list[i])
                        let top = range[1].toFixed(2).toString()
                        let bottom = range[0].toFixed(2).toString()
                        return bottom + ' to '+ top 
                    })
                    .style('font-size','5pt');
            }*/

            var legend = d3.legendColor()
                .labelFormat(d3.format(".2f"))
                //.useClass(true)
                .title("Avg. Rating")
                .titleWidth(100)
                .scale(color_scale);
            
            chart_legend_group.call(legend);

            
                
        }

        function get_unique_games(data){
            let output = []
            for (let i=0;i<data.length;i++){
                if (!(output.includes(data[i].game_name))){
                    output.push(data[i].game_name)
                };
            };
            output.sort()
            return output

        }

        function populate_dropdown(unique_games,selection){
            for (let i=0;i<unique_games.length;i++){
                selection.append('option')
                    .text(unique_games[i])
                    .attr('id',unique_games[i])
                    .attr('value',unique_games[i]);
                    //.on("click", handleclick);
            }
            selection.on('change', handleclick)
        }

        function rating_dict(data){
            let rating_dict = {}
            for (let i=0;i<data.length;i++){
                rating_dict[data[i].country] = data[i].avg_rating
            }
            return rating_dict
        }

        function get_min_max_counts(data){
            let min = 10.0;
            let max = 0.0;
            for (let i=0; i<data.length;i++){
                if (data[i].avg_rating < min){
                    min = data[i].avg_rating
                }

                if (data[i]>max){
                    max = data[i].avg_rating
                }
            }
            return [min,max]
        }

        function get_country_user_dict(data){
            let user_dict = {}
            for (let i=0;i<data.length;i++){
                user_dict[data[i].country] = data[i].users
            }
            return user_dict
        }
        function get_avg_rating_array(data){
            let output = []
            for (let i=0;i<data.length;i++){
                output.push(data[i].avg_rating)
            }
            return output
            //return output.sort(function(a, b){return a-b});
        };
