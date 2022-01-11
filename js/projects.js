
max_page_items = DetermineMaxPageItems();
transition_time = 250;


function DetermineMaxPageItems(){
    var mobile_min_width = 450;
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var max_page_items = 3; //default
    if(width<=mobile_min_width){
        max_page_items = 1;
    }
    return max_page_items
}

function GetUniqueCategories(data){
    var categories = [];
    for (let i=0;i<data.length;i++){
        categories.push(data[i].category)
    }
    var unique_categories = [...new Set(categories)];
    return unique_categories
}

function SplitProjectCategoryData(data){
    var unique_categories = GetUniqueCategories(data)
    var output = [];
    for (let i=0;i<unique_categories.length;i++){
        output.push([]);
    }
    for (let i=0;i<data.length;i++){
        let entry_i = data[i];
        let cat_idx_i = unique_categories.indexOf(data[i].category);
        output[cat_idx_i].push(entry_i);
    }
    return output
}



function SplitPages(data,max_page_items){
    var total_items = data.length;
    var total_pages = Math.ceil(total_items/max_page_items);
    var page_array = [];
    var page_counter = 0;
    var page_item_counter = -1; 
    for (let i=0;i<total_pages;i++){
        let page_i = [];
        page_array.push(page_i)
    }

    for (let j=0;j<total_items;j++){
        page_item_counter++;
        if (page_item_counter == max_page_items){
            page_item_counter = 0;
            page_counter++; 
            }

        page_array[page_counter].push(data[j])
    }
    return page_array
}

function SplitProjectPages(data,max_page_items){
    var output = [];
    for (let i=0;i<data.length;i++){
        let output_i = SplitPages(data[i],max_page_items);
        output.push(output_i)
    }
    return output

}

function InitializeCurrentPageArray(category_array){
    var output = [];
    for (let i=0;i<category_array.length;i++){
        output.push(0)
    }
    return output
}

function GenerateProjectCard(data){

    var card_body = document.createElement('div');
    card_body.className = 'card card-fade-in';

    var card_img = document.createElement('img');
    card_img.className = 'card-img';
    card_img.src = data.image_path;
    card_body.appendChild(card_img);

    var card_title_container = document.createElement('div');
    card_title_container.className = 'card-title-container';

    var card_title = document.createElement('p');
    card_title.className = 'card-title';
    card_title.innerHTML = data.name;

    card_title_container.appendChild(card_title);
    card_body.appendChild(card_title_container);

    var card_tag_container = document.createElement('div');
    card_tag_container.className = 'card-tag-container';

    var card_tag_array = data.tags.split('-');
    for (let i=0;i<card_tag_array.length;i++){
        let button_i = document.createElement('button');
        button_i.className = "card-tag";
        button_i.innerHTML = card_tag_array[i];
        card_tag_container.appendChild(button_i);
    }

    card_body.appendChild(card_tag_container);
    
    var card_description_container = document.createElement('div');
    card_description_container.className = 'card-text-container';
    
    var card_description = document.createElement('p');
    card_description.className = 'card-text';
    card_description.innerHTML = data.description;

    card_description_container.appendChild(card_description);
    card_body.appendChild(card_description_container);

    return card_body
}

function GenerateCategoryPageCards(category_page_data){
    var output = [];
    for (let i=0;i<category_page_data.length;i++){
        output.push(GenerateProjectCard(category_page_data[i]))
    }
    return output
}

function GetCategoryPageData(data,current_page_array){
    var output = [];
    for(let i=0;i<current_page_array.length;i++){
        output.push(data[i][current_page_array[i]])
    }
    return output
}

function GenerateAllProjectCards(data){
    var output = [];
    for(let i=0;i<data.length;i++){
        let output_i = GenerateCategoryPageCards(data[i]);
        output.push(output_i);
    }
    return output
}

