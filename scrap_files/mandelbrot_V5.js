

class Mandelbrot {

    constructor(){

        this.x_start= -2.5;
        this.x_stop = 1.0;
        this.y_start = -1.0;
        this.y_stop = 1.0;
        this.initialize()
        this.render()

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

        this.x_step = (this.x_stop - this.x_start) / (this.canvas_width-1);
        this.y_step = (this.y_stop - this.y_start) / (this.canvas_height-1);

        this.max_iteration = 50;
        this.min_iteration = 0;
        this.global_iteration = 0;

        this.points_array = new Array(this.canvas_width);
        for(let i=0; i < this.canvas_width; i++){
            this.points_array[i] = new Array(5)
            
            for(let j=0; j < this.canvas_height; j++){
                let x_coord = this.x_start + (this.x_step * i);
                let y_coord = this.y_start + (this.y_step * j);
                this.points_array[i][j] = [x_coord,y_coord,0,x_coord,y_coord];
            };
        };

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