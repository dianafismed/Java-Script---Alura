const html = document.querySelector('html')
const imagem = document.querySelector('.app__image')
const titulo = document.querySelector('.app__title')
const botoes = document.querySelectorAll('.app__card-button')

const btFoco = document.querySelector('.app__card-button--foco')
const btCurto = document.querySelector('.app__card-button--curto')
const btLongo = document.querySelector('.app__card-button--longo')

const tgMusica = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')

btFoco.addEventListener('click', () => {
  alterarContexto('foco')
  btFoco.classList.add('active')
})

btCurto.addEventListener('click', () => {
  alterarContexto('descanso-curto')
  btCurto.classList.add('active')
})

btLongo.addEventListener('click', () => {
  alterarContexto('descanso-longo')
  btLongo.classList.add('active')
})

function alterarContexto(contexto){
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