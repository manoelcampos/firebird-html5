/**
 * Variáveis iniciadas com s, como sx e sy representam
 * coordenadas ou dimensões de origim (source).
 * 
 * Variáveis iniciadas com d, como dx e dy representam
 * coordenadas ou dimensões de destino (destination).
 * 
 * x e y sabemos que representam coordenadas.
 * Assim, sx e sy são coordenadas de origem
 * e dx e dy são coordenadas de destino.
 * 
 * Variáveis terminadas com w e h representam,
 * respectivamente, largura (width) e altura (height).
 * Logo, sw e sh são largura e altura de origem,
 * enquanto dw dh são largura e altura de destino.
 */
var dx = 10;
var dy = 20;

var sx = 0;
var sy = 0;

var speed = 10;

var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");
var bird = new Image();
bird.src = "bird-sprite.png";

const sw = 120;
const sh = 80;

function desenhaRetangulo(x, y, color, width, height){
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height); 
}

function desenha(){
    desenhaRetangulo(0, 0, "#0f9", canvas.width, canvas.height);
    //desenhaRetangulo(x, y, "blue", 50, 50);

    //             img, sx, sy, sw, sh, dx, dy, dw, dh 
    ctx.drawImage(bird, sx, sy, sw, sh, dx, dy, sw, sh);
    
    dx += speed;
    sx += sw;
    if(sx >= bird.width){
        sx = 0;
    }

    if(speed > 0)
       sy = 0;
    else sy = sh;

    if (dx <= 0 || dx >= canvas.width) {
        speed *= -1;  // é mesmo que speed = speed * -1;
    }    
}

setInterval(desenha, 100);

/**
 * Em JavaScript, variáveis podem armazenar tanto valores
 * quanto funções. Isto é um recurso extremamente útil que poucas
 * linguagens de programação possuem.
 * Na linha abaixo, onkeydown é uma variável dentro do objeto
 * window (que representa a janela do navegador).
 * Como podem ver, estamos atribuindo uma função (function)
 * à variável window.onkeydown.
 * Em JavaScript, variáveis cujo nome iniciam com "on"
 * normalmente representam um evento.
 * O onkeydown representa o evento de pressionamento de uma tecla.
 * Utilizando JS podemos executar qualquer código que desejarmos
 * quando um determinado evento ocorrer.
 * Para isto, basta atribuirmos uma função à variável
 * que representa o evento, neste caso window.onkeydown.
 * Desta forma, o navegador irá executar tal função
 * para nós, sempre que o usuário pressionar uma tecla.
 * No entanto, a função a ser atribuída a um evento
 * normalmente precisa ter um único parâmetro
 * que conterá informações sobre o evento ocorrido.
 * O nome do parâmetro não importa, mas por conveção
 * chamados ele de event, como mostra o código abaixo.
 * 
 * Observe que estamos atribuindo uma função para 
 * ser chamada sempre que uma tecla for pressionada.
 * Tal função não precisa ter um nome,
 * pois nós não vamos manualmente incluir uma chamada a tal função
 * em nosso código. O navegador é que chamará tal função
 * para nós sempre que o usuário pressionar uma tecla.
 * Assim, ele guarda a função na variável onkeydown do objeto window.
 * 
 * Internamente, a função verifica qual seta foi pressionada no teclado
 * e altera as coordenadas x e y de destino (dx e dy)
 * ou a direção em que o pássaro está indo (speed).
 * Se speed for positiva, o pássaro voa pra direita,
 * se for negativa voa pra esquerda.
 */
window.onkeydown = function(event){
  //Obtém o valor absoluto da velocidade (sem o sinal)
  const increment = Math.abs(speed);

  //seta pra cima pressionada  
  if(event.key == "ArrowUp") {
      //faz o pássaro subir
      dy -= increment;
  } 
  //seta pra baixo pressionada  
  else if (event.key == "ArrowDown") {
      //faz o pássaro descer
      dy += increment; 
  } 
  //seta pra esquerda pressionada
  else if (event.key == "ArrowLeft") {
      //define um valor negativ pra speed, fazendo o pássaro voar pra esquerda
      speed = -increment;
  } 
  //seta pra direita pressionada  
  else if (event.key == "ArrowRight") {
      //define um valor positivo pra speed, fazendo o pássaro voar pra direita
      speed = increment;
  }

  /*
  Mostra informações sobre o evento ocorrido.
  O principal dado que nos interessa é o event.key, 
  que indica qual tecla foi pressionada.
  */
  console.log(event);
}