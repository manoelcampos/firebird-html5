let bird1, bird2, canvas, ctx; 

window.onload = function(){
  console.log("Iniciou");
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  bird1 = new GameImage();
  bird2 = new GameImage();
  bird2.dx = canvas.width - bird2.sw;
  bird2.dy = canvas.height - bird2.sh - 20;
  setInterval(draw, 60);   
}

function draw(){
  ctx.fillStyle = "#0f9";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  bird1.draw();
  bird2.draw();
}

window.onkeydown = function(event){
  bird1.onkeydown(event);
}


