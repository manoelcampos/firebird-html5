class Particle{
    /**
     * Cria uma partícula a ser jogada por um ator (um pássaro no nosso jogo)
     * @param actor o personagem/ator que atira a partícula (o pássaro que atira a bola de fogo)
     * @param opponents um vetor contendo os oponentes que podem ser atingidos pela partícula
     */
    constructor(actor, opponents){
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.img = new Image();
        this.img.src = "fireball.gif";
        this.dx = 10;
        this.dy = 10;

        this.dw = 20;
        this.dh = 20;
        this.actor = actor;
        this.opponents = opponents;
        this.speed = this.actor.speed;
        if (this.speed >= 0) {
            this.dx = this.actor.dx + this.actor.sw;
        } else {
            this.dx = this.actor.dx - this.actor.sw/3;
        }
    }

    /**
     * Verifica se a partícula atirada
     * pelo ator (actor / pássaro a qual a partícula
     * está vinculada) atigiu um determinado oponente
     * @param opponent oponente que deseja-se verificar
     * se foi atingido pela partícula atirada pelo ator
     * @return true se a partícula colidiu no oponente, 
     * false caso não tenha atingido
     */
    collided(opponent){
        const xCollide = this.dx >= opponent.dx &&
                         this.dx <= opponent.dx + opponent.sw;
        const yCollide = this.dy >= opponent.dy &&
                         this.dy <= opponent.dy + opponent.sh;

        return xCollide && yCollide;
    }

    draw(){
        /* Como agora a partícula recebe um vetor de oponentes e não
        apenas um oponente, ao desenhar a partícula e verificar se ela
        atingiu algum oponente, precisamos usar um for.
        O for percorrer cada um dos oponentes e verifica
        se a partícula colidiu com tal oponente.
        Se colidiu e o oponente não tinha morrido ainda,
        alteramos a variável (propriedade) killed do oponente
        para true para indicar que ele morreu e não será mais desenhado
        na tela.
         */
        for (let i = 0; i < this.opponents.length; i++){
            if(this.collided(this.opponents[i])){
                if (!this.opponents[i].killed){
                    /* Para aumentar a pontuação a
                    cada oponente morto, precisamos acessar a tag
                    no arquivo index.html que exibirá tal pontuação.
                    Neste caso, incluímos uma tag div dentro do HTML.
                    Um div funciona como uma caixa onde podemos colocar
                    o que quisermos: textos, números, outras tags HTML, etc. 
                    Em JS, para termos acesso a qualquer elemento dentro de
                    uma página HTML, podemos usar a função document.getElementById,
                    indicando o ID da tag que desejamos acessar.
                    Já fizemos isso para acessar o canvas a partir do nosso código JS.
                    Como sabemos que a tag cujo ID é igual a "score" é uma tag div,
                    os divs possuem uma propriedade innerHTML.
                    Cada tag possui propriedades diferentes. Por exemplo,
                    uma tag img possui a propriedade (atributo) src como principal.
                    A propriedade innerHTML das tags div permitem alterar o conteúdo
                    exibido na tag. Neste caso, como estamos exibindo a pontuação
                    atual, usamos o ++ para somar 1 a tal pontuação a cada vez que
                    matarmos um pássaro.
                    */
                    let score = document.getElementById("score");
                    score.innerHTML++;
                    this.opponents[i].killed = true;
                }
            }
        }
        this.dx += this.speed;
        this.dy = this.actor.dy + this.actor.sh/2.5;
        this.ctx.drawImage(this.img, this.dx, this.dy, this.dw, this.dh);

        if(this.dx > 0 && this.dx < this.canvas.width){
            requestAnimationFrame(() => this.draw());
        }
    }
}            

