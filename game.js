let bird1;

/**
 * Depois que criamos o arquivo GameImage.js,
 * precisamos incluir ele no nosso arquivo index.html
 * para só assim poder utilizá-lo aqui.
 * O arquivo GameImage.js define a classe
 * GameImage.
 * 
 * Então incluímos o arquivo game.js e depois o GameImage.js
 * no HTML. Ao tentar executar o código
 * sem o uso do window.onload abaixo (como fizemos em todas as versões
 * anteriores do jogo), ocorreu um erro indicando que GameImage (a classe)
 * não foi definida (ou seja, não existe).
 * 
 * Isto ocorria pelo fato de estarmos executando o game.js e só depois incluindo
 * o GameImage.js para execução.
 * Assim, como o primeiro depende do segundo, poderíamos mudar a ordem de inclusão
 * dos arquivos no HTML. Mas justamente para não ficarmos nos preocupando
 * com a ordem de dependência dos arquivos JS (até porque podemos 
 * ter muitos arquivos JS e dependências mais complexas),
 * usamos o atributo onload do objeto window (que representa a janela da página
 * aberta no navegador) para executar determinado código somente
 * quando a página HTML tiver sido carregada totalmente.
 * Isto é, o código HTML foi exibido e os arquivos que necessários
 * foram todos incluídos (como os arquivos JS).
 * 
 * JavaScript é uma das poucas linguagens onde variáveis
 * armazenem, além de dados, funções.
 * Isto é um dos recursos mais úteis da linguagem.
 * O atributo onload é uma dessas variáveis que esperam que
 * seja armazenada uma função nela.
 * Como já dito em aula, em JS, variáveis com começam com "on"
 * indicam que representam um evento.
 * O onload significa "ao carregar a página".
 * 
 * Ao atribuir uma função para o window.onload,
 * estamos indicando que tal função deve ser executada
 * somente quando a página for totalmente carregada.
 * Com isto, evitamos o erro mencionado acima, de tentar
 * usar algo que está em outro arquivo (como a classe GameImage),
 * mas que o arquivo ainda não foi carregado.
 */
window.onload = function(){
  console.log("Iniciou");

  /*
  bird1 é uma variável que foi declarada fora da função onload,
  mas que só será inicializada quando tal função for executada,
  ou seja, quando a página tiver sido totalmente carregada. 
  Observe que, como o tipo de bird1 será a classe GameImage,
  para representar um personagem do jogo,
  precisamos fazer new GameImage() para poder criarmos
  tal personagem.

  Isso é assim para criar qualquer variável cujo tipo seja uma classe.
  Usando variável = new NomeDaClasse().
  */
  bird1 = new GameImage();
  setInterval(draw, 60);   
}

function draw(){
  bird1.draw();
}

window.onkeydown = function(event){
  const movement = Math.abs(bird1.speed);
  if (event.key == "ArrowLeft") { 
    bird1.speed = -movement;
  } else if (event.key == "ArrowRight") { 
    bird1.speed = movement;
  }
  else if (event.key == "ArrowUp"){ 
    bird1.dy -= movement;
  } else if (event.key == "ArrowDown") { 
    bird1.dy += movement;
  }

  //console.log(event.key + ": #" + event.keyCode + " speed: " + bird1.speed);
}


