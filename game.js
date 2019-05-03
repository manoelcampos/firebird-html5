/* Todo o código que permite tornar a página HTML
dinâmica e torná-la interativa está neste arquivo .js

O código JS se comunica com a página HTML, fazendo 
acesso às tags que desejarmos, que foram definidas lá na página.
*/

/*
O objeto document possui várias funções que nos permitem acessar e manipular
os elementos (tags) na página HTML.

Para acesar uma determinada tag que tenha um determinado id, 
utilizamos o comando document.getElementById(id),
onde id é o valor definido no atributo id da tag que desejamos acessar.
Neste caso, estamos querendo acessar a tag <canvas>, que definimos o id
como gameCanvas.

Para podermos acessar a tag <canvas>, precisamos que uma variável no códiog
JS armazena uma referência para ela. Assim, utilizamos a palavra reservada var
para criar a variável chamada canvas (que poderia ter qualquer nome, usou-se canvas
apenas por simplificação).

Observe que variáveis em JS não tem um tipo, somente um tipo.
O tipo é definido de acordo com o valor que é armazenado na variável.

Canvas signfica tela. Ele é como uma tela de pintura que um artista usa
para pintar quadros. Em JS, a tela é o monitor e o pintor somos nós desenvolvedores.
*/
var canvas = document.getElementById("gameCanvas");

/*Depois de termos obtido acesso à tag <canvas> no HTML
e armazenado ela na variável canvas acima,
devemos obter um contexto do canvas.
O contexto é que de fato usaremos para desenhar o jogo.
Como criaremos jogos em 2 dimensões (2D), indicamos que
queremos obter um contexto 2D.
Assim, em um contexto 2D, conseguiremos desenhar objetos de
duas dimensões como círculos ou retângulos. Mas não conseguiremos
criar objetos de 3 dimensões como esferas ou cubos.

A variável ctx vai então nos permitir desenhar no canvas.
*/
var ctx = canvas.getContext("2d");

/* Para começarmos a desenhar no canvas utilizando contexto (variável ctx),
devemos primeiro definir a cor da tinta que usaremos (assim como faz um pintor
ao pegar um pincel).
A linha abaixo define a cor a ser usada.
*/
ctx.fillStyle = "black";

/*
Agora vamos pintar um retângulo no canvas.
Para senhar um objeto no canvas, precisamos
indicar as coordenadas do ponto inicial onde tal objeto
será pintado. Os valores 0 e 0 abaixo indicam que desejamos
que o retângulo seja posicionado na coordenada x=0 e y=0 da área do canvas (uma área do monitor),
como num plano cartesiano.
É importante frisar que, diferente de um plano cartesiano da matemática,
o ponto inicial 0,0 no monitor fica no canto superior esquerdo e não 
no canto inferior esquerdo. Além disso, os valores no eixo y (vertical)
aumentam de cima para baixo e não de baixo para cima como no plano cartesiano.

Na linha abaixo, depois do 0,0, devemos indicar qual a largura e altura
do retângulo que desejamos desenhar. Neste caso, indicamos
que a largura e altura serão as mesmas da área do canvas, que
definimos no HTML como 800 x 600.
Assim, se alterarmos no HTML tais valores, não precisamos alterar nada aqui no JS.
*/
ctx.fillRect(0, 0, canvas.width, canvas.height); 


//Por fim, estamos mudando a cor da tinta e desenhando um retângulo menor sobre o anterior.
ctx.fillStyle = "blue";
ctx.fillRect(0, 0, 50, 50); 
