/*
Nesta versão, bird1 é o pássado que controlamos
e opponents é o vetor de pássaros oponentes que
desejamos matar.
*/
let bird1, opponents=[], canvas, ctx;
let background, backgroundX=0;


function iniciar(){
  let nome = document.getElementById('nome');
  if (nome.value == '') {
    window.alert('Digite seu nome'); 
    nome.focus();
    return false;
  }
 
  let idade = document.getElementById('idade');
  if (idade.value == '') {
    window.alert('Digite sua idade');
    idade.focus();
    return false;
  }

  if (idade.value < 18) {
    window.alert('Você não tem idade para jogar este jogo violento');
    return false;
  }

  document.getElementById('game').style = 'display: all';
  document.getElementById('dados').style = 'display: none';

  //Impede o form de ser de fato submetido, evitando o recarregamento da página.
  return false;
}

window.onload = function(){
  console.log("Iniciou");
  canvas = document.getElementById("gameCanvas");
  ctx = canvas.getContext("2d");

  bird1 = new GameImage();
  /*
  Queremos que ao iniciar o jogo, apareça uma quantidade
  aleatória de pássaros oponentes.
  Para isso, usamos a já conhecida função random da classe Math.
  Para lembrar, o random retorna um valor aleatório entre 0 e 1.
  Multiplicando por 6, obtemos um valor aleatório entre 0 e 5.
  Como a quantidade de oponentes não pode ser zero,
  somamos 1 ao resultado dessa multiplicação, obtendo
  valores entre 1 e 6.
  */
  let quant = Math.random()*6 + 1;
  /*Como agora temos um vetor de oponentes,
  precisamos de um for para criar os oponentes
  dentro do vetor.
  Veja que estamos definindo as posições x e y dos
  oponentes aleatoriamente.*/
  for(let i = 0; i < quant; i++){
    opponents[i] = new GameImage();
    opponents[i].dx = canvas.width * Math.random();
    opponents[i].dy = canvas.height * Math.random();
  }

  background = new Image();
  background.src = "background.png";

  setInterval(draw, 60);   
}

function draw(){
  if(opponents.length == 0){
    let nome = document.getElementById("nome");
    window.alert("Parabéns "+nome.value+". Você passou de fase.");
    window.location.reload();
    return;
  }
  ctx.fillStyle = "#0f9";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(background, backgroundX, 0);
  ctx.drawImage(background, background.width - Math.abs(backgroundX), 0);
  if (Math.abs(backgroundX) >= background.width){
    backgroundX = 0;
  }
  backgroundX -= 8;

  bird1.draw();
  /*
  Uma vez que criamos um vetor de oponentes, também
  precisamos de um for para desenhar cada um dos oponentes quando
  o jogo for desenhado.
  Veja que vamos desenha apenas os oponentes que não tiverem sido mortos.
  Lembre que a exclamação significa negação.
   */
  for (let i = 0; i < opponents.length; i++) {
      opponents[i].draw();
  }
}

window.onkeydown = function(event){
  bird1.onkeydown(event);
  if(event.key == ' '){
    let fireball = new Particle(bird1, opponents);
    fireball.draw();
  }
}


