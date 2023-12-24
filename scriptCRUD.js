const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')
const ulTarefas = document.querySelector('.app__section-task-list')
const textArea = document.querySelector('.app__form-textarea')
const tarefaEmAndamento = document.querySelector('.app__section-active-task-description')
let tarefaSelecionada = null

// se já existirem tarefas o sistema vai listar, caso contrário entra no 'ou' e gera a lista
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || []

btnAdicionarTarefa.addEventListener('click', () =>{
  // exibindo o campo para adicionar a tarefa
  formAdicionarTarefa.classList.toggle('hidden')
})

// Submetendo o formulário
formAdicionarTarefa.addEventListener('submit', (evento) =>{
  evento.preventDefault(); // impede que a página recarregue 
  const tarefa = {
    descricao: textArea.value
  }
  tarefas.push(tarefa)
  const elementoTarefa = criarElementoTarefa(tarefa)
  ulTarefas.append(elementoTarefa)
  atualizarTarefas()
  textArea.value = ''
  formAdicionarTarefa.classList.add('hidden')
})

// Funções

function criarElementoTarefa(tarefa){
  // criando os elementos html através do js para recuperar a listagem de tarefas que já existia na local Storage
  const li = document.createElement('li')
  li.classList.add('app__section-task-list-item')
  
  const svg = document.createElement('svg')
  svg.innerHTML = `
      <svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
          <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
      </svg>
  `
  
  const paragrafo = document.createElement('p')
  paragrafo.classList.add('app__section-task-list-item-description')
  paragrafo.textContent = tarefa.descricao
  
  const botao = document.createElement('button')
  botao.classList.add('app_button-edit')
  // editando o nome da tarefa na lista
  botao.onclick = () =>{
    //debugger // usado para fazer o debbug 
    const novaDescricao = prompt('Qual é o novo nome da tarefa? ')
    if(novaDescricao){
      paragrafo.textContent = novaDescricao
      tarefa.descricao = novaDescricao
      atualizarTarefas()
    }
  }

  const imagemBotao = document.createElement('img')
  imagemBotao.setAttribute('src', '/imagens/edit.png')
  botao.append(imagemBotao)
  
  // montando a estrutura do html
  li.append(svg)
  li.append(paragrafo)
  li.append(botao)

  li.onclick = () =>{
    document.querySelectorAll('.app__section-task-list-item-active')
    .forEach(elemento =>{
      elemento.classList.remove('app__section-task-list-item-active')
    })
    if(tarefaSelecionada == tarefa){
      tarefaEmAndamento.textContent = ''
      tarefaSelecionada = null
      return
    }
    tarefaSelecionada = tarefa
    tarefaEmAndamento.textContent = tarefa.descricao
    li.classList.add('app__section-task-list-item-active')
  }

  return li
}

function atualizarTarefas(params) {
  localStorage.setItem('tarefas', JSON.stringify(tarefas)) // guardando a lista de tarefas na localStorage que só aceita string
}


tarefas.forEach(tarefa => {
  const elementoTarefa = criarElementoTarefa(tarefa)
  ulTarefas.append(elementoTarefa)
});

