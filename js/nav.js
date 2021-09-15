const body = document.querySelector('body');
const burgerbutton = document.querySelector('#nav-hamburger');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const fadeElems = document.querySelectorAll('.has-fade');

burgerbutton.addEventListener('click',function(){

    if(header.classList.contains('open')){ //close hamburger menu
        header.classList.remove('open');
        body.classList.remove('.no-scroll');
        fadeElems.forEach(function(element){
            element.classList.remove('fade-in');
        element.classList.add('fade-out');
        })
        
    }
    else{//open hamburger menu
    body.classList.add('.no-scroll');
    header.classList.add('open');
    fadeElems.forEach(function(element){
        element.classList.remove('fade-out');
        element.classList.add('fade-in');
    });
    
    }
});
