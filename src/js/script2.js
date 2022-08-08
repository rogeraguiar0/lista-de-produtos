const vitrine  = document.querySelector(".vitrine__produtos");
const nav      = document.querySelector(".nav__botoes");

const carrinho      = document.querySelector(".carrinho__conteudo ul");
const carrinhoVazio = document.querySelector(".carrinho__info")
const carrinhoInfo  = document.querySelector(".carrinho__total");

const pesquisa       = document.querySelector(".nav__pesquisa");
const buttonPesquisa = document.querySelector(".nav__pesquisa button");
const inputPesquisa  = document.querySelector(".nav__pesquisa input");

let quantidade = 0;
let total      = 0;

// Criação de cards

function criarCard (element) {
    const tagLi     = document.createElement("li");
    const tagImg    = document.createElement("img");
    const tagH3     = document.createElement("h3");
    const tagP      = document.createElement("p");
    const tagOl     = document.createElement("ol");
    const tagDiv    = document.createElement("div");
    const tagSpan   = document.createElement("span");
    const tagButton = document.createElement("button");

    tagButton.setAttribute("id", element.id);

    tagImg.src          = element.img;
    tagH3.innerText     = element.nome;
    tagP.innerText      = element.secao;
    tagSpan.innerText   = `R$${element.preco}.00`;
    tagButton.innerText = "Comprar";

    element.componentes.forEach(elem => {
        const tagLi2     = document.createElement("li");
        tagLi2.innerText = `♦ ${elem}`;
        tagOl.appendChild(tagLi2);
    })

    tagLi.appendChild(tagImg);
    tagLi.appendChild(tagH3);
    tagLi.appendChild(tagP);
    tagLi.appendChild(tagOl);
    tagLi.appendChild(tagDiv);
    tagDiv.appendChild(tagSpan);
    tagDiv.appendChild(tagButton);

    return vitrine.appendChild(tagLi);
}
produtos.forEach(element => criarCard(element, vitrine))

// Evento dos botões de navegação

nav.addEventListener("click", (event) => {
    const evento = event.target.id;
    if (evento == "todos") {
        vitrine.innerHTML = "";
        produtos.forEach(element => criarCard(element, vitrine))
    }
    else if (evento == "Hortifruti" || evento == "Panificadora" || evento == "Laticinios") {
        vitrine.innerHTML = "";
        produtos.map(element => { element.secao == evento ? criarCard(element, vitrine) : false })
    }
})

// Barra de pesquisa

pesquisa.addEventListener("click", (event) => {
    const valorPesquisa = inputPesquisa.value.toLowerCase().trim();
    if (event.target.tagName == "BUTTON" || event.target.tagName == "IMG") {
        vitrine.innerHTML = "";
        produtos.map(element => {
            const nome      = element.nome.toLowerCase();
            const secao     = element.secao.toLowerCase();
            const categoria = element.categoria.toLowerCase();

            nome.includes(valorPesquisa) || secao.includes(valorPesquisa) || categoria.includes(valorPesquisa) ? criarCard(element, vitrine) : false
        })
    } 
})

// Evento do botão de compra

function addCarrinho (event) {
    let id = event.target.id;

    if (event.target.tagName == "BUTTON") {
        produtos.forEach(element => {
            if (element.id == id) {
                const tagLi     = document.createElement("li");
                const tagDiv1   = document.createElement("div");
                const tagImg    = document.createElement("img");
                const tagDiv2   = document.createElement("div");
                const tagDiv3   = document.createElement("div");
                const tagH3     = document.createElement("h3");
                const tagButton = document.createElement("button");
                const tagP      = document.createElement("p");
                const tagSpan   = document.createElement("span");

                tagDiv1.setAttribute("class", "carrinho__imagem");
                tagDiv2.setAttribute("class", "carrinho__nome");
                tagDiv3.setAttribute("class", "carrinho__descricao");

                tagImg.src          = element.img;
                tagH3.innerText     = element.nome;
                tagButton.innerText = "X";
                tagP.innerText      = element.secao;
                tagSpan.innerText   = `R$${element.preco}.00`;

                tagDiv1.appendChild(tagImg);

                tagDiv2.appendChild(tagH3);
                tagDiv2.appendChild(tagButton);

                tagDiv3.appendChild(tagDiv2);
                tagDiv3.appendChild(tagP);
                tagDiv3.appendChild(tagSpan);

                tagLi.append(tagDiv1, tagDiv3);

                // Contador

                carrinhoInfo.innerHTML  = "";
                carrinhoVazio.innerHTML = "";
                
                quantidade += 1;
                total      += element.preco;

                let tagDivQuantidade = document.createElement("div");
                tagDivQuantidade.classList.add("quantidade");
                let tagDivPreco      = document.createElement("div");
                tagDivPreco.classList.add("preco");

                let tagQuantidade1     = document.createElement("p");
                tagQuantidade1.innerText = "Quantidade:"

                let tagQuantidade2     = document.createElement("span");
                tagQuantidade2.innerText = quantidade;
                
                let tagPreco1     = document.createElement("p");
                tagPreco1.innerText = "Preço:"

                let tagPreco2     = document.createElement("span");
                tagPreco2.innerText = `R$ ${total}.00`
                
                tagDivQuantidade.appendChild(tagQuantidade1);
                tagDivQuantidade.appendChild(tagQuantidade2);
                tagDivPreco.appendChild(tagPreco1);
                tagDivPreco.appendChild(tagPreco2);

                carrinhoInfo.append(tagDivQuantidade, tagDivPreco);

                return carrinho.appendChild(tagLi);
            }
        })
    }
}
vitrine.addEventListener("click", addCarrinho)

function removeCarrinho (event) {
    if (event.target.tagName == "BUTTON") {
        event.target.parentElement.parentElement.parentElement.remove()
        
        quantidade -= 1;
        total      -= (+event.target.parentElement.parentElement.children[2].innerText.slice(-4).trim())
    
        carrinhoInfo.innerHTML = "";
        carrinhoVazio.innerHTML     = "";
    
        
        let tagDivQuantidade = document.createElement("div");
        tagDivQuantidade.classList.add("quantidade");
        let tagDivPreco      = document.createElement("div");
        tagDivPreco.classList.add("preco");
    
        let tagQuantidade1     = document.createElement("p");
        tagQuantidade1.innerText = "Quantidade:"
    
        let tagQuantidade2     = document.createElement("span");
        tagQuantidade2.innerText = quantidade;
                    
        let tagPreco1     = document.createElement("p");
        tagPreco1.innerText = "Preço:"
    
        let tagPreco2     = document.createElement("span");
        tagPreco2.innerText = `R$ ${total}.00`
                    
        tagDivQuantidade.appendChild(tagQuantidade1);
        tagDivQuantidade.appendChild(tagQuantidade2);
        tagDivPreco.appendChild(tagPreco1);
        tagDivPreco.appendChild(tagPreco2);
        
        carrinhoInfo.append(tagDivQuantidade, tagDivPreco);
    
        if (quantidade == 0) {
            carrinhoInfo.innerHTML = ""
    
            const tagImg = document.createElement("img");
            const tagP   = document.createElement("p");
    
            tagImg.src     = "./src/img/bag.svg";
            tagP.innerText = "Por enquanto não temos produtos no carrinho";
            carrinhoVazio.append(tagImg, tagP);
        }
    }
}
carrinho.addEventListener("click", removeCarrinho)