function UniqueCategoriesToSectionNames(unique_categories){
    var output = [];
    for (let i=0;i<unique_categories.length;i++){
        let output_i = unique_categories[i].replaceAll(' ','-');
        let output_i_joined = output_i.concat('-Section');
        output.push(output_i_joined)
    }
    return output
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function GetSectionCardContainers(section_names_array){
    var output = [];

    for (let i=0;i<section_names_array.length;i++){
        let section_i = document.getElementById(section_names_array[i]);
        let card_container_i = section_i.getElementsByClassName('card-container');
        output.push(card_container_i)
    }
    return output
}

function AppendProjectCards(card_containers,project_cards){

    for(let i=0;i<card_containers.length;i++){
        var container_i = card_containers[i].item(0);
        var project_cards_section_i = project_cards[i];
        for (let j=0;j<project_cards_section_i.length;j++){
            container_i.appendChild(project_cards_section_i[j])
        }

    }

}

function AddMobileSectionEventListeners(card_containers){
    for(let i=0;i<card_containers.length;i++){
        let container_i = card_containers[i].item(0);
        container_i.addEventListener("swiped-right",RightProjectSwipePagination)
        container_i.addEventListener("swiped-left",LeftProjectSwipePagination)
    }
}

function GetSectionPaginationContainers(project_section_ids){
    var output = [];

    for (let i=0;i<project_section_ids.length;i++){
        let section_i = document.getElementById(project_section_ids[i]);
        let pagination_container_i = section_i.getElementsByClassName('pagination-container');
        output.push(pagination_container_i)
    }
    return output
}

function GetMaxPageNums(project_paged_data_array){
    var output = [];
    for (let i=0;i<project_paged_data_array.length;i++){
        let cat_i_data = project_paged_data_array[i]
        output.push(cat_i_data.length - 1)
    }
    return output

}

function AppendPaginationElements(pagination_containers){
    for (let i=0;i<pagination_containers.length;i++){
        let pagination_container_i = pagination_containers[i].item(0)
        let next_left_arrow = document.createElement('img')
        next_left_arrow.className = 'pagination-left'
        next_left_arrow.src= './icons/arrow-left-circle.svg'
        next_left_arrow.addEventListener("click", LeftProjectPagination);
        
    
        let next_right_arrow = document.createElement('img')
        next_right_arrow.className = 'pagination-right'
        next_right_arrow.src = './icons/arrow-right-circle.svg'
        next_right_arrow.addEventListener("click", RightProjectPagination);
    
        let pagination_text = document.createElement('p')
        pagination_text.className = 'pagination-text'
        pagination_text.innerHTML = 'View More'

        pagination_container_i.appendChild(next_left_arrow)
        pagination_container_i.appendChild(pagination_text)
        pagination_container_i.appendChild(next_right_arrow)
    }
}

async function LeftProjectSwipePagination(event){
    var paginated_section_name =event.currentTarget.parentNode.id;
    var paginated_section_index = project_section_ids.indexOf(paginated_section_name);
    var cur_page = current_page_array[paginated_section_index]
    var section_max_page = max_pages_by_cat[paginated_section_index]
    cur_page = cur_page-1;
    if(cur_page<0){
        cur_page = section_max_page
    }

    if (cur_page != current_page_array[paginated_section_index]){
    current_page_array[paginated_section_index] = cur_page;
    var card_section = document.getElementById(paginated_section_name);
    var card_container = card_section.getElementsByClassName('card-container');
    var old_cards = card_section.getElementsByClassName('card');
    var category_page_data_new = project_paged_data_array[paginated_section_index][current_page_array[paginated_section_index]]
    var new_cards = GenerateCategoryPageCards(category_page_data_new);
    var num_new_page_items = new_cards.length;
    var num_old_page_items = old_cards.length;

    if (num_old_page_items == num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_cards[i]);
        }
    }else if(num_old_page_items > num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_cards[i]);
        }
        for (let i=num_new_page_items;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(num_new_page_items);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.remove();
        }

    }else{
        for (let i=0;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_cards[i]);
        }
        for (let i=num_old_page_items;i<num_new_page_items;i++){
            card_container.item(0).appendChild(new_cards[i]);
            await sleep(transition_time);
        }
    }
    }
    
}

async function RightProjectSwipePagination(event){
    var paginated_section_name =event.currentTarget.parentNode.id;
    var paginated_section_index = project_section_ids.indexOf(paginated_section_name);
    var cur_page = current_page_array[paginated_section_index]
    var section_max_page = max_pages_by_cat[paginated_section_index]

    cur_page = cur_page+1;
    if(cur_page>section_max_page){
        cur_page = 0
    }

    if (cur_page != current_page_array[paginated_section_index]){
    current_page_array[paginated_section_index] = cur_page;
    var card_section = document.getElementById(paginated_section_name);
    var card_container = card_section.getElementsByClassName('card-container');
    var old_cards = card_section.getElementsByClassName('card');
    var category_page_data_new = project_paged_data_array[paginated_section_index][current_page_array[paginated_section_index]]
    var new_cards = GenerateCategoryPageCards(category_page_data_new);
    var num_new_page_items = new_cards.length;
    var num_old_page_items = old_cards.length;

    if (num_old_page_items == num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_cards[i]);
        }
    }else if(num_old_page_items > num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_cards[i]);
        }
        for (let i=num_new_page_items;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(num_new_page_items);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.remove();
        }

    }else{
        for (let i=0;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_cards[i]);
        }
        for (let i=num_old_page_items;i<num_new_page_items;i++){
            card_container.item(0).appendChild(new_cards[i]);
            await sleep(transition_time);
        }
    }
    }

}

