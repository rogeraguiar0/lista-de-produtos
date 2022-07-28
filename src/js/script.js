const container = document.querySelector("ul")
const input     = document.querySelector("input")

const total = document.querySelector("#total")
let contador = 0;

const buttonTodos        = document.querySelector("#todos");
const buttonHorti        = document.querySelector("#hortiFruti");
const buttonPanificadora = document.querySelector("#panificadora");
const buttonLaticinios   = document.querySelector("#laticinios");

// Criação inicial de cards

function criarCards (element) {    
    const tagLi   = document.createElement("li");
    const tagImg  = document.createElement("img");
    const tagH3   = document.createElement("h3");
    const tagP    = document.createElement("p");
    const tagSpan = document.createElement("span");

    tagImg.src        = element.img;
    tagH3.innerText   = element.nome;
    tagSpan.innerText = `R$${element.preco}.00`;
    tagP.innerText    = element.secao;

    contador += element.preco
    total.innerText = `R$${contador}.00`;

    tagLi.appendChild(tagImg)
    tagLi.appendChild(tagH3)
    tagLi.appendChild(tagSpan)
    tagLi.appendChild(tagP)

    return container.appendChild(tagLi)
}
produtos.forEach((element) => criarCards(element))

// Evento dos botões

buttonTodos.addEventListener("click", () => {
    container.innerHTML = ""
    total.innerHTML = `R$${contador}.00`
    contador = 0;
    produtos.forEach((element) => criarCards(element))
});
buttonHorti.addEventListener("click", () => {
    container.innerHTML = ""
    total.innerHTML = `R$${contador}.00`
    contador = 0;

    produtos.map((element) => {
        element.secao == "Hortifruti" ? criarCards(element) : false
    })
});
buttonPanificadora.addEventListener("click", () => {
    container.innerHTML = ""
    total.innerHTML = `R$${contador}.00`
    contador = 0;

    produtos.map((element) => {
        element.secao == "Panificadora" ? criarCards(element) : false
    })
});
buttonLaticinios.addEventListener("click", () => {
    container.innerHTML = ""
    total.innerHTML = `R$${contador}.00`
    contador = 0;

    produtos.map((element) => {
        element.secao == "Laticínios" ? criarCards(element) : false
    })
});

// Input de pesquisa

input.addEventListener("keyup", (event) => {
    container.innerHTML = ""
    contador = 0;

    produtos.map((element) => {
        let pesquisa = input.value.toLowerCase().trim();
        let nome     = element.nome.toLowerCase().trim();
        let secao    = element.secao.toLowerCase().trim();
        
        nome.includes(pesquisa) || secao.includes(pesquisa) ? criarCards(element) : false
    })
});