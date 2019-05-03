/**
 * Classe que implementa uma partícula,
 * um objeto que se move pela tela
 * e que pode atingir outros objetos e destruí-los.
 * Partículas podem ser representadas por diversas imagens como pedras,
 * asteróides, tijolos, bolas de fogo, etc.
 * 
 * Apesar da classe Particle representar uma imagem na tela, ela é bem mais simples que 
 * a GameImage. Ela possui algumas variáveis para armazenar posição e tamanho,
 * e funções para desenhar na tela. Mas nossas partículas serão desenhadas
 * a partir de um arquivo com uma única imagem.
 * Assim, o código é bem mais simples.
 * Apesar de termos código duplicado entre a classe Particle
 * e GameImage, somente com conceitos de programação orientada 
 * a objetos (do terceiro ano) é que poderíamos resolver este problema.
 * Assim, não vamos nos preocupar com isto.
 */
class Particle{
    constructor(actor, opponent){
        this.canvas = document.getElementById("gameCanvas");
        this.ctx = this.canvas.getContext("2d");
        this.img = new Image();
        this.img.src = "fireball.gif";
        this.dx = 10;
        this.dy = 10;

        this.dw = 20;
        this.dh = 20;
        this.actor = actor;
        this.opponent = opponent;
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
        /*xCoolide recebe true ou false para indicar
        se */
        const xCollide = this.dx >= opponent.dx &&
                         this.dx <= opponent.dx + opponent.sw;
        const yCollide = this.dy >= opponent.dy &&
                         this.dy <= opponent.dy + opponent.sh;

        /*Faz a função retornar o valor da condição abaixo,
        ou seja, true ou false.
        Isto é uma forma simplificada de fazer:
        if(condicao)
            return true;
        else return false;
        
        Neste caso, a condição é xCollide && yCollide.
        Sempre que temos uma função que retorna true de acordo
        com uma condição e false caso a condição
        não seja satisfeita, não precisamos escrever um if..else
        para isto. Como a própria condição tem um resultado true ou false,
        basta retornar a própria condição para fazer a função retornar
        true se a condição for verdadeira e false se a condição for falsa.*/
        return xCollide && yCollide;
    }