async function LeftProjectPagination(event){
    var paginated_section_name =event.currentTarget.parentNode.parentNode.id;
    var paginated_section_index = project_section_ids.indexOf(paginated_section_name);
    var cur_page = current_page_array[paginated_section_index]
    var section_max_page = max_pages_by_cat[paginated_section_index]
    cur_page = cur_page-1;
    if(cur_page<0){
        cur_page = section_max_page
    }

    if (cur_page != current_page_array[paginated_section_index]){
    current_page_array[paginated_section_index] = cur_page;
    var card_section = document.getElementById(paginated_section_name);
    var card_container = card_section.getElementsByClassName('card-container');
    var old_cards = card_section.getElementsByClassName('card');
    var category_page_data_new = project_paged_data_array[paginated_section_index][current_page_array[paginated_section_index]]
    var new_cards = GenerateCategoryPageCards(category_page_data_new);
    var num_new_page_items = new_cards.length;
    var num_old_page_items = old_cards.length;

    if (num_old_page_items == num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_cards[i]);
        }
    }else if(num_old_page_items > num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_cards[i]);
        }
        for (let i=num_new_page_items;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(num_new_page_items);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.remove();
        }

    }else{
        for (let i=0;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_cards[i]);
        }
        for (let i=num_old_page_items;i<num_new_page_items;i++){
            card_container.item(0).appendChild(new_cards[i]);
            await sleep(transition_time);
        }
    }
    }
    
}

async function RightProjectPagination(event){
    var paginated_section_name =event.currentTarget.parentNode.parentNode.id;
    var paginated_section_index = project_section_ids.indexOf(paginated_section_name);
    var cur_page = current_page_array[paginated_section_index]
    var section_max_page = max_pages_by_cat[paginated_section_index]

    cur_page = cur_page+1;
    if(cur_page>section_max_page){
        cur_page = 0
    }

    if (cur_page != current_page_array[paginated_section_index]){
    current_page_array[paginated_section_index] = cur_page;
    var card_section = document.getElementById(paginated_section_name);
    var card_container = card_section.getElementsByClassName('card-container');
    var old_cards = card_section.getElementsByClassName('card');
    var category_page_data_new = project_paged_data_array[paginated_section_index][current_page_array[paginated_section_index]]
    var new_cards = GenerateCategoryPageCards(category_page_data_new);
    var num_new_page_items = new_cards.length;
    var num_old_page_items = old_cards.length;

    if (num_old_page_items == num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_cards[i]);
        }
    }else if(num_old_page_items > num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_cards[i]);
        }
        for (let i=num_new_page_items;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(num_new_page_items);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.remove();
        }

    }else{
        for (let i=0;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_cards[i]);
        }
        for (let i=num_old_page_items;i<num_new_page_items;i++){
            card_container.item(0).appendChild(new_cards[i]);
            await sleep(transition_time);
        }
    }
    }

}

ProjectData = d3.csv('./csv/Projects_csv/Project_Data.csv',function(data){
	return {
    category: data.Project_Category ,
	name: data.Project_Name,
    image_path: data.Project_Image_Path,
    tags: data.Project_Tags,
    link:data.Project_Link,
    description: data.Project_Description
	}
}).then(function(ProjectData){
    var unique_categories = GetUniqueCategories(ProjectData);
    project_section_ids = UniqueCategoriesToSectionNames(unique_categories);
    current_page_array = InitializeCurrentPageArray(unique_categories);
    project_category_data_array = SplitProjectCategoryData(ProjectData);
    project_paged_data_array = SplitProjectPages(project_category_data_array,max_page_items);
    max_pages_by_cat = GetMaxPageNums(project_paged_data_array);
    project_page_data = GetCategoryPageData(project_paged_data_array,current_page_array);
    var project_cards = GenerateAllProjectCards(project_page_data);
    card_containers = GetSectionCardContainers(project_section_ids);
    AddMobileSectionEventListeners(card_containers)
    pagination_containers = GetSectionPaginationContainers(project_section_ids);
    AppendProjectCards(card_containers,project_cards);
    AppendPaginationElements(pagination_containers);
}

)
