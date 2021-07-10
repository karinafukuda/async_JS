
import { clienteService } from "../service/cliente-service.js"

//template
const criaNovaLinha = (nome, email, id) => {
 const linhaNovoCliente = document.createElement('tr')
 const conteudo = `
 <td class="td" data-td>${nome}</td>
    <td>${email}</td>
    <td>
      <ul class="tabela__botoes-controle">
          <li><a href="../telas/edita_cliente.html?id=${id}" class="botao-simples botao-simples--editar">Editar</a></li>
          <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
      </ul>
  </td> 
  ` //?id=${id} Query String
  linhaNovoCliente.innerHTML = conteudo
  linhaNovoCliente.dataset.id = id
  return linhaNovoCliente
}

//percorre a DOM c/ querySelector
const tabela = document.querySelector('[data-tabela]')
//precisa inserir o elemento filho que foi criado junto ao elemento pai
//appendChild recebe criaNovaLinha que recebe nome, email
tabela.addEventListener('click',(evento) =>{
  let ehbotaoDeletar = evento.target.className === 
  'botao-simples botao-simples--excluir'
  if(ehbotaoDeletar){
    const linhaCliente = evento.target.closest('[data-id]')//closest - o que tiver mais próximo
    let id = linhaCliente.dataset.id
    clienteService.removeCliente(id)
    .then( () => {
      linhaCliente.remove()
    })
  }
})

clienteService.listaClientes() 
.then(data =>{
     data.forEach(elemento => {
      tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email, elemento.id))
})})

//JSON.parse transforma o retorno do elemento em válido como JS para o navegador