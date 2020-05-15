export class Elemento{
  constructor () {
    //Construtor da tabela 
    this.elemento = document.createElement('table');
  }  
  
  //Criar um elemento 
  //---------------------------------------------------------------------
  criarElemento(tagDoElemento, innerText = '', classe = '', type = '') {
    var el = document.createElement(tagDoElemento);
    el.innerText = innerText;
    el.className = classe;
    el.setAttribute('type', type);
    return el;
  }
  
  //Criar uma row da tabela e retornar a tabela atualizada
  //---------------------------------------------------------------------
  criarRow(tarefa) {
    //Criar os elementos da row
    var row = this.criarElemento('tr');
    var check = this.criarElemento('input', '', '', 'checkbox');
    var tdCheck = this.criarElemento('td');
    var tdTexto = this.criarElemento('td', tarefa.texto);
    var tdAcoes = this.criarElemento('td');
    var i = this.criarElemento('i', 'delete', 'material-icons');
    var status = this.criarElemento('td', tarefa.prioridade);

    //Configurar de acordo com os valores da tarefa
    row.setAttribute('data-set', tarefa.id);
    row.setAttribute('data-texto', tarefa.texto);
    (tarefa.feito) ? row.classList.add('done') : '';
    (tarefa.feito) ? check.checked = true : check.checked = false;
    tdCheck.appendChild(check);
    row.appendChild(tdCheck);
    row.appendChild(tdTexto);
    row.appendChild(status);
    row.appendChild(tdAcoes);
    tdAcoes.appendChild(i);

    this.elemento.appendChild(row);
    return this.elemento;
  }


}
