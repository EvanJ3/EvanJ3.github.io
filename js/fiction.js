current_page = 0;
transition_time = 500;
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function RightPagination(){
  var card_section = document.getElementById("all-fiction-card-container");
  FadeOutCards();
  await sleep(transition_time)
  card_section.innerHTML = ''
  current_page = current_page+1;
  if(current_page>max_page_index){
    current_page = 0
  }
  UpdateFictionPagination(paged_data)
}

async function LeftPagination(){
  var card_section = document.getElementById("all-fiction-card-container");
  FadeOutCards();
  await sleep(transition_time)
  card_section.innerHTML = ''
  current_page = current_page-1;
  if(current_page<0){
    current_page = max_page_index
  }
  UpdateFictionPagination(paged_data)
}



function FadeOutCards(){
  var card_section = document.getElementById("all-fiction-card-container");
  var card_children = card_section.children;
  for (let i=0;i<card_children.length;i++){
    let card_child_i = card_children[i]
    card_child_i.classList = 'card card-fade-out'
  }
}


function DetermineMaxPageItems(){
  var mobile_min_width = 450;

  var width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var max_page_items = 6; //default
  if(width<=mobile_min_width){
    max_page_items = 1;
  }

  return max_page_items
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


function UpdateFictionPagination(paged_data){
  var book_section = document.getElementById("all-fiction-card-container");
  var page_i_data = paged_data[current_page];
  var page_i_items = page_i_data.length;
  for(let i=0;i<page_i_items;i++){
    let instance = page_i_data[i]
    let author_name_i = '- ' + instance.author_first + ' ' + instance.author_last
    let quote_i = '"' + instance.quote + '"'
    let book_entry = GenerateFictionBookCard(instance.Book_ID,instance.image_path,instance.title,author_name_i,instance.review_score,quote_i)
    book_section.appendChild(book_entry)

  }
  }

function AddPaginationElements(){
  var pagination_container = document.getElementById("fiction-pagination-container");

  var next_left_arrow = document.createElement('img')
  next_left_arrow.className = 'pagination-left'
  next_left_arrow.src = './icons/next.png'

  next_left_arrow.addEventListener("click", LeftPagination); 
  
  var next_right_arrow = document.createElement('img')
  next_right_arrow.className = 'pagination-right'
  next_right_arrow.src = './icons/next.png'
  next_right_arrow.addEventListener("click", RightPagination);
  
  var pagination_text = document.createElement('p')
  pagination_text.className = 'pagination-text'
  pagination_text.innerHTML = 'View More'
  
  pagination_container.appendChild(next_left_arrow)
  pagination_container.appendChild(pagination_text)
  pagination_container.appendChild(next_right_arrow)
}

FictionBooks = d3.csv('./csv_files/Fiction_book_list.csv',function(data){
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
    max_page_items = DetermineMaxPageItems();
    paged_data = SplitPages(FictionBooks,max_page_items);
    max_page_index = paged_data.length -1;
    UpdateFictionPagination(paged_data);
    AddPaginationElements();
}

)




