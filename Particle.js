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
        for (let i = 0; i < this.opponents.length; i++){
            if (this.collided(this.opponents[i]) && !this.opponents[i].killed){
                let score = document.getElementById("score");
                score.innerHTML++;
                this.opponents[i].killed = true;
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

