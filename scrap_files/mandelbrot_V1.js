const size = 500
const canvas = document.querySelector('canvas')
canvas.width = size
canvas.height = size
const ctx = canvas.getContext('2d')

const colorConfigs = {
'deep ocean': {
    bodyBackground: '#020416',
    backgroundColor: '#6cf',
    baseColor: 'black',
    rgba:(Global_Iteration, Instance_Iteration) => [, , 17, 255 * Math.pow(0.985, Global_Iteration - Instance_Iteration)]
    }
}

class Mandelbrot {
    constructor() {
        this.left = -1.5
        this.top = -1
        this.viewSize = 2
        this.colorScheme = 'deep ocean'
        this.maxiter = 500
        this.miniter = 0
        this.Global_Iteration = 0
        this.setup()
        this.draw()
    }

    reset() {
        this.Global_Iteration = 0
        this.setup()
    }

    setup = () => {
        this.maxiter = 500
        this.Global_Iteration = 0
        this.miniter = 0
        this.colorConfig = colorConfigs[this.colorScheme]
        canvas.style.backgroundColor = this.colorConfig.backgroundColor || 'transparent'
        document.body.style.background = this.colorConfig.bodyBackground || 'black'
        ctx.clearRect(0, 0, size, size)
        if (this.colorConfig.baseColor) {
        ctx.fillStyle = this.colorConfig.baseColor
        ctx.fillRect(0, 0, size, size)
        }
        
        this.imageData = ctx.getImageData(0, 0, size, size)
        this._viewSize = this.viewSize
        this.c = []
        for (let i = 0; i < size; i++) {
        this.c[i] = []
            for (let j = 0; j < size; j++) {
                const x0 = i * this._viewSize / size + this.left
                const y0 = j * this._viewSize / size + this.top
                this.c[i][j] = [x0, y0, 0, x0, y0]
            }
        }
    };

    draw = () => {
        const data = this.imageData.data
        const rgba = this.colorConfig.rgba(this.Global_Iteration, this.miniter)
        console.log(this.Global_Iteration)
        console.log(this.miniter)
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const [x, y, iteration, x0, y0] = this.c[i][j]
                if (iteration >= this.Global_Iteration && iteration < this.maxiter) {
                    if (x * x + y * y < 4) {
                        this.c[i][j] = [(x*x) - (y*y) + x0, 2 * x * y + y0, iteration + 1, x0, y0]
                    } else {
                        const p = j * size * 4 + i * 4
                        rgba.forEach((e, i) => {data[p + i] = e})
                        
                    }
                }
            }
        }
        this.Global_Iteration ++
        if (this.Global_Iteration< this.maxiter){
            ctx.putImageData(this.imageData, 0, 0)
            requestAnimationFrame(this.draw)
        }else{
            delete this.imageData
            delete this.c
        }
        
        
    };
}

//creates the mandelbrodt object
const _ = new Mandelbrot()

//creates the initalized controlpanel with that js library
//const gui = new dat.GUI({ autoPlace: false })

//find our controller element div in the html doc
//const controller = document.getElementById('controller')

//append the new gui to the dom
//controller.appendChild(gui.domElement)

//
//gui.add(_, 'Global_Iteration').listen()

//gui.add(_, 'reset')