    /**
     * Move uma partícula de posição e em seguida desenha ela na tela.
     * Como o arquivo de imagem a ser usado para exibir uma partícula
     * só deverá ter uma imagem, não precisamos fazer
     * cálculos para obter as posições e tamanho de uma dessas
     * imagens dentro do arquivo.
     * E como nossa partícula só se move horizontalmente,
     * o único cálculo que precisamos fazer é
     * incrementar a coordenada x (variável dx).
     */
    draw(){
        if(this.collided(this.opponent)){
            this.opponent.killed = true;
        }
        this.dx += this.speed;
        this.dy = this.actor.dy + this.actor.sh/2.5;

        /*Observe que no GameImage utilizamos uma versão da função
        drawImage que requer nove parâmetros. Neste caso,
        como nosso arquivo contém apenas uma imagem, podemos
        utilizar a versão de tal função que só requer 5 parâmetros:
        a imagem a ser desenhada, a coordenada x de destino,
        a coordenada y de destino, a largura da imagem a ser desenhada
        e a altura da imagem a ser desenhada.
        Observe que se indicarmos valores para dw e dh diferentes
        do tamanho real da imagem, a mesma vai ser desenhada 
        em tamanho menor ou maior. Assim, podemos livremente
        escolher qual o tamanho que queremos que a imagem apareça na tela. */
        this.ctx.drawImage(this.img, this.dx, this.dy, this.dw, this.dh);

        /*
        Quando chamarmos a função draw() da classe Particle a partir
        do arquivo game.js, ela vai desenhar a bola de fogo na tela
        e vai agendar uma nova chamada da função para um determinado horário,
        permitindo que a partícula se mova sozinha na tela.
        Para agendarmos a execução repetida de uma função, usamos no game.js
        a função setInterval. Com esta função, indicamos
        qual função desejamos agendar sua execução repetidamente,
        de acordo com um intervalo de tempo. O setInterval vai fazer
        a função indicada ser chamada infinitamente a cada intervalo de 
        tempo definido. Aqui estamos usando a função requestAnimationFrame pois
        não devemos desenhar a partícula infinitamente. Quando a partícula sair da tela,
        ela deve parar de ser desenhada. No caso do pássaro, o desenhamos infinitamente
        pois quando ele chega em uma das laterais da tela, ele muda de direção sozinho.

        No caso da partícula, ao sair da tela, ela deve ser apenas destruída.
        Para isto, basta pararmos de desenhar ela na tela.
        Usando a função requestAnimationFrame, a cada vez que a função draw() for chamada,
        podemos definir uma confição que indica se a execução da função draw() deve ser
        agendada mais uma vez usando o requestAnimationFrame.
        Na requestAnimationFrame, não definimos quando a função que indicarmos
        será chamada. A requestAnimationFrame é que vai decidir por si só
        quando a função será executada novamente, de acordo com as capacidades
        do computador e do navegador.

        O if abaixo define exatamente essa condição, que indica
        se a partícula está dentro da área horizontal visível do canvas.
        Se ela estiver, nós agendamos a execução do draw novamente.
        Quando o draw for executado automaticamente da próxima vez,
        ele vai mover a partícula e desenhá-la na tela.
        Se a partícula ainda estiver visível na tela,
        ele vai agendar novamente a execução do draw() para um outro horário.
        E assim isso se repete sucessivamente até que a partícula não esteja mais visível
        na tela e a função draw não é mais agendada para ser executada.
        */
        if(this.dx > 0 && this.dx < this.canvas.width){
            /*
            Lembre-se que o JavaScript é uma das linguagens onde variáveis
            podem receber, além de valores, funções.
            Assim, uma função pode receber outra função como parâmetro.
            No caso de funções como o setInterval e requestAnimationFrame,
            precisamos indicar o nome de uma função que será agendada para execução
            em determinados intervalos de tempo.
            Porém, como estamos dentro de uma classe, as coisas se tornam mais complicadas.
            Vocês já sabem que JS foi criada em 10 dias, assim há uma série de coisas
            que não funcionam como esperado.
            No game.js, indicamos que o setInterval deveria chamar a função draw
            (que foi definida dentro do próprio arquivo game.js) fazendo apenas
            setInterval(game, 60).
            Observe que não incluímos parênteses depois do nome da função game.
            Neste caso, não estamos chamando a função, estamos apenas indicando para 
            a setInterval qual é o nome da função que ela deverá chamar a cada 60 milissegundos.
            Se fossemos usar a mesma lógica com o requestAnimationFrame seria algo como
            requestAnimationFrame(draw). Mas como estamos dentro de uma classe, para chamar
            uma função da própria classe precisamos usar o this. Então a linha de código seria:
            requestAnimationFrame(this.draw). Mas infelizmente, esta lógica que funcionou
            para o setInterval não funciona quando estamos dentro de uma classe tentando
            passar para o setInterval ou requestAnimationFrame o nome de uma função da
            própria classe.
            A forma mais simples de fazer isso funcionar é utilizar uma sintaxa (uma forma de escrever
            um determinado código) que é específica de um paradigma de programação chamado Programação
            Funcional (que é algo além da Programação Orientada a Objetos que vocês verão no 3º ano).
            Logo, estes conceitos não serão discutidos aqui e nem no restante do curso.
            Mas como o uso de recursos de programação funcional é a forma mais simples de fazer o código
            abaixo funcionar, tivemos que utilizá-lo.
            Basicamente, o código () => this.draw() significa o seguinte:
            - estamos criando uma função sem nome (anônima), que dentro dela será chamada a função draw() da nossa classe.
              Para isto, como estamos dentro da classe, precisamos usar o this, fazendo this.draw().
            - tal função realmente não tem um nome, pois se tivesse, seria algo como nome_da_funcao(),
              mas temos apenas os parênteses. O código de tal função é apenas uma única linha,
              que é this.draw(). 
            - A seta => (não significa maior igual ou nada desse tipo, é apenas uma seta)
              é usada para separar a declaração desssa tal função sem nome do código que ela executa.

            Assim, esta sintaxa de criar uma função seguinte a estrutura
                 () => codigo_a_ser_executado_pela_funcao_anônima
            é uma forma simplificada ao método padrão de criar funções, que seria
                function nome_da_funcao(){
                    codigo_a_ser_executado_pela_funcao;
                }
            Então como podem ver, no exemplo acima, temos as partes obrigatórias da declaração
            de uma função: os parênteses e o código a ser executado. 
            No entanto tivemos que:
            1) remover a palavra function;
            2) remover o nome da função;
            3) remover qualquer palavra return que tivesse;
            4) remover as chaves.
            5) adicionar a seta no lugar do abre chaves.

            Se você pegar uma função qualquer como
             function soma(a,b){
                 return a+b;
             }
            
            e seguir os passos acima, obterá
                (a,b) => a+b
            ou seja, a mesma estrutura de () => this.draw().

            Como dito, isto é um tópico muito avançado que não abordaremos no curso.
            Estamos usando apenas porque é a forma mais fácil de fazer a chamada do draw funcionar
            com o setInterval ou requestAnimationFrame.
             */
            requestAnimationFrame(() => this.draw());
        }
    }
}            

