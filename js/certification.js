max_page_items = DetermineMaxPageItems();
transition_time = 250;
current_certification_page_num = 0;


function DetermineMaxPageItems(){
    var mobile_min_width = 450;
    var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var max_page_items = 3; //default
    if(width<=mobile_min_width){
        max_page_items = 1;
    }
    return max_page_items
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
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
        page_counter ++; 
        }

        page_array[page_counter].push(data[j])
    }
    return page_array
}

async function LeftCertificationPagination(){
    
    current_certification_page_num = current_certification_page_num-1;
    if(current_certification_page_num<0){
        current_certification_page_num = max_num_pages
    }
    var card_section = document.getElementById('certification-section')
    var card_container = document.getElementById('certification-card-container');
    var old_cards = card_section.getElementsByClassName('card');
    var new_cards = GenerateCertificatePageCards(paged_data[current_certification_page_num]);
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
            card_container.appendChild(new_cards[i]);
            await sleep(transition_time);
        }
    }
    
}

async function RightCertificationPagination(){

    current_certification_page_num = current_certification_page_num+1;
    if(current_certification_page_num>max_num_pages){
        current_certification_page_num = 0
    }
    var card_section = document.getElementById('certification-section')
    var card_container = document.getElementById('certification-card-container');
    var old_cards = card_section.getElementsByClassName('card');
    var new_cards = GenerateCertificatePageCards(paged_data[current_certification_page_num]);
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
            card_container.appendChild(new_cards[i]);
            await sleep(transition_time);
        }
    }
}

function GenerateCertificationCard(data){

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
    card_title.innerHTML = data.title;

    card_title_container.appendChild(card_title);
    card_body.appendChild(card_title_container);
    
    var card_description_container = document.createElement('div');
    card_description_container.className = 'card-text-container';
    
    var card_description = document.createElement('p');
    card_description.className = 'card-text';
    card_description.innerHTML = data.description;

    card_description_container.appendChild(card_description);
    card_body.appendChild(card_description_container);

    var card_button_container = document.createElement('div');
    card_button_container.className = 'card-button-container';

    var card_ciriculum_button = document.createElement('button');
    card_ciriculum_button.className = 'card-button'
    card_ciriculum_button.innerHTML = 'Curriculum'

    var card_certificate_button = document.createElement('button');
    card_certificate_button.className = 'card-button'
    card_certificate_button.innerHTML = 'Certificate'
    
    var card_certificate_button_link = document.createElement('a');
    card_certificate_button_link.href = data.certificate_path
    card_certificate_button_link.target = "_blank"
    card_certificate_button_link.rel = "noopener noreferrer"

    var card_ciriculum_button_link = document.createElement('a');
    card_ciriculum_button_link.href = data.ciriculum_path
    card_ciriculum_button_link.target = "_blank"
    card_ciriculum_button_link.rel = "noopener noreferrer"

    card_ciriculum_button_link.appendChild(card_ciriculum_button)
    card_certificate_button_link.appendChild(card_certificate_button)
    card_button_container.appendChild(card_ciriculum_button_link)
    card_button_container.appendChild(card_certificate_button_link)
    card_body.appendChild(card_button_container)

    return card_body
}

function GenerateCertificatePageCards(card_page_data){
    var output = [];
    for (let i=0;i<card_page_data.length;i++){
        output.push(GenerateCertificationCard(card_page_data[i]))
    }
    return output
}

function GenerateAllCertificationPageCards(paged_data){
    var output = [];
    for (let i=0;i<paged_data.length;i++){
        output.push(GenerateCertificatePageCards(paged_data[i]))
    }
    return output
}

function AppendSectionSwipeEventListener(card_container){
    card_container.addEventListener("swiped-right",RightCertificationPagination)
    card_container.addEventListener("swiped-left", LeftCertificationPagination)
}

function InitializePageCards(cards){
    var card_section = document.getElementById('certification-card-container');
    for(let i=0;i<cards[0].length;i++){
        card_section.appendChild(cards[0][i])
    }
}

function AppendPaginationElements(pagination_container){
    

    var next_left_arrow = document.createElement('img')
    next_left_arrow.className = 'pagination-left'
    next_left_arrow.src= './icons/arrow-left-circle.svg'
    next_left_arrow.addEventListener("click", LeftCertificationPagination);
    

    var next_right_arrow = document.createElement('img')
    next_right_arrow.className = 'pagination-right'
    next_right_arrow.src = './icons/arrow-right-circle.svg'
    next_right_arrow.addEventListener("click", RightCertificationPagination);

    var pagination_text = document.createElement('p')
    pagination_text.className = 'pagination-text'
    pagination_text.innerHTML = 'View More'

    pagination_container.appendChild(next_left_arrow)
    pagination_container.appendChild(pagination_text)
    pagination_container.appendChild(next_right_arrow)
    
}

CertificationData = d3.csv('./csv/Certification_csv/Certification_Data.csv',function(data){
	return {
	title: data.Title,
    image_path: data.Image_Path,
    ciriculum_path: data.Ciriculum_Path,
    certificate_path: data.Certificate_Path,
    description:data.Description
	}
}).then(function(CertificationData){
    paged_data = SplitPages(CertificationData,max_page_items);
    max_num_pages = paged_data.length -1;
    paged_cards = GenerateAllCertificationPageCards(paged_data);
    InitializePageCards(paged_cards);
    pagination_container = document.getElementById('certification-pagination-container');
    AppendPaginationElements(pagination_container);
    certification_card_container = document.getElementById('certification-card-container');
    AppendSectionSwipeEventListener(certification_card_container);

})