class GameImage {
    constructor(){
        this.left = "ArrowLeft";
        this.right = "ArrowRight";
        this.up = "ArrowUp";
        this.down = "ArrowDown";
        
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        
        this.speed = 10;

        this.img = new Image();
        this.img.src = "bird-sprite.png";

        this.sw = 120;
        this.sh = 80;

        this.sx = 0;
        this.sy = 0;

        this.dx = 0;
        this.dy = 20;
    }

    draw() {
        this.ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.sw, this.sh);

        this.move();
    }

    /**
     * Função que move o personagem na tela.
     */
    move() {
        this.sx += this.sw;

        this.dx += this.speed;

        if (this.sx < 0 || this.sx >= this.img.width) {
            this.sx = 0;
        }

        if (this.dx < 0 || this.dx >= this.canvas.width) {
            this.speed *= -1;
        }

        this.sy = this.speed > 0 ? 0 : this.sh;

        //console.log(`sx ${this.sx} sy ${this.sy} dx ${this.dx} sw ${this.sw} sh ${this.sh}`);
    }

    onkeydown(event) {
        const movement = Math.abs(this.speed);
        if (event.key == this.left) {
            this.speed = -movement;
        } else if (event.key == this.right) {
            this.speed = movement;
        }
        else if (event.key == this.up) {
            this.dy -= movement;
        } else if (event.key == this.down) {
            this.dy += movement;
        }

        //console.log(event.key + ": #" + event.keyCode + " speed: " + bird1.speed);
    }    
}