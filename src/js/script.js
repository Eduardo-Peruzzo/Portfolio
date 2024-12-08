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
    containerPrincipal.appendChild(p)

    containerPrincipal.appendChild(h3)
    containerPrincipal.appendChild(containerSecundario)

    containerProjetos.appendChild(containerPrincipal)
}

function arrumaPosicao() {
    const descs = document.querySelectorAll(".desc")

    descs.forEach((p) => {
        const elementoPai = p.parentElement;

        const larguraPai = elementoPai.offsetWidth;
        const larguraElemento = p.offsetWidth;

        // Cálculo para centralizar horizontalmente
        const deslocamento = (larguraPai - larguraElemento) / 2;

        // Aplicar no estilo
        p.style.left = `${deslocamento}px`;

    })
}

fetch("projetos.json").then((resposta) => {
    resposta.json().then((dados) => {
        dados.forEach(projeto => criaProjeto(projeto));

        arrumaPosicao()
    })
});