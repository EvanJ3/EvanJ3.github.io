

class Mandelbrot {

    constructor(){

        this.mandelbrodt_min_x = -2.5;
        this.mandelbrodt_max_x = 1.0;
        this.mandelbrodt_min_y = -1.0;
        this.mandelbrodt_max_y = 1.0;
        this.initialize()
        this.render()

    };

    linspace(start, stop, num) {
        let step = (stop - start) / (num-1);
        return Array.from({length: num}, (_, i) => start + step * i);
    };

    initialize() {
        this.window_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        this.window_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.navbar_height = document.querySelector('.header').offsetHeight;
        this.footer_height = document.querySelector('.footer-fixed-bottom').offsetHeight;
        this.canvas_height = (this.window_height - this.navbar_height - this.footer_height - 2);
        this.canvas_width = this.window_width;
        //this.canvas_height = 50;
        //this.canvas_width = 50;
        this.canvas = document.querySelector('canvas');
        this.canvas.width = this.canvas_width
        this.canvas.height = this.canvas_height
        this.ctx = this.canvas.getContext('2d');

        this.body_background_color = '#020416'; 
        this.canvas_background_color = '#6cf';
        this.canvas_base_color = 'black';

        this.ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);
        this.canvas.style.backgroundColor = this.canvas_background_color;
        document.body.style.background = this.body_background_color;
        this.ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);
        this.ctx.fillStyle = this.canvas_base_color;
        this.ctx.fillRect(0,0, this.canvas_width, this.canvas_height);
        this.imageData = this.ctx.getImageData(0,0,this.canvas_width,this.canvas_height);


        this.xcoords = this.linspace(this.mandelbrodt_min_x,this.mandelbrodt_max_x,this.canvas_width);
        this.ycoords = this.linspace(this.mandelbrodt_min_y,this.mandelbrodt_max_y,this.canvas_height);
        this.max_iteration = 50;
        this.min_iteration = 0;
        this.global_iteration = 0;

        this.points_array = new Array(this.xcoords.length);
        for(let i=0; i < this.xcoords.length; i++){
            this.points_array[i] = new Array(5)
            for(let j=0; j < this.ycoords.length; j++){
                this.points_array[i][j] = [this.xcoords[i],this.ycoords[j],0,this.xcoords[i],this.ycoords[j]];
            };
        };
        delete this.xcoords;
        delete this.ycoords;

    };

    to_rgba(iteration,min_iter) {
        return [, , 17, 255 * Math.pow(0.985, iteration - min_iter)];
    };

    render = () => {
        const data = this.imageData.data;
        const cmap = this.to_rgba(this.global_iteration,this.min_iteration);
        for (let i=0; i<this.canvas_width; i++){
            for (let j=0; j<this.canvas_height;j++){
                const [x,y,iteration,x0,y0] = this.points_array[i][j];
                if (iteration >= this.global_iteration && iteration < this.max_iteration){
                    if (x*x + y*y < 4){
                        this.points_array[i][j] = [(x*x) - (y*y) + x0, 2 * x * y + y0, iteration + 1, x0, y0];
                    }else{
                        const pos = (j*this.canvas_width+i)*4;
                        cmap.forEach((elem, index) => {data[pos + index] = elem})
                    };
                };
            };
        };
        this.global_iteration ++;
        if (this.global_iteration < this.max_iteration){
            this.ctx.putImageData(this.imageData, 0, 0);
            requestAnimationFrame(this.render);
        }
    };

};

const run_mandelbrot = new Mandelbrot()