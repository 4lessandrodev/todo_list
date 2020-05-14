import { Elemento } from './Elemento.js';
import { Tarefa } from './Tarefa.js';
let form = document.getElementById('form');
let tabelaModel = new Elemento();


let tarefas = [
  {
    id: 1,
    texto: 'Escovar os dentes',
    prioridade: 3,
    feito:true
  },
  {
    id: 2,
    texto: 'Gravar aula node',
    prioridade: 1,
    feito: true
  },
  {
    id: 3,
    texto: 'Fazer Café',
    prioridade: 3,
    feito: true
  },
  {
    id: 4,
    texto: 'Estudar para a prova',
    prioridade: 3,
    feito: true
  },
  {
    id: 5,
    texto: 'Estudar NodeJS',
    prioridade: 1,
    feito: true
  },
  {
    id: 6,
    texto: 'Assistir aula DH',
    prioridade: 3,
    feito: false
  }
  
];




//Renderizar as tarefas na pagina 
const render = (tarefas) => {
  var result;
  
  for (let tarefa of tarefas) {
    result = tabelaModel.criarRow(tarefa);
  }
  //Atribuir a tabela ao DOM
  tabelaModel.adicionarListener();
  table.appendChild(result);
};

//Adicionar um listerner ao forumlario
form.addEventListener('submit', (event) => {
  let texto = document.getElementById('tf_2do').value;
  event.preventDefault();
  if (texto.trim() == '') {
    return false;
  }
  
  // texto ='', feito = false, tarefas = [], prioridade = 1, id = 1
  let tarefa = new Tarefa(texto, false, tarefas);
  tarefas.push(tarefa);
  tabelaModel.criarRow(tarefa);
  form.reset();
  form["children"][0].focus();

});

render(tarefas);

/**
* Criar função create(texto,prioridade) que recebe um texto e prioridade como parâmetros
* Essa função deve retornar um objeto literal com os seguintes campos
* texto: com o texto passado por parâmetro
* prioridade: com base na prioridade passada como parâmetro
* fetiro: false
*/

