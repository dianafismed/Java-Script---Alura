const html = document.querySelector('html')
const imagem = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')
const btFoco = document.querySelector('.app__card-button--foco')
const btCurto = document.querySelector('.app__card-button--curto')
const btLongo = document.querySelector('.app__card-button--longo')
const tgMusica = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const play = new Audio('/sons/play.wav')
const pause = new Audio('/sons/pause.mp3')
const fim = new Audio('/sons/beep.mp3')
const comecar = document.querySelector('#start-pause')
const btComecarPausar = document.querySelector('#start-pause span')
const btImage = document.querySelector('#start-pause img')
const timer = document.querySelector('#timer')
let temporizador = 1500 // 1500 segundos = 25 minutos

let intervalo = null

btFoco.addEventListener('click', () => {
  temporizador = 1500
  alterarContexto('foco')
  btFoco.classList.add('active')
})

btCurto.addEventListener('click', () => {
  temporizador = 300
  alterarContexto('descanso-curto')
  btCurto.classList.add('active')
})

btLongo.addEventListener('click', () => {
  temporizador = 900
  alterarContexto('descanso-longo')
  btLongo.classList.add('active')
})

tgMusica.addEventListener('change', () => {
  if(musica.paused){
    musica.play()
  }else{
    musica.pause()
  }
})
musica.loop = true

//        FUNÇÕES
const contagemRegressiva = () => {
  if (temporizador <=0){
    fim.play()
    alert('Tempo finalizado')
    zerar()
    return
  }
  temporizador-=1
  mostrarTempo()
}
comecar.addEventListener('click', iniciarOuPausar)

function alterarContexto(contexto){
  mostrarTempo()
  botoes.forEach(function (contexto) {
    contexto.classList.remove('active')
  })
  html.setAttribute('data-contexto', contexto)
  imagem.setAttribute('src', `/imagens/${contexto}.png`)
  switch (contexto) {
    case 'foco':
      titulo.innerHTML = `Otimize sua produtividade,<br><strong class="app__title-strong">mergulhe no que importa.</strong>`
      break;
    case 'descanso-curto':
      titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`
      break;
    case 'descanso-longo':
      titulo.innerHTML = `Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>`
      break;
    default:
      break;
  }
}

function iniciarOuPausar(){
  if(intervalo){
    pause.play()
    zerar()
    return
  }
  play.play()
  intervalo = setInterval(contagemRegressiva, 1000)
  btComecarPausar.textContent = 'Pausar'
  btImage.setAttribute('src', '/imagens/pause.png')
}

function zerar(){
  fim.pause()
  clearInterval(intervalo)
  btComecarPausar.textContent = 'Começar'
  btImage.setAttribute('src', '/imagens/play_arrow.png')
  intervalo = null
}

function mostrarTempo() {
  const tempo = new Date(temporizador * 1000)
  const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'})
  timer.innerHTML = `${tempoFormatado}`
  }

mostrarTempo()