/* Área de destino a ser desenhada. */
var canvas;

//Objeto que permite desenhar no canvas
var ctx;

/*Velocidade em que o personagem se move.
Se for positiva, faz o personagem mover pra direita.
Se for negativa, faz mover pra esquerda.*/
var speed = 10;

/*
Largura (width) e altura (height) do personagem no sprite
Um sprite é um arquivo de imagem contendo um personagem em várias posições.
Para obter este valores, é preciso ir na pasta onde está o arquivo de imagem
a ser usado para desenhar o personagem (no caso o pássaro)
e pressionar ALT+ENTER sobre o arquivo para ver as propriedades do mesmo.
Na tela que aparece, é exibida a largura e altura da imagem como
480 x 160. Como temos 4 pássaros por linha, cada pássado tem 120 (480/4) pixels
de largura. Como são duas linhas de pássaros no arquivo, a altura de cada pássaro
é 80 (160/2).
*/
const sw = 120;
const sh = 80;

/* Posições na área dentro do sprite de onde será obtido o personagem para desenhar no canvas.
São coordenadas de origem (source)*/
var sx = 0;
var sy = 0;

/* Posições na área no canvas onde será desenhado o personagem obtido do sprite.
São coordenadas de destino (destination)*/
var dx = 0;
var dy = 200;

//Imagem do personagem obtida do sprite que será desenhada no canvas
var img = new Image();
img.src = "bird-sprite.png";
canvas = document.getElementById("gameCanvas");
ctx = canvas.getContext("2d");
setInterval(draw, 66);

/**
 * Desenha toda a tela do jogo, incluindo o pássaro.
 */
function draw() {
  ctx.fillStyle = "#0f9";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  /* 
  A função drawImge do objeto ctx desenha uma imagem na tela.
  Tal imagem deve ter sido previamente criada e definida o endereço
  do arquivo que será exibido.

  A linha abaixo desenha um dos pássaros contidos no arquivo contendo múltiplos pássaros.
  Os parâmetros desta versão da função que estamos usando solicita 9 parâmetros.
  Como queremos desenhar apenas um dos pássaros contidos dentro da imagem
  com os vários pássaros, precisamos então indicar os valores para estes parâmetros como:
  - img: imagem a ser desenhada, contendo o pássaro em diferentes poses
  - sx: coordenada x de origem (source x), de onde o pássaro de dentro da imagem será obtido
  - sy: coordenada y de origem (source y), de onde o pássaro de dentro da imagem será obtido
  - sw: largura de um pássaro dentro do arquivo (source width)
  - sh: altura de um pássaro dentro do arquivo (source height)
  - dx: coordenada x de destino (destination x), onde o pássaro será desenhado na tela
  - dy: coordenada y de destino (destination y), onde o pássaro será desenhado na tela
  - dw: largura do pássaro a ser desenhado na tela (destination width)
  - dh: altura do pássaro a ser desenhado na tela (destination height). 
    No caso destes dois últimos parâmetros, observe que a largura e altura
    que o pássaro será desenhado na tela serão as mesmas que o pássaro 
    tem dentro do arquivo. Ou seja, o pássaro será desenhado na tela
    sem alterar o seu tamanho. Por isso usamos as variáveis sw e sh
    (que representam largura e altura de origem, dentro do arquivo)
    para definir a largura e altura de destino (na tela).
    Se alterarmos estes valores, podemos aumentar o diminuir
    o tamanho do pássaro na tela.
    Por exemplo, utilizando sw*2 e sh*2 nestes dois últimos parâmetros, 
    estaremos desenhando o pássaro com o dobro do tamanho original.
  */
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, sw, sh);

  /*Chama a função que faz os personagens do jogo se movimentarem 
  (neste caso, somente o pássaro)*/
  move();
}

/**
 * Altera os valores das variáveis que definem a posição e direção do pássaro,
 * fazendo ele se mover pela tela.
 * 
 * Foi criada uma função diferente apenas para separar o código que desenha 
 * os elemntos da tela do jogo do código que move personagens como o pássaro.
 */
function move() {
  /*
  Define a posição x da área do sprite que será desenhada no canvas.
  Esta é a posição x de origem. Como a largura de cada pássaro é definida
  na constante sw, sabemos que o próximo pássaro dentro da imagem
  está 120 pixels à frente (120 é o valor de sw).
  Assim, ao incrementar a variável sx (source x) com a largura
  de cada pássaro, estaremos obtendo a coordenada x do próximo pássaro 
  dentro da image.
  */
  sx += sw;

  /*
  Define a posição y da área do sprite que será desenhada no canvas.
  O sx e sy apenas define o ponto inicial dentro da imagem a partir
  do qual um pássaro será obtido. Estas são apenas duas das informações
  necessárias para desenhar um daqueles pássaros na tela.

  Se a velocidade é positiva, o personagem está movendo pra direita,
  logo, deve-se pegar imagens da 1ª linha do sprite.
  Se ela for negativa, o personagem está movendo para a esquerda,
  logo, deve-se pegar imagens da 2ª linha do sprite.
  A coordenada y dos pássaros na 1ª linha é zero (estão no topo dentro da imagem).
  O início da segunda linha de imagens (com o personagem indo da esquerda
  pra direta) é determinado pela altura da imagem do personagem no sprite.
  
  Assim, se a speed for positiva (indicando que o pássaro está indo pra direita),
  obtemos os pássaros da coordenada y igual a 0 (1ª linha no arquivo).
  
  Se a speed for negativa (indicando que o pássaro está indo pra esquerda),
  obtemos os pássaros da coordenada y igual a 80 (que é o valor de sh,
  que define a altura de cada pássaro). Assim, a coordenada y dos pássaros
  a ser obtidos será 80, indicando os pássaros da 2ª linha no arquivo.*/
  sy = speed > 0 ? 0 : sh;

  /*
  Faz o personagem mover horizontalmente no canvas (na tela).
  Se speed for positiva, ele move pra direita, se negativa move pra esquerda.
  Lembre que dx é a posição x de destino (onde o pássaro vai aparecer na tela).
  */
  dx += speed;

  /* Se a posição x da área dentro do sprite estiver fora da margem esquerda
  ou for maior ou igual a posição onde começa a última imagem em cada linha do sprite,
  então o personagem já foram desenhadas todas as imagens daquela linha
  no sprite e precisamos reiniciar da primeira imagem. */
  if (sx < 0 || sx >= img.width) {
    sx = 0;
  }

  /*Se o personagem chegou em uma das bordas da tela, inverte a velocidade para
  passar a mover para o outro lado.*/
  if (dx < 0 || dx >= canvas.width) {
    speed *= -1;
  }
}
