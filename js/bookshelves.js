var current_fiction_page = 0;
var current_fav_fiction_page = 0;

var current_non_fiction_page = 0;
var current_fav_non_fiction_page = 0;

var current_textbook_page = 0;
var current_fav_textbook_page = 0;

var current_current_reads_page = 0;

var max_page_items = DetermineMaxPageItems();
var transition_time = 250;

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

async function RightFictionPagination(){
    var card_section = document.getElementById("all-fiction-card-container");
    var old_cards = card_section.children;
    
    current_fiction_page = current_fiction_page+1;
    if(current_fiction_page>fiction_max_page_index){
        current_fiction_page = 0
    }

    var new_fiction_cards = GenerateFictionCards(fiction_paged_data)
    var num_new_page_items = new_fiction_cards.length;
    var num_old_page_items = old_cards.length;

    if (num_old_page_items == num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_fiction_cards[i]);
        }
    }else if(num_old_page_items > num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_fiction_cards[i]);
        }
        for (let i=num_new_page_items;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(num_new_page_items);
            old_card_i.classList = 'card card-fade-out';
            old_card_i.remove();
        }

    }else{
        for (let i=0;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_fiction_cards[i]);
        }
        for (let i=num_old_page_items;i<num_new_page_items;i++){
            card_section.appendChild(new_fiction_cards[i])
        }
    }
}

async function LeftFictionPagination(){
    var card_section = document.getElementById("all-fiction-card-container");
    var old_cards = card_section.children;
    
    current_fiction_page = current_fiction_page-1;
    if(current_fiction_page<0){
        current_fiction_page = fiction_max_page_index;
    }

    var new_fiction_cards = GenerateFictionCards(fiction_paged_data)
    var num_new_page_items = new_fiction_cards.length;
    var num_old_page_items = old_cards.length;

    if (num_old_page_items == num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_fiction_cards[i]);
        }
    }else if(num_old_page_items > num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_fiction_cards[i]);
        }
        for (let i=num_new_page_items;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(num_new_page_items);
            old_card_i.classList = 'card card-fade-out';
            old_card_i.remove();
        }

    }else{
        for (let i=0;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_fiction_cards[i]);
        }
        for (let i=num_old_page_items;i<num_new_page_items;i++){
            card_section.appendChild(new_fiction_cards[i])
        }
    }
}


