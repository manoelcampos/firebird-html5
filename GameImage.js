/**
 * Cria um classe para representar um personagem do jogo.
 * Uma classe é como uma struct em C, no entanto, ela além
 * de armazenar dados em campos (que chamamos de atributos),
 * pode conter funções.
 * 
 * Assim como uma struct, uma classe é um novo tipo de dado
 * que podemos usar para criar variáveis.
 * 
 * A principal intenção de criar uma classe é agrupar
 * dados e funções em um só lugar para permitir sua reutilização.
 * 
 * No caso do nosso jogo, como podemos ter vários clones
 * de um mesmo personagem na tela (como o pássaro),
 * da forma que estávamos fazendo antes, precisaríamos duplicar
 * todo o código existente e alterar para conseguir ter mais um pássaro
 * voando. Isso significaria duplicar todas as cerca de 10 variáveis que tínhamos,
 * renomeando-as para algo como sw1, sh1, sx1, sy1, dx1, dy1,
 * e em seguida sw2, sh2, sx2, sy2, dx2, dy2.
 * 
 * Assim, se tivéssemos 10 pássaros, teríamos 10 vezes tais variáveis (com nomes diferentes).
 * Tal código ficaria impossível de entender e manter. 
 * Se fosse preciso fazer qualquer alteração no comportamento dos pássaros,
 * isto teria que ser feito repetidas vezes para cada pássaro criado.
 * 
 * Com uma classe, evitamos esta duplicação de variáveis e código.
 * A classe define quais dados (variáveis) o personagem tem
 * e como todos os personagens devem se comportar (funções).
 * 
 * Assim, podemos criar quantos personagens quisermos declarando
 * variáveis do tipo da classe.
 * 
 * Veja o arquivo game.js para detalhes de como usar a classe.
 */
class GameImage {
    /**
     * Define um construtor, que é uma função especial
     * responsável por criar objetos do tipo da classe.
     * 
     * A declaração de variáveis de tipos primitivos como inteiro não 
     * precisam de nada especial, podemos simplesmente fazer var x = 10
     * que temos uma variável inteira. Sabemos que é inteira
     * pois 10 não possui casas decimais.
     * Assim, para criar a variável, precisamos apenas atribuir um valor a ela.
     * 
     * Já para criar variáveis cujo tipo é uma classe, precisamos
     * fazer var variavel = new Classe().
     * No caso da classe GameImage então seria algo como
     * var bird = new GameImage().
     * 
     * Toda classe possui um construtor, mesmo que não incluíssemos um.
     * Quando adicionados um construtor como abaixo, estamos
     * apenas indicando que algumas das variáveis da classe
     * serão inicializadas com os valores definidos dentro do construtor.
     * Observe que variáveis como sw e sh são utilizadas
     * em diferentes funções dentro da classe
     * (nas funções draw e move).
     * Assim, estas variáveis devem ser declaradas dentro da classe
     * e não dentro de cada função.
     * Uma variável declarada dentro de uma função é uma variável local.
     * Ela só existe dentro da função e logo só pode ser utilizada
     * pela função onde foi declarada.
     * 
     * No nosso caso, precisamos declarar tais variáveis (campos) dentro da classe
     * para que elas possam ser utilizadas pelas diferentes funções da mesma.
     * Para isto, no luvar de fazer var variável = valor,
     * temos que fazer this.variavel = valor.
     */
    constructor(){
        // Área de destino a ser desenhada
        this.canvas = document.getElementById("gameCanvas");
        //Objeto que permite desenhar no canvas
        this.ctx = this.canvas.getContext("2d");
        
        /*Velocidade em que o personagem se move.
        Se for positiva, faz o personagem mover pra direita.
        Se for negativa, faz mover pra esquerda.*/
        this.speed = 10;

        //Imagem do personagem obtida do sprite que será desenhada no canvas
        this.img = new Image();
        this.img.src = "bird-sprite.png";

        //Largura (width) e altura (height) do personagem no sprite
        this.sw = 120;
        this.sh = 80;

        /* Posições na área dentro do sprite de onde será obtido o personagem para desenhar no canvas.
        São coordenadas de origem (source)*/
        this.sx = 0;
        this.sy = 0;

        /* Posições na área no canvas onde será desenhado o personagem obtido do sprite.
        São coordenadas de destino (destination)*/
        this.dx = 0;
        this.dy = 20;
    }

    /**
     * Função que desenha o personagem.
     * Veja que funções dentro de uma classe são definidas sem o uso da palavra function.
     */
    draw() {
        /*
        Observe que para acessar qualquer um dos campos da classe,
        precisamos usar this.variavel.
        Se esquercermos do this, ao executar o código, o navegador
        vai entender que queremos acessar uma variável 
        local ou global (que normalmente não vai existir e vai causar erro),
        no lugar de um campo da classe.
        */
        this.ctx.fillStyle = "#0f9";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.drawImage(this.img, this.sx, this.sy, this.sw, this.sh, this.dx, this.dy, this.sw, this.sh);

        /*Perceba também que, estando dentro da classe, 
        para chamar uma função declarada dentro dela, também precisamos
        usar this.nomeDaFuncao(). Obviamente, dentro dos parênteses
        deve ter os parâmetros solicitados pela função (se algum).*/
        this.move();
    }

    /**
     * Função que move o personagem na tela.
     */
    move() {
        //Define a posição x da área do sprite que será desenhada no canvas.
        this.sx += this.sw;

        //Faz o personagem mover horizontalmente no canvas
        this.dx += this.speed;

        /* Se a posição x da área dentro do sprite estiver fora da margem esquerda
        ou for maior ou igual a posição onde começa a última imagem em cada linha do sprite,
        então o personagem já foram desenhadas todas as imagens daquela linha
        no sprite e precisamos reiniciar da primeira imagem. */
        if (this.sx < 0 || this.sx >= this.img.width) {
            this.sx = 0;
        }

        /*Se o personagem chegou em uma das bordas da tela, inverte a velocidade para
        passar a mover para o outro lado.*/
        if (this.dx < 0 || this.dx >= this.canvas.width) {
            this.speed *= -1;
        }

        /*Se a velocidade é positiva, o personagem está movendo para a direita,
        logo, deve-se pegar imagens da 1ª linha do sprite.
        Se ela for negativa, o personagem está movendo para a esquerda,
        logo, deve-se pegar imagens da 2ª linha do sprite.
        O início da segunda linha de imagens (com o personagem indo da esquerda
        pra direta) é determinado pela altura da imagem do personagem no sprite.*/
        this.sy = this.speed > 0 ? 0 : this.sh;

        //console.log(`sx ${this.sx} sy ${this.sy} dx ${this.dx} sw ${this.sw} sh ${this.sh}`);
    }
}