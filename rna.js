//Função - gera um numero aleatorio
function randomRange(min,max){
    return Math.random() * (max - min) + min;
}

// Função de Interpolacao Linear
// A interpolação linear é uma forma de adivinhar um valor entre dois números que você já conhecidos. 
function lerp(a, b, t) {
    // Calcula um valor intermediário entre 'a' e 'b' com base no fator 't'
    return a + (b - a) * t;
}

// Definição da classe Neuron (Neurônio)
class Neuron {
    constructor(inputs) {

        // Inicializa o neurônio com um viés (bias) aleatório no intervalo [-1, 1]
        // O viés (bias) na nossa rede neural é um número que ajuda a rede a aprender. 
        //Ele permite que a rede faça ajustes para entender melhor os dados. O bias é importante porque ajuda a rede a aprender
        // padrões nos dados e a tomar decisões melhores. 
        //É como um ajuste pequeno que a rede faz para se adaptar aos dados da melhor maneira possível.
        this.bias = randomRange(-1, 1);
        
        // Inicializa uma lista de pesos com valores aleatórios no intervalo [-1, 1]
        this.weightList = new Array(inputs)
        .fill()  
        .map(() =>randomRange(-1, 1));
    }; 

// Função que calcula a saída do neurônio (ativação)
    g(signalList = []){
        let u = 0;

        // Calcula a soma ponderada dos sinais de entrada multiplicados pelos pesos
        for (let i =0; i < this.weightList.lenght; i++){
        u += signalList[i] * this.weightList[i];
     }

      // Verifica se o neurônio está ativado com base na função tangente
        if (Math.tanh(u) > this.bias) return 1; // Ativado
        else return 0; // Desativado
    }

    // Função que realiza mutação nos pesos e no viés do neurônio
    mutate(rate = 1) {
        this.weightList =  this.weightList.map((w) => {
        // Faz uma mudança nos pesos com base na taxa 'rate'
        return lerp(w, randomRange(-1,1), rate);
    });

    // Faz uma mudança no viés (bias) com base na taxa 'rate'
    this.bias = lerp(this.bias, randomRange(-1,1), range);
    }
}

//Classe para criar uma rede de neurônios
class RNA {
    constructor(inputCount = 1, levelList = []){
        //Cria uma pontuação para identificar qual foi a melhor RNA gerada, melhor neurônio gerado
        this.score = 0;

        //Cria a camada de neurônios com base nas especificações
        this.levelList = levelList.map((l, i) => {
            const inputSize = i === 0 ? inputCount : levelList[i - 1]
            return new Array(l).fill().map(() => new Neuron(inputSize));
        } );
    }

    //Função que calcula a saída (output) da RNA com base nas entradas
    compute(list = []){
        for(let i = 0; i < this.levelList.length; i++ ){
            const tempList = []

            for(const neuron of this.levelList[i]){
                if(list.length !== neuron.weightList.length) throw new Error("Entrada inválida");
                tempList.push(neuron.g(list))
            }

            list = tempList;
        }
        return list;
    }
}

mutate(rate = 1); {
    for(const level of this.levelList){
        for (const neuron of level) neuron.mutate(rate)
    }
}

load(rna); {
    if (!rna) return;
    try {
        this.levelList = rna.map((neuronList) => {
            return neuronList.map((neuron) => {
                const n = new Neuron();
                n.bias = neuron.bias
                n.weightList = neuron.weightList;

                return n;
            });
        });
    } catch (e) {
        return;
    }
    save(); {
        return this.levelList
    }
}

export default RNA;