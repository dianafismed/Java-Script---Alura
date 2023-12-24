// Encontrar botão adicionar tarefa
const btnAdicionarTarefa = document.querySelector('.app__button--add-task')
const formAdicionarTarefa = document.querySelector('.app__form-add-task')

const textArea = document.querySelector('.app__form-textarea')
const tarefas = []

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
  localStorage.setItem('tarefas', JSON.stringify(tarefas)) // guardando a lista de tarefas na localStorage que só aceita string
})