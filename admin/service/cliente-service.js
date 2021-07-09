//template

const criaNovaLinha = (nome, email) => {
  const linhaNovoCliente = document.createElement('tr')
  const conteudo = `
  <td class="td" data-td>${nome}</td>
     <td>${email}</td>
     <td>
       <ul class="tabela__botoes-controle">
           <li><a href="../telas/edita_cliente.html" class="botao-simples botao-simples--editar">Editar</a></li>
           <li><button class="botao-simples botao-simples--excluir" type="button">Excluir</button></li>
       </ul>
   </td> 
   `
   linhaNovoCliente.innerHTML = conteudo
   return linhaNovoCliente
}

//percorre a DOM c/ querySelector
const tabela = document.querySelector('[data-tabela]')
//precisa inserir o elemento filho que foi criado junto ao elemento pai
//appendChild recebe criaNovaLinha que recebe nome, email

const listaClientes = () => {
   const promise = new Promise((resolve, reject) => {
    const http = new XMLHttpRequest ()
    http.open('GET', 'http://localhost:3000/profile') //tipo de requisição AJAX 
    
    
    http.onload = () => { //ao carregar a página --onload
       if (http.status >= 400){
        reject(JSON.parse(http.response))
       }else{
        resolve(JSON.parse(http.response))
       }
    }
    http.send() //para enviar
   })
   return promise
}

listaClientes() //devolve uma promessa(promise)
.then(data =>{
     data.forEach(elemento => {
      tabela.appendChild(criaNovaLinha(elemento.nome, elemento.email))
})})

//JSON.parse transforma o retono do elemento em válido como JS para o navegador