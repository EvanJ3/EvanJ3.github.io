
function GenerateFictionBookCard(id,image_path,book_title,author_name,review_score,quote){
  var card_body = document.createElement('div')
  card_body.className = 'card'

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

var FictionBooks = d3.csv('./csv_files/Fiction_book_list.csv',function(data){
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
var max_page_items = 6;
var book_section = document.getElementById("all-fiction-card-container");

  for (let i=0;i<max_page_items;i++){
    let instance = FictionBooks[i]
    let author_name_i = '- ' + instance.author_first + ' ' + instance.author_last
    let quote_i = '"' + instance.quote + '"'
    let book_entry = GenerateFictionBookCard(instance.Book_ID,instance.image_path,instance.title,author_name_i,instance.review_score,quote_i)
    book_section.appendChild(book_entry)
  }

})
