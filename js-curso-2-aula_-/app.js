// let titulo = document.querySelector ('h1');
// titulo.innerHTML = 'Jogo do número secreto';

// let paragrafo = document.querySelector ('p');
// paragrafo.innerHTML = 'Escolha um número de 1 a 10';

let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextonaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto; 
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});    
}

function exibirMensagemInicial(){
    exibirTextonaTela('h1', 'Jogo do número secreto');
    exibirTextonaTela('p', 'Escolha um número de 1 a 10');  
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
   
   if (chute == numeroSecreto) {
      exibirTextonaTela('h1', 'Acertou!!!');
      let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
      let mensagemTentativas = `Você descobriu o número secreto com
      ${tentativas} ${palavraTentativa} !`;
      exibirTextonaTela('p', mensagemTentativas);
      //exibirTextonaTela('p', 'Você descobriu o número secreto');
      document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextonaTela('p', 'O número secreto é menor');
        } else {
            exibirTextonaTela('p', 'O número secreto é maior');
            console.log(numeroSecreto);
        }
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    //return parseInt(Math.random() * 10 + 1);
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosnaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosnaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }


    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
        } else {
            listaDeNumerosSorteados.push(numeroEscolhido);
            console.log(listaDeNumerosSorteados);
            return numeroEscolhido;
        }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas=1;
    exibirMensagemInicial();   
    document.getElementById('reiniciar').setAttribute('disabled', true);     
}