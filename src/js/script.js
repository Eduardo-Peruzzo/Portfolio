let projetos;
let projetosEmTela;

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
    containerSecundario.onclick = manipulaClick

    containerProjetos.appendChild(containerPrincipal)
}

function criaDetalhes(id) {
    let projetoFiltrado
    projetoFiltrado = projetos.filter((projeto) => projeto.id == id)
    projetoFiltrado = projetoFiltrado[0]

    const paginaProjeto = document.createElement("div")
    paginaProjeto.classList.add("pagina-projeto")

    const h1 = document.createElement("h1")

    const img = document.createElement("img")

    const p = document.createElement("p")

    const fechar = document.createElement("button")

    h1.innerHTML = projetoFiltrado.nome
    img.src = projetoFiltrado.imagem
    p.innerHTML = projetoFiltrado.desc
    fechar.innerHTML = "x"
    fechar.onclick = () => {
        paginaProjeto.style.opacity = 0
        setTimeout(() => {
            document.body.removeChild(paginaProjeto)
            document.body.classList.remove("sem-scroll")
        }, 500);

        const blurOverlay = document.querySelector(".blur-overlay");
        blurOverlay.style.pointerEvents = "none";
        blurOverlay.style.opacity = "0";
    }

    paginaProjeto.appendChild(h1)
    paginaProjeto.appendChild(img)
    paginaProjeto.appendChild(p)
    paginaProjeto.appendChild(fechar)

    document.body.appendChild(paginaProjeto)

    setTimeout(() => {
        paginaProjeto.classList.add("animacao")
    }, 10);

    const alturaPai = window.innerHeight;
    const alturaElemento = paginaProjeto.offsetHeight;

    const deslocamento = (alturaPai - alturaElemento) / 2;

    paginaProjeto.style.top = `${deslocamento}px`;
}

function manipulaClick(evento) {
    const id = evento.currentTarget.dataset.id

    criaDetalhes(id)
    arrumaPosicao("pagina-projeto")
    // Bloqueia o scroll no fundo
    document.body.classList.add("sem-scroll")

    // Ativa o blur
    const blurOverlay = document.querySelector(".blur-overlay");
    blurOverlay.style.pointerEvents = "all";
    blurOverlay.style.opacity = "1";
}

function arrumaPosicao(classe) {
    const elementos = document.querySelectorAll(`.${classe}`)

    elementos.forEach((elemento) => {
        const elementoPai = elemento.parentElement;

        const larguraPai = elementoPai.offsetWidth;
        const larguraElemento = elemento.offsetWidth;

        const deslocamento = (larguraPai - larguraElemento) / 2;

        elemento.style.left = `${deslocamento}px`;
    })
}

fetch("projetos.json").then((resposta) => {
    resposta.json().then((dados) => {
        dados.forEach(projeto => criaProjeto(projeto));
        projetos = dados
        arrumaPosicao("desc")
    })
});