async function RightNonFictionPagination(){
    var card_section = document.getElementById("all-non-fiction-card-container");
    var old_cards = card_section.children;
    
    current_non_fiction_page = current_non_fiction_page+1;
    if(current_non_fiction_page>non_fiction_max_page_index){
        current_non_fiction_page = 0
    }

    var new_non_fiction_cards = GenerateNonFictionCards(non_fiction_paged_data)
    var num_new_page_items = new_non_fiction_cards.length;
    var num_old_page_items = old_cards.length;

    if (num_old_page_items == num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
    }else if(num_old_page_items > num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
        for (let i=num_new_page_items;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(num_new_page_items);
            old_card_i.classList = 'card card-fade-out';
            old_card_i.remove();
        }

    }else{
        for (let i=0;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
        for (let i=num_old_page_items;i<num_new_page_items;i++){
            card_section.appendChild(new_non_fiction_cards[i])
        }
    }
}

async function LeftNonFictionPagination(){
    var card_section = document.getElementById("all-non-fiction-card-container");
    var old_cards = card_section.children;
    
    current_non_fiction_page = current_non_fiction_page-1;
    if(current_non_fiction_page<0){
        current_non_fiction_page = non_fiction_max_page_index
    }

    var new_non_fiction_cards = GenerateNonFictionCards(non_fiction_paged_data)
    var num_new_page_items = new_non_fiction_cards.length;
    var num_old_page_items = old_cards.length;

    if (num_old_page_items == num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
    }else if(num_old_page_items > num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
        for (let i=num_new_page_items;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(num_new_page_items);
            old_card_i.classList = 'card card-fade-out';
            old_card_i.remove();
        }

    }else{
        for (let i=0;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
        for (let i=num_old_page_items;i<num_new_page_items;i++){
            card_section.appendChild(new_non_fiction_cards[i])
        }
    }
}

async function RightTextbookPagination(){
    var card_section = document.getElementById("all-textbook-card-container");
    var old_cards = card_section.children;
    
    current_textbook_page = current_textbook_page+1;
    if(current_textbook_page>textbook_max_page_index){
        current_textbook_page = 0
    }

    var new_non_fiction_cards = GenerateTextbookCards(textbook_paged_data)
    var num_new_page_items = new_non_fiction_cards.length;
    var num_old_page_items = old_cards.length;

    if (num_old_page_items == num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
    }else if(num_old_page_items > num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
        for (let i=num_new_page_items;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(num_new_page_items);
            old_card_i.classList = 'card card-fade-out';
            old_card_i.remove();
        }

    }else{
        for (let i=0;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
        for (let i=num_old_page_items;i<num_new_page_items;i++){
            card_section.appendChild(new_non_fiction_cards[i])
        }
    }
}

async function LeftTextbookPagination(){
    var card_section = document.getElementById("all-textbook-card-container");
    var old_cards = card_section.children;
    
    current_textbook_page = current_textbook_page-1;
    if(current_textbook_page<0){
        current_textbook_page = textbook_max_page_index
    }

    var new_non_fiction_cards = GenerateTextbookCards(textbook_paged_data)
    var num_new_page_items = new_non_fiction_cards.length;
    var num_old_page_items = old_cards.length;

    if (num_old_page_items == num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
    }else if(num_old_page_items > num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
        for (let i=num_new_page_items;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(num_new_page_items);
            old_card_i.classList = 'card card-fade-out';
            old_card_i.remove();
        }

    }else{
        for (let i=0;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
        for (let i=num_old_page_items;i<num_new_page_items;i++){
            card_section.appendChild(new_non_fiction_cards[i])
        }
    }
}

async function RightFavFictionPagination(){
    var card_section = document.getElementById("fav-fiction-card-container");
    var old_cards = card_section.children;
    
    current_fav_fiction_page = current_fav_fiction_page+1;
    if(current_fav_fiction_page>fav_fiction_max_page_index){
        current_fav_fiction_page = 0
    }

    var new_non_fiction_cards = GenerateFavFictionCards(fav_fiction_paged_data)
    var num_new_page_items = new_non_fiction_cards.length;
    var num_old_page_items = old_cards.length;

    if (num_old_page_items == num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
    }else if(num_old_page_items > num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
        for (let i=num_new_page_items;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(num_new_page_items);
            old_card_i.classList = 'card card-fade-out';
            old_card_i.remove();
        }

    }else{
        for (let i=0;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
        for (let i=num_old_page_items;i<num_new_page_items;i++){
            card_section.appendChild(new_non_fiction_cards[i])
        }
    }
}

async function LeftFavFictionPagination(){
    var card_section = document.getElementById("fav-fiction-card-container");
    var old_cards = card_section.children;
    
    current_fav_fiction_page = current_fav_fiction_page-1;
    if(current_fav_fiction_page<0){
        current_fav_fiction_page = fav_fiction_max_page_index
    }

    var new_non_fiction_cards = GenerateFavFictionCards(fav_fiction_paged_data)
    var num_new_page_items = new_non_fiction_cards.length;
    var num_old_page_items = old_cards.length;

    if (num_old_page_items == num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
    }else if(num_old_page_items > num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
        for (let i=num_new_page_items;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(num_new_page_items);
            old_card_i.classList = 'card card-fade-out';
            old_card_i.remove();
        }

    }else{
        for (let i=0;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
        for (let i=num_old_page_items;i<num_new_page_items;i++){
            card_section.appendChild(new_non_fiction_cards[i])
        }
    }
}

async function RightFavNonFictionPagination(){
    var card_section = document.getElementById("fav-non-fiction-card-container");
    var old_cards = card_section.children;
    
    current_fav_non_fiction_page = current_fav_non_fiction_page+1;
    if(current_fav_non_fiction_page>fav_non_fiction_max_page_index){
        current_fav_non_fiction_page = 0
    }

    var new_non_fiction_cards = GenerateFavNonFictionCards(fav_non_fiction_paged_data)
    var num_new_page_items = new_non_fiction_cards.length;
    var num_old_page_items = old_cards.length;

    if (num_old_page_items == num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
    }else if(num_old_page_items > num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
        for (let i=num_new_page_items;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(num_new_page_items);
            old_card_i.classList = 'card card-fade-out';
            old_card_i.remove();
        }

    }else{
        for (let i=0;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
        for (let i=num_old_page_items;i<num_new_page_items;i++){
            card_section.appendChild(new_non_fiction_cards[i])
        }
    }
}

async function LeftFavNonFictionPagination(){
    var card_section = document.getElementById("fav-non-fiction-card-container");
    var old_cards = card_section.children;
    
    current_fav_non_fiction_page = current_fav_non_fiction_page-1;
    if(current_fav_non_fiction_page<0){
        current_fav_non_fiction_page = fav_non_fiction_max_page_index
    }

    var new_non_fiction_cards = GenerateFavNonFictionCards(fav_non_fiction_paged_data)
    var num_new_page_items = new_non_fiction_cards.length;
    var num_old_page_items = old_cards.length;

    if (num_old_page_items == num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
    }else if(num_old_page_items > num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
        for (let i=num_new_page_items;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(num_new_page_items);
            old_card_i.classList = 'card card-fade-out';
            old_card_i.remove();
        }

    }else{
        for (let i=0;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
        for (let i=num_old_page_items;i<num_new_page_items;i++){
            card_section.appendChild(new_non_fiction_cards[i])
        }
    }
}

async function RightFavTextbookPagination(){
    var card_section = document.getElementById("fav-textbook-card-container");
    var old_cards = card_section.children;
    
    current_fav_textbook_page = current_fav_textbook_page+1;
    if(current_fav_textbook_page>fav_textbook_max_page_index){
        current_fav_textbook_page = 0
    }

    var new_non_fiction_cards = GenerateFavTextbookCards(fav_textbook_paged_data)
    var num_new_page_items = new_non_fiction_cards.length;
    var num_old_page_items = old_cards.length;

    if (num_old_page_items == num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
    }else if(num_old_page_items > num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
        for (let i=num_new_page_items;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(num_new_page_items);
            old_card_i.classList = 'card card-fade-out';
            old_card_i.remove();
        }

    }else{
        for (let i=0;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
        for (let i=num_old_page_items;i<num_new_page_items;i++){
            card_section.appendChild(new_non_fiction_cards[i])
        }
    }
}

async function LeftFavTextbookPagination(){
    var card_section = document.getElementById("fav-textbook-card-container");
    var old_cards = card_section.children;
    
    current_fav_textbook_page = current_fav_textbook_page-1;
    if(current_fav_textbook_page<0){
        current_fav_textbook_page = fav_textbook_max_page_index
    }

    var new_non_fiction_cards = GenerateFavTextbookCards(fav_textbook_paged_data)
    var num_new_page_items = new_non_fiction_cards.length;
    var num_old_page_items = old_cards.length;

    if (num_old_page_items == num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
    }else if(num_old_page_items > num_new_page_items){
        for (let i=0;i<num_new_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
        for (let i=num_new_page_items;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(num_new_page_items);
            old_card_i.classList = 'card card-fade-out';
            old_card_i.remove();
        }

    }else{
        for (let i=0;i<num_old_page_items;i++){
            let old_card_i = old_cards.item(i);
            old_card_i.classList = 'card card-fade-out';
            await sleep(transition_time);
            old_card_i.replaceWith(new_non_fiction_cards[i]);
        }
        for (let i=num_old_page_items;i<num_new_page_items;i++){
            card_section.appendChild(new_non_fiction_cards[i])
        }
    }
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

function GenerateFictionBookCard(id,image_path,book_title,author_name,review_score,quote){
    var card_body = document.createElement('div')
    card_body.className = 'card card-fade-in'

    var card_img = document.createElement('img')
    card_img.className = 'card-img'
    card_img.src = image_path
    card_body.appendChild(card_img)

    var card_title_container = document.createElement('div')
    card_title_container.className = 'card-title-container'

    var card_title = document.createElement('p')
    card_title.className = 'card-title'
    card_title.innerHTML = book_title

    card_title_container.appendChild(card_title)
    card_body.appendChild(card_title_container)

    var card_rating_container = document.createElement('div')
    card_rating_container.className = 'card-rating-container'

    var card_rating = document.createElement('p')
    card_rating.className = 'card-rating'

    var card_rating_counter = review_score;

    for(let i=0;i<5;i++){
        if(card_rating_counter >0){
        card_rating_counter --;
        let span_elem = document.createElement('span')
        span_elem.className = 'fa fa-star checked'
        card_rating.appendChild(span_elem)
        }else{
        let span_elem = document.createElement('span')
        span_elem.className = 'fa fa-star'
        card_rating.appendChild(span_elem)
        }

    }

    card_rating_container.appendChild(card_rating)
    card_body.appendChild(card_rating_container)

    var card_quote_container = document.createElement('div')
    card_quote_container.className = 'card-quote-container'
    
    var card_quote = document.createElement('p')
    card_quote.className = 'card-quote'
    card_quote.innerHTML = quote

    card_quote_container.appendChild(card_quote)
    card_body.appendChild(card_quote_container)

    var card_author_container = document.createElement('div')
    card_author_container.className = 'card-author-container'

    var card_author_title = document.createElement('p')
    card_author_title.className = 'card-author'
    card_author_title.innerHTML = author_name

    card_author_container.appendChild(card_author_title)
    card_body.appendChild(card_author_container)

    return card_body

}

function GenerateNonFictionBookCard(id,image_path,book_title,author_name,review_score,description){
    var card_body = document.createElement('div')
    card_body.className = 'card card-fade-in'

    var card_img = document.createElement('img')
    card_img.className = 'card-img'
    card_img.src = image_path
    card_body.appendChild(card_img)

    var card_title_container = document.createElement('div')
    card_title_container.className = 'card-title-container'

    var card_title = document.createElement('p')
    card_title.className = 'card-title'
    card_title.innerHTML = book_title

    card_title_container.appendChild(card_title)
    card_body.appendChild(card_title_container)

    var card_author_container = document.createElement('div')
    card_author_container.className = 'card-subtitle-container'

    var card_author_title = document.createElement('p')
    card_author_title.className = 'card-subtitle'
    card_author_title.innerHTML = author_name

    card_author_container.appendChild(card_author_title)
    card_body.appendChild(card_author_container)

    var card_rating_container = document.createElement('div')
    card_rating_container.className = 'card-rating-container'

    var card_rating = document.createElement('p')
    card_rating.className = 'card-rating'

    var card_rating_counter = review_score;

    for(let i=0;i<5;i++){
        if(card_rating_counter >0){
        card_rating_counter --;
        let span_elem = document.createElement('span')
        span_elem.className = 'fa fa-star checked'
        card_rating.appendChild(span_elem)
        }else{
        let span_elem = document.createElement('span')
        span_elem.className = 'fa fa-star'
        card_rating.appendChild(span_elem)
        }

    }

    card_rating_container.appendChild(card_rating)
    card_body.appendChild(card_rating_container)

    var card_description_container = document.createElement('div')
    card_description_container.className = 'card-text-container'
    
    var card_description = document.createElement('p')
    card_description.className = 'card-text'
    card_description.innerHTML = description

    card_description_container.appendChild(card_description)
    card_body.appendChild(card_description_container)

    return card_body

}

function GenerateFictionCards(data){
    let page_i_data = data[current_fiction_page];
    let page_i_items = page_i_data.length;
    var fiction_cards = [];
    for(let i=0;i<page_i_items;i++){
        let instance = page_i_data[i]
        let author_name_i = '- ' + instance.author_first + ' ' + instance.author_last
        let quote_i = '"' + instance.quote + '"'
        let book_entry = GenerateFictionBookCard(instance.Book_ID,instance.image_path,instance.title,author_name_i,instance.review_score,quote_i)
        fiction_cards.push(book_entry)
        }
    return fiction_cards
    }

function InitializeFiction(elem_array){
    var fiction_section = document.getElementById("all-fiction-card-container");
    
    for(let i=0;i<elem_array.length;i++){
        fiction_section.appendChild(elem_array[i])
    }
}

function InitializeNonFiction(elem_array){
    var non_fiction_section = document.getElementById("all-non-fiction-card-container");
    for(let i=0;i<elem_array.length;i++){
        non_fiction_section.appendChild(elem_array[i])
    }
}

function InitializeTextBooks(elem_array){
    var textbook_section = document.getElementById("all-textbook-card-container");
    for(let i=0;i<elem_array.length;i++){
        textbook_section.appendChild(elem_array[i])
    }
}

function InitializeFavFiction(elem_array){
    var fav_fiction_section = document.getElementById("fav-fiction-card-container");
    for(let i=0;i<elem_array.length;i++){
        fav_fiction_section.appendChild(elem_array[i])
    }
}

function InitializeFavNonFiction(elem_array){
    var fav_nonfiction_section = document.getElementById("fav-non-fiction-card-container");
    for(let i=0;i<elem_array.length;i++){
        fav_nonfiction_section.appendChild(elem_array[i])
    }
}

function InitializeFavTextBooks(elem_array){
    var fav_textbook_section = document.getElementById("fav-textbook-card-container");
    for(let i=0;i<elem_array.length;i++){
        fav_textbook_section.appendChild(elem_array[i])
    }
}

function GenerateNonFictionCards(data){
    let page_i_data = data[current_non_fiction_page];
    let page_i_items = page_i_data.length;
    var non_fiction_cards = [];
    for(let i=0;i<page_i_items;i++){
        let instance = page_i_data[i]
        let author_name_i = '- ' + instance.author_first + ' ' + instance.author_last
        let description_i = '"' + instance.description + '"'
        let book_entry = GenerateNonFictionBookCard(instance.Book_ID,instance.image_path,instance.title,author_name_i,instance.review_score,description_i)
        non_fiction_cards.push(book_entry)
        }
    return non_fiction_cards
    }


function GenerateTextbookCards(data){
    let page_i_data = data[current_textbook_page];
    let page_i_items = page_i_data.length;
    var non_fiction_cards = [];
    for(let i=0;i<page_i_items;i++){
        let instance = page_i_data[i]
        let author_name_i = '- ' + instance.author_first + ' ' + instance.author_last
        let description_i = '"' + instance.description + '"'
        let book_entry = GenerateNonFictionBookCard(instance.Book_ID,instance.image_path,instance.title,author_name_i,instance.review_score,description_i)
        non_fiction_cards.push(book_entry)
        }
    return non_fiction_cards
    }

function GenerateFavFictionCards(data){
    let page_i_data = data[current_fav_fiction_page];
    let page_i_items = page_i_data.length;
    var non_fiction_cards = [];
    for(let i=0;i<page_i_items;i++){
        let instance = page_i_data[i]
        let author_name_i = '- ' + instance.author_first + ' ' + instance.author_last
        let description_i = '"' + instance.description + '"'
        let book_entry = GenerateNonFictionBookCard(instance.Book_ID,instance.image_path,instance.title,author_name_i,instance.review_score,description_i)
        non_fiction_cards.push(book_entry)
        }
    return non_fiction_cards
    }

function GenerateFavNonFictionCards(data){
    let page_i_data = data[current_fav_non_fiction_page];
    let page_i_items = page_i_data.length;
    var non_fiction_cards = [];
    for(let i=0;i<page_i_items;i++){
        let instance = page_i_data[i]
        let author_name_i = '- ' + instance.author_first + ' ' + instance.author_last
        let description_i = '"' + instance.description + '"'
        let book_entry = GenerateNonFictionBookCard(instance.Book_ID,instance.image_path,instance.title,author_name_i,instance.review_score,description_i)
        non_fiction_cards.push(book_entry)
        }
    return non_fiction_cards
    }

function GenerateFavTextbookCards(data){
    let page_i_data = data[current_fav_textbook_page];
    let page_i_items = page_i_data.length;
    var non_fiction_cards = [];
    for(let i=0;i<page_i_items;i++){
        let instance = page_i_data[i]
        let author_name_i = '- ' + instance.author_first + ' ' + instance.author_last
        let description_i = '"' + instance.description + '"'
        let book_entry = GenerateNonFictionBookCard(instance.Book_ID,instance.image_path,instance.title,author_name_i,instance.review_score,description_i)
        non_fiction_cards.push(book_entry)
        }
    return non_fiction_cards
    }

function AddPaginationElements(page_type){

    let next_left_arrow = document.createElement('img')
    next_left_arrow.className = 'pagination-left'
    next_left_arrow.src = './icons/next.png'
    
    let next_right_arrow = document.createElement('img')
    next_right_arrow.className = 'pagination-right'
    next_right_arrow.src = './icons/next.png'
    
    let pagination_text = document.createElement('p')
    pagination_text.className = 'pagination-text'
    pagination_text.innerHTML = 'View More'

    if (page_type == 'fiction'){
        var pagination_container = document.getElementById("fiction-pagination-container");
        next_right_arrow.addEventListener("click", RightFictionPagination);
        next_left_arrow.addEventListener("click", LeftFictionPagination);
    }else if(page_type == 'nonfiction'){
        var pagination_container = document.getElementById("non-fiction-pagination-container");
        next_right_arrow.addEventListener("click", RightNonFictionPagination);
        next_left_arrow.addEventListener("click", LeftNonFictionPagination);
    }else if(page_type == 'textbook'){
        var pagination_container = document.getElementById("textbook-pagination-container");
        next_right_arrow.addEventListener("click", RightTextbookPagination);
        next_left_arrow.addEventListener("click", LeftTextbookPagination);
    }else if(page_type == 'fav-fiction'){
        var pagination_container = document.getElementById("fav-fiction-pagination-container");
        next_right_arrow.addEventListener("click", RightFavFictionPagination);
        next_left_arrow.addEventListener("click", LeftFavFictionPagination);
    }else if(page_type == 'fav-non-fiction'){
        var pagination_container = document.getElementById("fav-non-fiction-pagination-container");
        next_right_arrow.addEventListener("click", RightFavNonFictionPagination);
        next_left_arrow.addEventListener("click", LeftFavNonFictionPagination);
    }else if(page_type == 'fav-textbook'){
        var pagination_container = document.getElementById("fav-textbook-pagination-container");
        next_right_arrow.addEventListener("click", RightFavTextbookPagination);
        next_left_arrow.addEventListener("click", LeftFavTextbookPagination);
    }
    
    pagination_container.appendChild(next_left_arrow)
    pagination_container.appendChild(pagination_text)
    pagination_container.appendChild(next_right_arrow)
    }


FictionBooks = d3.csv('./csv/Bookshelf_csv/Fiction_book_list.csv',function(data){
	return {
    id: data.Book_ID ,
	title: data.Title,
	author_first: data.Author_First,
	author_last: data.Author_Last,
    image_path: data.Image_Path,
    review_score: data.Review_Score,
    quote:data.Quote
	}
}).then(function(FictionBooks){
    fiction_paged_data = SplitPages(FictionBooks,max_page_items);
    fiction_max_page_index = fiction_paged_data.length -1;
    var fiction_elements = GenerateFictionCards(fiction_paged_data);
    InitializeFiction(fiction_elements)
    AddPaginationElements('fiction');
}

)

NonFictionBooks = d3.csv('./csv/Bookshelf_csv/Non_Fiction_book_list.csv',function(data){
	return {
    id: data.Book_ID ,
	title: data.Title,
	author_first: data.Author_First,
	author_last: data.Author_Last,
    image_path: data.Image_Path,
    review_score: data.Review_Score,
    description:data.Description
	}
}).then(function(NonFictionBooks){
    non_fiction_paged_data = SplitPages(NonFictionBooks,max_page_items);
    non_fiction_max_page_index = non_fiction_paged_data.length -1;
    var non_fiction_elements = GenerateNonFictionCards(non_fiction_paged_data);
    InitializeNonFiction(non_fiction_elements);
    AddPaginationElements('nonfiction');
}

)

TextBooks = d3.csv('./csv/Bookshelf_csv/Textbook_list.csv',function(data){
	return {
    id: data.Book_ID ,
	title: data.Title,
	author_first: data.Author_First,
	author_last: data.Author_Last,
    image_path: data.Image_Path,
    review_score: data.Review_Score,
    description:data.Description
	}
}).then(function(TextBooks){
    textbook_paged_data = SplitPages(TextBooks,max_page_items);
    textbook_max_page_index = textbook_paged_data.length -1;
    var textbook_elements = GenerateTextbookCards(textbook_paged_data);
    InitializeTextBooks(textbook_elements);
    AddPaginationElements('textbook');
}

)

FavFiction = d3.csv('./csv/Bookshelf_csv/Favorite_Fiction.csv',function(data){
	return {
    id: data.Book_ID ,
	title: data.Title,
	author_first: data.Author_First,
	author_last: data.Author_Last,
    image_path: data.Image_Path,
    review_score: data.Review_Score,
    description:data.Description
	}
}).then(function(FavFiction){
    fav_fiction_paged_data = SplitPages(FavFiction,max_page_items);
    fav_fiction_max_page_index = fav_fiction_paged_data.length -1;
    var fav_fiction_elements = GenerateFavFictionCards(fav_fiction_paged_data);
    InitializeFavFiction(fav_fiction_elements);
    AddPaginationElements('fav-fiction');
}

)

FavNonFiction = d3.csv('./csv/Bookshelf_csv/Favorite_Non_Fiction.csv',function(data){
	return {
    id: data.Book_ID ,
	title: data.Title,
	author_first: data.Author_First,
	author_last: data.Author_Last,
    image_path: data.Image_Path,
    review_score: data.Review_Score,
    description:data.Description
	}
}).then(function(FavNonFiction){
    fav_non_fiction_paged_data = SplitPages(FavNonFiction,max_page_items);
    fav_non_fiction_max_page_index = fav_non_fiction_paged_data.length -1;
    var fav_non_fiction_elements = GenerateFavNonFictionCards(fav_non_fiction_paged_data);
    InitializeFavNonFiction(fav_non_fiction_elements);
    AddPaginationElements('fav-non-fiction');
}

)

FavTextbook = d3.csv('./csv/Bookshelf_csv/Favorite_Textbook.csv',function(data){
	return {
    id: data.Book_ID ,
	title: data.Title,
	author_first: data.Author_First,
	author_last: data.Author_Last,
    image_path: data.Image_Path,
    review_score: data.Review_Score,
    description:data.Description
	}
}).then(function(FavTextbook){
    fav_textbook_paged_data = SplitPages(FavTextbook,max_page_items);
    fav_textbook_max_page_index = fav_textbook_paged_data.length -1;
    var fav_textbook_elements = GenerateFavTextbookCards(fav_textbook_paged_data);
    InitializeFavTextBooks(fav_textbook_elements);
    AddPaginationElements('fav-textbook');
}

)

