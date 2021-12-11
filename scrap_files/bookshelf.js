
function GenerateBookCard(book_title='A Gentleman In Moscow',author_name='Amor Towles',quote='',image_path='images/Moscow_4.jpg',review='nothing'){
  var card_div = document.createElement('div')
  card_div.className = 'card'
  card_div.id = 'card-1'
  var image_element = document.createElement('img')
  image_element.className = 'card-img'
  image_element.src = image_path
  image_element.alt = book_title
  card_div.appendChild(image_element)

  var card_body_element = document.createElement('div')
  card_body_element.className = 'card-body'
  card_body_element.id = 'card-body-1'

  var card_title = document.createElement('h5')
  card_title.className = 'card-title'
  card_title.innerText = book_title

  var card_detail = document.createElement('p')
  card_detail.className = 'card-text'
  var card_quote = quote + '\n \n' + '- ' + author_name + ', ' + book_title
  card_detail.innerText = card_quote

  if (review !== ''){
  var card_button = document.createElement('button')
  card_button.className = 'book-review-button'
  //note to self button doesn't have href attribute need to add an "a" element
  card_button.href = '#'
  card_button.innerText = 'See More'
  }
  
  card_body_element.appendChild(card_title)
  card_body_element.appendChild(card_detail)

  if (review !== ''){
  card_body_element.appendChild(card_button)
  }
  
  card_div.appendChild(card_body_element)
  return card_div
}


/*function GenerateBookshelf(){
  var book_section = document.createElement('section')
  book_section.id = 'Bookshelf-Section'

  var book_container = document.createElement('div')
  book_container.className = 'bookshelf-container'
  

  var book_grid = document.createElement('div')
  book_grid.className = 'bookshelf-grid'
  

  for(j=0; j<15 ; ++j)
  {
    var book_col = document.createElement('div')
    book_col.className = 'col'
    book_col.id = 'book-' + j.toString()
    book_entry = GenerateBookCard()
    book_col.appendChild(book_entry)
    book_grid.appendChild(book_col)
  } 

  book_container.appendChild(book_grid)
  book_section.appendChild(book_container)
  document.body.appendChild(book_section)
}*/

//GenerateBookshelf()
var books = d3.csv('./csv_files/books.csv',function(data){
	return {
		title: data.Title,
		author_first: data.Author_First,
		author_last: data.Author_Last,
    image_path: data.Image_Path,
	}
}).then(function(books){


  var book_section = document.createElement('section')
  book_section.id = 'Bookshelf-Section'

  var book_container = document.createElement('div')
  book_container.className = 'bookshelf-container'
  

  var book_grid = document.createElement('div')
  book_grid.className = 'bookshelf-grid'


  for (i=0;i<books.length;i++){
    instance = books[i]
    instance_author_name = books[i].author_first.concat(' '.concat(books[i].author_last))
    var book_col = document.createElement('div')
    book_col.className = 'col'
    book_col.id = 'book-' + i.toString()
    book_entry = GenerateBookCard(book_title=instance.title,author_name=instance_author_name,quote='',image_path=books[i].image_path,review='nothing')
    book_col.appendChild(book_entry)
    book_grid.appendChild(book_col)
  }
  book_container.appendChild(book_grid)
  book_section.appendChild(book_container)
  document.body.appendChild(book_section)

})

$('.card').hover(function(){
  $(this).css('box-shadow','0 0 20px rgba(33,33,33,.2)')},function(){
$(this).css('box-shadow','none')})