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
    var row = this.criarElemento('tr');
    row.setAttribute('data-set', tarefa.id);
    row.setAttribute('data-texto', tarefa.texto);
    (tarefa.feito) ? row.classList.add('done') : '';
    var check = this.criarElemento('input', '', '', 'checkbox');
    (tarefa.feito) ? check.checked = true : check.checked = false;
    var tdCheck = this.criarElemento('td');
    var tdTexto = this.criarElemento('td', tarefa.texto);
    var tdAcoes = this.criarElemento('td');
    var i = this.criarElemento('i', 'delete', 'material-icons');
    var status = this.criarElemento('td', tarefa.prioridade);
    tdCheck.appendChild(check);
    row.appendChild(tdCheck);
    row.appendChild(tdTexto);
    row.appendChild(status);
    row.appendChild(tdAcoes);
    tdAcoes.appendChild(i);
    this.elemento.appendChild(row);
    return this.elemento;
  }

  //Adicionar um evento ao elemento
  //---------------------------------------------------------------------
  adicionarListener() {
    this.elemento.addEventListener('click', function (e) {
      var el = e.target;
      if (el.tagName == 'TD') {
        var checkbox = el.parentNode.querySelector('input[type=checkbox]');
        checkbox.checked = !checkbox.checked;
        el.parentNode.classList.toggle('done');
      } else if (el.tagName == 'I') {
        var id = el.parentNode.parentNode.dataset.set;
        alert(`Tem certeza que deseja excluir a tarefa id: ${id} "${el.parentNode.parentNode.dataset.texto}"?`);
        el.parentNode.parentNode.remove();
      }
    });
  }
}
