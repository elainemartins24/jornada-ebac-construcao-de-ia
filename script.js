//Construção do script de treinamento da RNA
//Importação dos outros códigos criados
import utils from './utils.js'
import rna from './rna.js'
import controls from './controls.js'

// número de dinossauros que vai ter por cada geração
const SAMPLES = 20

//Força a IA sempre abrir uma instância para o jogo
const game = Runner.instance_;

//Criação de uma lista com os dinossauros. 
//Cada vez que um dinossauro é exibido na tela, ele participará dessa lista
let dinoList = []
let dinoIndex = 0  //Número(localização) de cada dissauro para identificar depois qual dele foi melhor

//Criação de um sistema de pontuação para saber posteriormente qual dinossauro foi melhor.
//O dinossauro com melhor desempenho naquela geração será guardado
let bestScore = 0;
let bestRNA = null; // Vai calcular a melhor RNA da rede neural

//Função para criar um dinossauro com 3 camadas e sempre carregar a melhor RNA anterior
function fillDinoList(){
    for (let i = 0; i < SAMPLES; i++){
        dinoList[i] = new rna(3,10,10,2)
        dinoList[i].load(bestRNA)
        if(i > 0) dinoList[i].mutate(0.5) //Para que cada geração seja única, caso o dinossauro(i) for > 0, ele sofrerá uma mutação de 0.5
    }
    console.log('Lista de dinossauro criada');
}


//Função desenvolvida para o dinossauro pular sempre que encontrar um cacto
setTimeout(() => {
    fillDinoList()
    controls.dispatch('jump')
}, 1000) // pula a cada 1 segundo


// Verif. se o jogo está ativado
setInterval(()=> {
    if (!game.activated) return

    //A variável dino vai receber o dinossauro atual, de acordo com o índice, buscará o dinossauro na lista
    const dino = dinoList(dinoIndex)

    //Verif. se o dinossauro colidiu no jogo
    if (game.crashed) {
        //Se a pontuação do dinossauro atual for maior que a pontuação do melhor dinossauro até agora, haverá a atualização 
        if (dino.score > bestScore) {
            bestScore = dino.score
            //Salva a melhor RNA até o momento
            bestRNA = dino.save()
            console.log('Melhor pontuação: ', bestScore)
        }     
        dinoIndex++
    
    if (dinoIndex === SAMPLES){
        //Verif. se todos os dinossauros foram avaliados e preenche a lista novamente
        fillDinoList(); 
        dinoIndex = 0
        bestScore = 0
    }
    //Toda vez que uma nova RNA for chamada, o game vai reiniciar com a RNA anterior
    game.restart()
  } 
    //Criando uma variável que vai receber vários valores
    //tRex: instância do dinossauro
    //horizon: calcula o horizonte
    //currentSpeed: calcula a velocidade atual do dinossauro
    //distanceRan: distância entre o cacto
    //dimension: as dimensões do dinossauro
  const {tRex, horizon, currentSpeed, distanceRan, dimension } = game
  //Calcula a pontuação do dinossauro 
  dino.score = distanceRan - 2000

  //Criação do Dinossauro com o seu posicionamento 
  const player= {
    x: tRex.xPos,  //posição em x do dinossauro
    y: tRex.yPos,  //posição em y do dinossauro
    speed: currentSpeed //velocidade atual

  };
  
  //Calculo dos obstáculos
  //Criação de uma variável que vai receber a posição de todos os obstáculos
  const [obstacle] = horizon.obstacles
  .map((obstacle) =>{
    return {
        //retorna a localização entre a distância horizontal e a distância vertical do obstáculo
        x: obstacle.xPos,
        y: obstacle.yPos
    }
        
  })
.filter((obstacle) => obstacle.x > player.x)

//Verif. se tem um obstáculo presente 
if (obstacle) {
    //calcula a distância entre o dinossauro e o cacto
    const distance = 1 - (utils.getDistance(player, obstacle) / dimension.WIDTH) ;
    
    //calcula a velocidade relativa do jogador
    const speed = player.speed / 6;


    const height = Math.tanh(105 - obstacle.y)

    //Processando as informações do dinossauro (pulando e agachando)
    const [jump, crouch] = dino.compute([
        distance, 
        speed, 
        height,
    ]);
    //Executa as ações
    //Se a probabilidade de  salto e agachamento forem iguais nao faz nada ou seja, fica em pé
    if (jump === crouch) return;

    //Se a probabiliade é de salto, será disparada a tecla de espaço (jump), ou seja, o dinossauro pulará
    if (jump) controls.dispatch('jump');

    // Se a probabilidade é de agachar, será disparada a tecla de seta para baixo, ou seja, o dinossauro agachará
    if (crouch) controls.dispatch('crouch');
 
};

}, 100); //O 100 é para disparar repetidamente

//Criação de um "botão" para ativar a IA
//A informação abaixo, quando executada no console do Javascript, executará a IA criada

/* const s = document.createElement('script');
s.type = 'module';
s.src = 'http://localhost:5500/sript.js'
document.body.appendChild(s);
*/