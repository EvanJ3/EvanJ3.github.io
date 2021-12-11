


async function type_text(title_string='Hello World'){

  var blinker = document.createElement('span');
  blinker.innerHTML = '_';
  blinker.className = 'blinking-cursor';

  var description_node = document.querySelector('.description-content');
  description_node.appendChild(blinker);

  var split_title_string = title_string.split('');
  //console.log(split_title_string)
  for (let i = 0; i<split_title_string.length; i++){

    await sleep(1000)
    
    if (i==0){
      var current_page_text = description_node.innerHTML.split('<span class=\"blinking-cursor\">_/span>');
      current_page_text.unshift(title_string[i] + '!');
      console.log(current_page_text);
      description_node.innerHTML = current_page_text.join('!');
      console.log(description_node.innerHTML)

    }else{
      var current_page_text = description_node.innerHTML.split('!');
      console.log(current_page_text);
      console.log('------');
      current_page_text[0] = current_page_text[0] + split_title_string[i] + '!';
      
      console.log(current_page_text);
      description_node.innerHTML = current_page_text.join('!');


    }
    
    
  }

}

type_text()