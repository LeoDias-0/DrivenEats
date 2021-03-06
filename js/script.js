function handleClick(divItem) {
    const subsecaoAtual = divItem.parentNode
    const itemSelecionado = subsecaoAtual.querySelector('.selecionado')

    if (itemSelecionado === null) {
        divItem.classList.add('selecionado')
    } else if (itemSelecionado === divItem) {
        divItem.classList.remove('selecionado')
    } else {
        itemSelecionado.classList.remove('selecionado')
        divItem.classList.add('selecionado')
    }

    const pedidoPronto = verificarSePedidoEstaPronto()

    alterarBotaoConformePedido(pedidoPronto)
}

function fecharPedido() {

    const nome = prompt("Qual o seu nome?")
    const endereco = prompt("Qual o seu endereço?")


    const nomeComida = document.querySelector('.comida-selecionada').innerHTML
    const nomeBebida = document.querySelector('.bebida-selecionada').innerHTML
    const nomeSobremesa = document.querySelector('.sobremesa-selecionada').innerHTML

    let precoTotal = document.querySelector('.preco-total').innerHTML

    precoTotal = tratarPreco(precoTotal)

    const mensagemPedido = construirMensagemPedido(nomeComida, nomeBebida, nomeSobremesa, precoTotal, nome, endereco)

    const numeroRestaurante = '5548984658779'

    enviarMensagemWhatsapp(numeroRestaurante, mensagemPedido)
}


function confirmarPedido(){

    const pedidoPronto = verificarSePedidoEstaPronto()

    if (! pedidoPronto) return

    const nomeComida = pegarNomeItemSelecionadoDaSubsecao('.comida')
    const nomeBebida = pegarNomeItemSelecionadoDaSubsecao('.bebida')
    const nomeSobremesa = pegarNomeItemSelecionadoDaSubsecao('.sobremesa')

    let precoComida = pegarPrecoItemSelecionadoDaSubsecao('.comida').replace('.', ',')
    let precoBebida = pegarPrecoItemSelecionadoDaSubsecao('.bebida').replace('.', ',')
    let precoSobremesa = pegarPrecoItemSelecionadoDaSubsecao('.sobremesa').replace('.', ',')

    let precoTotal = somarTotalPedido(precoComida, precoBebida, precoSobremesa)

    precoTotal = 'R$ ' + precoTotal.replace('.', ',')

    alterarTexto('.comida-selecionada', nomeComida)
    alterarTexto('.preco-comida-selecionada', precoComida)

    alterarTexto('.bebida-selecionada', nomeBebida)
    alterarTexto('.preco-bebida-selecionada', precoBebida)

    alterarTexto('.sobremesa-selecionada', nomeSobremesa)
    alterarTexto('.preco-sobremesa-selecionada', precoSobremesa)

    alterarTexto('.preco-total', precoTotal)

    document.querySelector('.modal').classList.remove('oculto')

}

function voltarParaPaginaSelecao() {
    document.querySelector('.modal').classList.add('oculto')
}

//  O---------------O
//  | Funções Úteis |
//  O---------------O

function verificarSePedidoEstaPronto() {
    if ( !temItemSelecionado('.comida')) return false
    if ( !temItemSelecionado('.bebida')) return false
    if ( !temItemSelecionado('.sobremesa')) return false
    return true
}

function temItemSelecionado(cssSelectorSubsecao) {
    const subsecao = document.querySelector(cssSelectorSubsecao)
    return subsecao.querySelector('.selecionado') !== null
}

function alterarTexto(cssSelector, texto) {
    document.querySelector(cssSelector).innerHTML = texto
}

function alterarBotaoConformePedido(pedidoPronto) {
    const botaoFecharPedido = document.querySelector('.botao-fechar')
    const botaoFecharTexto = botaoFecharPedido.querySelector('span')

    if (pedidoPronto) {
        botaoFecharPedido.classList.add('botao-verde')
        botaoFecharTexto.innerHTML = 'Fechar pedido'
    } else {
        botaoFecharPedido.classList.remove('botao-verde')
        botaoFecharTexto.innerHTML = 'Selecione os 3 itens<br>para fechar o pedido'
    }
}

function tratarPreco(stringPreco) {
    const stringPrecoTratada = stringPreco.replace('R$ ', '').replace(',', '.')
    return stringPrecoTratada
}

function somarTotalPedido(precoComida, precoBebida, precoSobremesa) {
    precoComida = tratarPreco(precoComida)
    precoBebida = tratarPreco(precoBebida)
    precoSobremesa = tratarPreco(precoSobremesa)

    let precoTotal = Number(precoComida) + Number(precoBebida) + Number(precoSobremesa)

    return precoTotal.toFixed(2)
}

function pegarNomeItemSelecionadoDaSubsecao(cssSelectorSubsecao) {
    const subsecao = document.querySelector(cssSelectorSubsecao)
    const itemSelecionado = subsecao.querySelector('.selecionado')

    const nomeItem = itemSelecionado.querySelector('.nome-item').innerHTML
    return nomeItem
}

function pegarPrecoItemSelecionadoDaSubsecao(cssSelectorSubsecao) {
    const subsecao = document.querySelector(cssSelectorSubsecao)
    const itemSelecionado = subsecao.querySelector('.selecionado')

    const precoItem = itemSelecionado.querySelector('.preco').innerHTML
    return tratarPreco(precoItem)
}

function construirMensagemPedido(nomeComida, nomeBebida, nomeSobremesa, precoTotal, nome, endereco) {
    
    const mensagemPedido = `Olá, gostaria de fazer o pedido:
    - Prato: *${nomeComida}*
    - Bebida: *${nomeBebida}*
    - Sobremesa: *${nomeSobremesa}*
    Total: *R$ ${precoTotal}*
    
    `
    let mensagemIdentificacao

    if (nome !== null && endereco !== null) {
        mensagemIdentificacao = `Cliente: ${nome}
        Endereço: ${endereco}`
    } else {
        mensagemIdentificacao = `Cliente: Zé
        Endereço: Rua dos Bobos`
    }

    return mensagemPedido + mensagemIdentificacao
}

function enviarMensagemWhatsapp(numero, mensagem) {

    const urlBase = `https://wa.me/${numero}?text=`

    const urlCompleta = urlBase + encodeURIComponent(mensagem)

    window.open(urlCompleta)
}