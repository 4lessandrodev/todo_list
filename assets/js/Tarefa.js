
export class Tarefa{
  constructor (texto ='', feito = false, tarefas = [], prioridade = 1, id = 1) {
    this.texto = texto;
    this.prioridade = this.verificarPrioridade(texto, prioridade);
    this.feito = feito;
    this.id = this.gerarId(tarefas, id);
  }

  //Gerar um id
  //---------------------------------------------------------------------
  gerarId(tarefas, id) {
    if (tarefas[0] == '' || tarefas[0] == undefined){
      return id;
    }
    id = (tarefas[tarefas.length - 1].id) + 1;
    return id;
  }

  //Verificar se foi informado prioridade
  //---------------------------------------------------------------------
  verificarPrioridade(texto, prioridade) {
    var regex = new RegExp('(#[1-3] [a-z])', 'i');
    if (regex.exec(texto)) {
      this.texto = texto.slice(2, texto.length);
      return texto.slice(1, 2);
    } else {
      return prioridade;
    }
  } 

}