var canvas = document.getElementById('gameCanvas');
var ctx = canvas.getContext('2d');

var x = 0;
var y = 10;
/* Define a velocidade em que o quadrado
se movimenta na tela. Se a velocidade for positiva,
ele vai pra direita, se for negativa vai pra esquerda. */
var speed = 5;

/**
 * Desenha um retângulo na tela.
 * 
 * @param x coordenada x (horizontal)
 * @param y coordenada y (vertical)
 * @param color cor do regângulo
 * @param width largura do retângulo
 * @param height algura do retângulo
 */
function desenhaRetangulo(x, y, color, width, height) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);  
}  

/**
 * Redesenha a tela do jogo infinitamente,
 * de acordo com o tempo definido na função
 * setInterval na última linha deste arquivo.
 * 
 * Esta função altera o valor da coordenada x,
 * fazendo com que o quadrado se movimento
 * horizontalmente.
 */
function desenha(){
    desenhaRetangulo(0, 0, "black", canvas.width, canvas.height);
    desenhaRetangulo(x, y, "red", 50, 50);

    if(x < 0 || x >= canvas.width){
        speed *= -1;
    }

    x += speed;
}


setInterval(desenha, 10);

