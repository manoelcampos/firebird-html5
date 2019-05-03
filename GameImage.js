class GameImage {
    constructor(){
        speed = 10;

        sw = 120;
        sh = 80;

        sx = 0;
        sy = 0;

        dx = 0;
        dy = 200;

        img = new Image();
        img.src = "bird-sprite.png";
        canvas = document.getElementById("gameCanvas");
        ctx = canvas.getContext("2d");        
    }

    draw() {
        ctx.fillStyle = "#0f9";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(img, sx, sy, sw, sh, dx, dy, sw, sh);
        move();
    }

    move() {
        sx += sw;
        sy = speed > 0 ? 0 : sh;
        dx += speed;
        if (sx < 0 || sx >= img.width) {
            sx = 0;
        }

        if (dx < 0 || dx >= canvas.width) {
            speed *= -1;
        }
    }    

}