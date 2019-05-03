let bird1, opponents, canvas, ctx; 
let background, backgroundX=0;

window.onload = function(){
  console.log("Iniciou");
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  bird1 = new GameImage();
  opponents = [];
  let quant = Math.random()*6 + 1;
  for(i = 0; i < quant; i++){
    opponents[i] = new GameImage();
    opponents[i].dx = canvas.width * Math.random();
    opponents[i].dy = canvas.height * Math.random();
  }

  background = new Image();
  background.src = "background.png";

  setInterval(draw, 60);   
}

function draw(){
  ctx.fillStyle = "#0f9";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(background, backgroundX, 0);
  ctx.drawImage(background, background.width - Math.abs(backgroundX), 0);
  if (Math.abs(backgroundX) >= background.width){
    backgroundX = 0;
  }
  backgroundX -= 8;

  bird1.draw();
  for (i = 0; i < opponents.length; i++) {
    if(!opponents[i].killed){
      opponents[i].draw();
    }
  }
}

window.onkeydown = function(event){
  bird1.onkeydown(event);
  if(event.key == ' '){
    let fireball = new Particle(bird1, opponents);
    fireball.draw();
  }
}


