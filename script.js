const html = document.querySelector('html');
const focoBT = document.querySelector('.app__card-button--foco');
const curtoBT = document.querySelector('.app__card-button--curto');
const longoBT = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__logo-image');
const titulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const musicaFoco = document.querySelector('#alternar-musica');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const iniciarOuPausarBtIcone = document.querySelector('.app__card-primary-butto-icon');
const tempoNaTela = document.querySelector('#timer');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
const somPlay = new Audio('./sons/play.wav');
const somPause = new Audio('./sons/pause.mp3');
const somFim = new Audio('./sons/beep.mp3');
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null

musicaFoco.addEventListener('change', function () {
    if (musica.paused) {
        musica.play()
    }else {
        musica.pause()
    }
})

focoBT.addEventListener('click', function () {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBT.classList.add('active')
})

curtoBT.addEventListener('click', function () {
    tempoDecorridoEmSegundos = 300
    alterarContexto('descanso-curto');
    curtoBT.classList.add('active')
})

longoBT.addEventListener('click', function () {
    tempoDecorridoEmSegundos = 900
    alterarContexto('descanso-longo');
    longoBT.classList.add('active')
})

function alterarContexto (props) {
    mostraTempo()
    botoes.forEach(function (props) {
        props.classList.remove('active')
    })
    html.setAttribute('data-contexto', props);
    banner.setAttribute('src', `./imagens/${props}.png`);
    switch (props) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`            
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa</strong>         `
    
        default:
            break;
    }
}


const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0){
        somFim.play()
        alert('Tempo finalizado')
        zerar()
        return
    }
    tempoDecorridoEmSegundos -= 1
    mostraTempo();
}

startPauseBt.addEventListener('click', iniciarOuPausar)

function iniciarOuPausar () {
    if (intervaloId) {
        somPlay.play();
        zerar()
        return
    }
    somPause.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar"
    iniciarOuPausarBtIcone.setAttribute('src', `./imagens/pause.png`);
}

function zerar () {
    clearInterval(intervaloId)
    iniciarOuPausarBt.textContent = "Começar"
    iniciarOuPausarBtIcone.setAttribute('src', `./imagens/play_arrow.png`);
    intervaloId = null
}

function mostraTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}

mostraTempo();