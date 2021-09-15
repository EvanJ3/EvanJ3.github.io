
class Mandelbrot {

    constructor(){

        
        this.initialize()
        

    };

    initialize() {
        this.window_height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        this.window_width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.navbar_height = document.querySelector('.header').offsetHeight;
        this.footer_height = document.querySelector('.footer-fixed-bottom').offsetHeight;
        this.canvas_height = (this.window_height - this.navbar_height - this.footer_height - 2);
        this.canvas_width = this.window_width;
        

        //this.x_start= -2.5;
        //this.x_stop = 1.0;
        //this.y_start = 1.0;
        //this.y_stop = 0.0;

        if (this.canvas_width%2 !== 0){
            this.canvas_width = this.canvas_width-1
        }
        if (this.canvas_height%2 !==0){
            this.canvas_height = this.canvas_height-1
        }

        this.canvas_container = document.querySelector('.canvas-container')
        this.canvas_container.style.width = this.canvas_width
        this.canvas_container.style.height = this.canvas_height

        
        this.x_start= -1.5;
        this.x_stop = 0.5;
        this.y_start = 1.5;
        this.y_stop = 0.0;

        if (this.canvas_width >= this.canvas_height + 200){
            this.x_start= -2.5;
            this.x_stop = 1.0;
            this.y_start = 1.0;
            this.y_stop = 0.0;
        }

        this.canvas = document.querySelector('canvas');
        this.canvas.width = this.canvas_width
        this.canvas.height = this.canvas_height
        this.ctx = this.canvas.getContext('2d');

        this.body_background_color = '#000019'; 
        this.canvas_background_color = 'rgb(101, 204, 255)';
        this.canvas_base_color = 'rgb(0, 0, 0)';

        this.ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);
        this.canvas.style.backgroundColor = this.canvas_background_color;
        document.body.style.background = this.body_background_color;
        this.ctx.clearRect(0, 0, this.canvas_width, this.canvas_height);
        this.ctx.fillStyle = this.canvas_base_color;
        this.ctx.fillRect(0,0, this.canvas_width, this.canvas_height);
        this.imageData = this.ctx.getImageData(0,0,this.canvas_width,this.canvas_height);
        this.total_canvas_size = this.canvas_height*this.canvas_width*4
        this.full_height_less_one = this.canvas_height-1
        this.canvas_height = this.canvas_height/2

        this.x_step = (this.x_stop - this.x_start) / (this.canvas_width-1);
        this.y_step = (this.y_stop - this.y_start) / (this.canvas_height-1);

        this.max_iteration = 20;
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
        this.render()

    };

    to_rgba(iteration,min_iter) {
        return [, , 17, 255 * Math.pow(0.985, iteration - min_iter)];
    };

    render = () => {
        const data = this.imageData.data;
        for (let i=0; i<this.points_array.length; i++){
            for (let j=0; j<this.points_array[0].length;j++){
                const [x,y,iteration,x0,y0] = this.points_array[i][j];
                if (iteration >= this.global_iteration && iteration < this.max_iteration){
                    if (x*x + y*y < 4){
                        this.points_array[i][j] = [(x*x) - (y*y) + x0, 2 * x * y + y0, iteration + 1, x0, y0];
                    }else{
                        const pos = (j*this.canvas_width+i)*4;
                        const pos2 = ((this.full_height_less_one-j)*this.canvas_width+i)*4;
                        data[pos+2] = 25;
                        data[pos+3] = 255 * 0.985**(this.global_iteration - this.min_iteration);
                        data[pos2+2] = 25;
                        data[pos2+3] = 255 * 0.985**(this.global_iteration - this.min_iteration);

                        
                    };
                };
            };
        };
        this.global_iteration ++;
        if (this.global_iteration < this.max_iteration){
            this.ctx.putImageData(this.imageData, 0, 0);
            requestAnimationFrame(this.render);
        }else{
            document.querySelector('#center-card').className = 'title-card'
            document.querySelector('#center-card').innerHTML = `<div class="name-title-container">
            <p class="name-title">Evan Jones</p>
        </div>
        <div class="description-container">
            <p class="description-content">Machine Learning Engineer | Computer Scientist | Data Analyst</p>
        </div>`
        }
    };

};

window.addEventListener('resize', function(event){
    document.querySelector('#center-card').className = ''
    document.querySelector('#center-card').innerHTML = ''
    run_mandelbrot.initialize()
});

window.addEventListener('orientationchange', function(event){
    document.querySelector('#center-card').className = ''
    document.querySelector('#center-card').innerHTML = ''
    run_mandelbrot.initialize()
});

const run_mandelbrot = new Mandelbrot();

