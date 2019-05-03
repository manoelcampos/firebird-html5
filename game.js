let canvas, ctx;
let birds;

window.onload = function(){
  console.log("Iniciou");
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  //Cria um vetor para armazenar quantos pássaros quisermos
  birds = [];
  /*Cria uma constante que define aleatoriamente
  o total de pássaros a serem exibidos.
  A função Math.random() é que faz isso.
  Ela retorna um valor entre 0 e menor que 1. Se multiplicarmos
  por 10, teremos um valor entre 0 e 9.
  Para obter valores entre 1 e 10, basta somar 1.*/
  const total = Math.random()*10 + 1;

  //Executa um for que cria o total de pássaros definido na constante "total".
  for (var i = 0; i < total; i++) {
    //Armazena um novo pássaro na posição i do vetor birds.
    birds[i] = new GameImage();
    /*
    Define aleatoriamente as posições de destino x e y do pássaro.
    Como estamos multiplicando o valor aleatório de Math.random() pela largura do canvas (canvas.width),
    isto indica que, como a largura do canvas foi definida como 640 (no index.html),
    então geraremos um valor aleatório entre 0 e 640.
    O mesmo é feito para a posição y, baseada na altura do canvas.
    */
    birds[i].dx = Math.random()*canvas.width;
    birds[i].dy = Math.random()*canvas.height;
  }


  //Faz com que apenas o pássaro na posição 1 (o 2º), seja controlado utilizando as teclas a, d, w, s.
  birds[1].left = "a";
  birds[1].right = "d";
  birds[1].up = "w";
  birds[1].down = "s";

  setInterval(draw, 60);   
}

function draw(){
  ctx.fillStyle = "#0f9";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; i < birds.length; i++){
    birds[i].draw();
  }
}

window.onkeydown = function(event){
  for (var i = 0; i < birds.length; i++) {
    birds[i].onkeydown(event);
  }
}
