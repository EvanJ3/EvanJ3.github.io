function linspace(start, stop, num) {
    let step = (stop - start) / (num-1);
    return Array.from({length: num}, (_, i) => start + step * i);
};

function iteration_rgba(iteration,max_iter,min_iter){
    if (iteration == max_iter){
        return [0,0,0,255];
    }else{
        return [, , 17, 255 * Math.pow(0.985, iteration - min_iter)];
    }
};

//var window_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
//var window_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

//var navbar_height = document.querySelector('.header').offsetHeight;
//var footer_height = document.querySelector('.footer-fixed-bottom').offsetHeight;

//var canvas_height = (window_height - navbar_height - footer_height - 2);
//var canvas_width = window_width;

const canvas_height = 500;
const canvas_width = 500;

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");

canvas.width = canvas_width;
canvas.height = canvas_height;
ctx.clearRect(0, 0, canvas_width, canvas_height);

const mandelbrodt_min_x = -2.5;
const mandelbrodt_max_x = 1.0;
const mandelbrodt_min_y = -1.0;
const mandelbrodt_max_y = 1.0;

const viewsize = 1;
const left = 0;
const upper = 0;



const xcoords = linspace(start=mandelbrodt_min_x,stop=mandelbrodt_max_x,num=canvas_width);
const ycoords = linspace(start=mandelbrodt_min_y,stop=mandelbrodt_max_y,num=canvas_height);

const colorConfigs = {
    'dark_blue': {
        bodyBackground: '#020416',
        backgroundColor: '#6cf',
        baseColor: 'black',
        
        }
};



canvas.style.backgroundColor = '#6cf';
document.body.style.background = '#020416';
ctx.clearRect(0, 0, canvas_width, canvas_height);
ctx.fillStyle = 'black';
ctx.fillRect(0,0, canvas_width, canvas_height);

const max_iter = 15;
const min_iter = 0;
const imagedata = ctx.getImageData(0, 0, canvas_width, canvas_height);
var data = imagedata.data;

for(let j=0; j<canvas_height; j++) {
    var y0 = ycoords[j];
    for(let i=0; i<canvas_width; i++) {
        var x0 = xcoords[i];
        var x=x0;
        var y=y0;
        var iteration=0;
        while(x*x + y*y < 4.0 && iteration < max_iter){
            let xtemp = (x*x) - (y*y) + x0;
            let ytemp = 2 * x * y + y0;
            var x = xtemp;
            var y = ytemp;
            iteration ++;
        };
        
        var pos = (j*canvas_width+i)*4
        var cmap = iteration_rgba(iteration,max_iter,min_iter)
        cmap.forEach((elem, index) => {data[pos + index] = elem})
        
    };
    
};
ctx.putImageData(imagedata,0,0);









