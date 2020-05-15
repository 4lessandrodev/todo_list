import { Elemento } from './Elemento.js';
import { Tarefa } from './Tarefa.js';
let form = document.getElementById('form');



//-----------------------------------------------------------------------
//Salvar uma tarefa
async function salvarTarefasLocal(tarefas) {
  try {
    await localStorage.setItem('tarefas', JSON.stringify(tarefas));
  } catch (error) {
    alert(error.message);
  }
}

//-----------------------------------------------------------------------
//Recuperar valores da lista no localstorage
async function recuperarTarefasLocal() {
  try {
    let listaVazia = await localStorage.getItem('tarefas') == null;
    if (listaVazia) {
      return [];
    }
    return await JSON.parse(localStorage.getItem('tarefas')); 
  } catch (error) {
    alert(error.message);
  }
}

//-----------------------------------------------------------------------
//Adicionar uma nova tarefa
async function adicionarTarefasLocal(tarefa) {
  try {
    let tarefas = await recuperarTarefasLocal();
    tarefas.push(tarefa);
    salvarTarefasLocal(tarefas);
  } catch (error) {
    alert(error.message);
  }
}

//-----------------------------------------------------------------------
//Excluir um item da lista
async function excluirTarefaLocal(id) {
  try {
    
    let tarefas = await recuperarTarefasLocal();
    let indice = await tarefas.indexOf(tarefas.find(tarefa => tarefa.id == id));
    let removed = tarefas.splice(indice, 1);
    salvarTarefasLocal(tarefas);

  } catch (error) {
    alert(error.message);
  }
}

//-----------------------------------------------------------------------
//Salvar uma tarefa de exemplo se a lista estiver vazia
async function iniciar(tarefa) {
  try {
    let tarefas = await recuperarTarefasLocal();
    if (tarefas != '') {
      render(tarefas);
    } else {
      render(tarefa);
    }
  } catch (error) {
    alert(error.message);
  }
}

//-----------------------------------------------------------------------
//Adicionar listener
const adicionarListener = (table) => {
  table.addEventListener('click', async function (e) {
    try {
    let el = e.target;
    let id;
    let tarefas = await recuperarTarefasLocal();

    if (el.tagName == 'TD') {
      
      id = el.parentNode.dataset.set;
      var checkbox = el.parentNode.querySelector('input[type=checkbox]');
      checkbox.checked = !checkbox.checked;
      tarefas.find(tarefa => tarefa.id == id).feito = checkbox.checked;
      el.parentNode.classList.toggle('done');
      
    } else if (el.tagName == 'I') {
      
      id = el.parentNode.parentNode.dataset.set;
      alert(`Tem certeza que deseja excluir a tarefa id: ${id} "${el.parentNode.parentNode.dataset.texto}"?`);
      excluirTarefaLocal(id);
      el.parentNode.parentNode.remove();
      
    }

      await salvarTarefasLocal(tarefas);
    } catch (error) {
      alert(error.message);
    }
  });
};

//-----------------------------------------------------------------------
//Renderizar as tarefas na pagina 
let tabelaModel = new Elemento();
const render = (tarefas) => {
  let result;
  if (tarefas == '') {
    return false;
  }
  for (let tarefa of tarefas) {
    result = tabelaModel.criarRow(tarefa);
  }
  //Atribuir a tabela ao DOM
  table.appendChild(result);
  adicionarListener(table);
  salvarTarefasLocal(tarefas);
};

//-----------------------------------------------------------------------
//Adicionar um listerner ao forumlario
form.addEventListener('submit', async (event) => {
  try {
  let texto = document.getElementById('tf_2do').value;
  let tarefas = await recuperarTarefasLocal();
  
  event.preventDefault();

  if (texto.trim() == '') {
    return false;
  }
  
  let tarefa = new Tarefa(texto, false, tarefas);
  adicionarTarefasLocal(tarefa);
  tabelaModel.criarRow(tarefa);

  form.reset();
    form["children"][0].focus();

  } catch (error) {
    alert(error.message);
  }
});

//-----------------------------------------------------------------------
//Inicias com uma tarefa de exemplo se o local storage estiver vazio
iniciar(
  [{
    id: 1,
    texto: 'Task Exemple',
    prioridade: 3,
    feito: true
  }]
);



