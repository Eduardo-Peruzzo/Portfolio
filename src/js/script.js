let projetos
let projetosEmTela
let intervaloCarrossel

const containerProjetos = document.querySelector(".projetos");

function criaProjeto(projeto) {
    const containerPrincipal = document.createElement("div")
    containerPrincipal.classList.add("projeto")

    const h3 = document.createElement("h3")

    const containerSecundario = document.createElement("div")
    containerSecundario.classList.add("imagem-desc")

    const img = document.createElement("img")

    const p = document.createElement("p")
    p.classList.add("desc")

    h3.innerHTML = projeto.nome

    img.src = projeto.imagem

    p.innerHTML = projeto.desc

    containerSecundario.appendChild(img)

    containerPrincipal.appendChild(h3)
    containerPrincipal.appendChild(containerSecundario)
    containerPrincipal.appendChild(p)

    containerSecundario.dataset.id = projeto.id
    containerSecundario.onclick = abrirProjeto

    containerProjetos.appendChild(containerPrincipal)
}

function criaDetalhes(id) {
    let projetoFiltrado
    projetoFiltrado = projetos.filter((projeto) => projeto.id == id)
    projetoFiltrado = projetoFiltrado[0]

    const blurOverlay = document.querySelector(".blur-overlay")

    const paginaProjeto = document.createElement("div")
    paginaProjeto.classList.add("pagina-projeto")

    const h1 = document.createElement("h1")

    let divCarrossel = document.createElement("div")

    const p = document.createElement("p")

    const p2 = document.createElement("p")
    p2.classList.add("links")

    const links = document.createElement("ul")

    const fechar = document.createElement("button")
    fechar.classList.add("fechar")

    h1.innerHTML = projetoFiltrado.nome
    divCarrossel = criaCarrossel(projetoFiltrado)
    p.innerHTML = projetoFiltrado.info
    p2.innerHTML = "Links relacionados ao projeto:"
    links.innerHTML = projetoFiltrado.links
    fechar.innerHTML = "x"

    fechar.onclick = () => {
        paginaProjeto.style.opacity = 0
        setTimeout(() => {
            document.body.removeChild(paginaProjeto)
            document.body.classList.remove("sem-scroll")
        }, 500);

        clearInterval(intervaloCarrossel)

        blurOverlay.style.pointerEvents = "none"
        blurOverlay.style.opacity = "0"
    }

    blurOverlay.onclick = () => {
        paginaProjeto.style.opacity = 0
        setTimeout(() => {
            document.body.removeChild(paginaProjeto)
            document.body.classList.remove("sem-scroll")
        }, 500);

        clearInterval(intervaloCarrossel)

        blurOverlay.style.pointerEvents = "none"
        blurOverlay.style.opacity = "0"
    }

    paginaProjeto.appendChild(h1)
    paginaProjeto.appendChild(divCarrossel)
    paginaProjeto.appendChild(p)
    paginaProjeto.appendChild(p2)
    paginaProjeto.appendChild(links)
    paginaProjeto.appendChild(fechar)

    document.body.appendChild(paginaProjeto)

    setTimeout(() => {
        paginaProjeto.classList.add("animacao")
    }, 10);

    const alturaPai = window.innerHeight
    const alturaElemento = paginaProjeto.offsetHeight

    const deslocamento = (alturaPai - alturaElemento) / 2

    paginaProjeto.style.top = `${deslocamento}px`
}

function criaCarrossel(projeto) {
    const divCarrossel = document.createElement("div")
    divCarrossel.classList.add("div-carrossel")
    const divBotoes = document.createElement("div")
    divBotoes.classList.add("botoes-carrossel")

    for (let index = 0; index < projeto.imagens.length; index++) {
        const img = document.createElement("img")
        img.src = projeto.imagens[index]
        img.classList.add("imagem-carrossel")
        if (index == 0) {
            img.classList.add("ativa")
        }
        divCarrossel.appendChild(img)
    }

    if (projeto.imagens.length > 1) {
        for (let index = 0; index < projeto.imagens.length; index++) {
            const botao = document.createElement("button")
            botao.classList.add("botao-carrossel")
            if (index == 0) {
                botao.classList.add("selecionado")
            }
            divBotoes.appendChild(botao)
        }
    }

    divCarrossel.appendChild(divBotoes)

    return divCarrossel
}

function abrirProjeto(evento) {
    const id = evento.currentTarget.dataset.id

    criaDetalhes(id)
    arrumaPosicao("pagina-projeto")
    arrumaPosicao("botoes-carrossel")

    const botoesCarrossel = document.querySelectorAll(".botao-carrossel")
    const imagens = document.querySelectorAll(".imagem-carrossel")

    botoesCarrossel.forEach((botao, indice) => {
        botao.onclick = () => {
            const botaoSelecionado = document.querySelector(".selecionado")
            botaoSelecionado.classList.remove("selecionado")

            botao.classList.add("selecionado")

            const imagemAtiva = document.querySelector(".ativa")
            imagemAtiva.classList.remove("ativa")

            imagens[indice].classList.add("ativa")

            arrumaPosicao("botoes-carrossel")
        }
    })

    intervaloCarrossel = setInterval(() => {
        const imagemAtual = document.querySelector(".ativa");
        const indexAtual = Array.from(imagens).indexOf(imagemAtual);
        const proximoIndex = (indexAtual + 1) % imagens.length;

        const botaoSelecionado = document.querySelector(".selecionado");
        botaoSelecionado.classList.remove("selecionado");

        botoesCarrossel[proximoIndex].classList.add("selecionado");

        imagemAtual.classList.remove("ativa");
        imagens[proximoIndex].classList.add("ativa");

        arrumaPosicao("botoes-carrossel");
    }, 8000);

    document.body.classList.add("sem-scroll")

    const blurOverlay = document.querySelector(".blur-overlay")
    blurOverlay.style.pointerEvents = "all"
    blurOverlay.style.opacity = "1"
}

function arrumaPosicao(classe) {
    const elementos = document.querySelectorAll(`.${classe}`)

    elementos.forEach((elemento) => {
        const elementoPai = elemento.parentElement

        const larguraPai = elementoPai.offsetWidth
        const larguraElemento = elemento.offsetWidth

        const deslocamento = (larguraPai - larguraElemento) / 2

        elemento.style.left = `${deslocamento}px`
    })
}

fetch("projetos.json").then((resposta) => {
    resposta.json().then((dados) => {
        dados.forEach(projeto => criaProjeto(projeto));
        projetos = dados
        arrumaPosicao("desc")
    })
});