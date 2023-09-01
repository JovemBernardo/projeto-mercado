import { catalogo } from "./utilidades";

const idsProdutoCarrinhoComQuantidade = {}

function abrirCarrinho (){
    document.getElementById("carrinho").classList.add("right-[0px]");
    document.getElementById("carrinho").classList.remove("right-[-360px]");
}

function fecharCarrinho (){
    document.getElementById("carrinho").classList.remove("right-[0px]");
    document.getElementById("carrinho").classList.add("right-[-360px]");
}

export function inicializarCarrinho(){
    const botaoFecharCarrinho = document.getElementById("fechar-carrinho");
    const botaoAbrirCarrinho = document.getElementById("abrir-carrinho");

    botaoFecharCarrinho.addEventListener("click", fecharCarrinho);
    botaoAbrirCarrinho.addEventListener("click", abrirCarrinho);
}

function removerProdutoCarrinho(idProduto){
    delete idsProdutoCarrinhoComQuantidade[idProduto];
    renderizarProdutoCarrinho();
}

function incrementarQuandidadeProduto(idProduto){
    idsProdutoCarrinhoComQuantidade[idProduto]++;
    atualizarQuantidade(idProduto);
}

function decrementarQuandidadeProduto(idProduto){
    if(idsProdutoCarrinhoComQuantidade[idProduto] === 1){
        removerProdutoCarrinho(idProduto);
        return;
    }
    idsProdutoCarrinhoComQuantidade[idProduto]--;
    atualizarQuantidade(idProduto);
}

function atualizarQuantidade(idProduto){
    document.getElementById(`quantidade-${idProduto}`).innerText = idsProdutoCarrinhoComQuantidade[idProduto];
}

function desenharProdutoCarrinho(idProduto){
    const produto = catalogo.find((p) => p.id === idProduto);
    const containerProdutosCarrinho = document.getElementById("produtos-carrinho");
    
    const elementoArticle = document.createElement("article");
    const articleClasses = [
        "flex",
        "bg-slate-100",
        "rounded-lg",
        "p-1",
        "relative"
    ];
    
    for (const articleClass of articleClasses){
        elementoArticle.classList.add(articleClass);
    }

    const cartaoProdutoCarrinho = `
        <button id="remover-item-${produto.id}" class="absolute top-0 right-2"><i class="fa-solid fa-xmark text-slate-900 hover:text-red-500"></i></button>
        <img src="./assets/img/${produto.imagem}" alt="${produto.nome}" class="h-24 rounded-lg	">
        <div class="p-2 flex flex-col justify-between">
            <p class="text-slate-900 text-sm">${produto.nome}</p>
            <p class="text-slate-500 text-xs">Tamanho: M</p>
            <p class="text-green-600 text-lg">$${produto.preco}</p>
        </div>
        <div class="flex text-slate-950 items-end absolute bottom-0 right-2 text-lg">
            <button id="decrementarProduto-${produto.id}" class=""> - </button>
            <p id="quantidade-${produto.id}" class="ml-2"> ${idsProdutoCarrinhoComQuantidade[produto.id]} </p>
            <button id="incrementarProduto-${produto.id}" class="ml-2"> + </button>

        </div>
  `;

  elementoArticle.innerHTML = cartaoProdutoCarrinho;
  containerProdutosCarrinho.appendChild(elementoArticle);

  document.getElementById(`decrementarProduto-${produto.id}`).addEventListener("click", () => decrementarQuandidadeProduto(produto.id));
  document.getElementById(`incrementarProduto-${produto.id}`).addEventListener("click", () => incrementarQuandidadeProduto(produto.id));
  document.getElementById(`remover-item-${produto.id}`).addEventListener("click", () => removerProdutoCarrinho(produto.id));
}

function renderizarProdutoCarrinho(){
    const containerProdutosCarrinho = document.getElementById("produtos-carrinho");
    containerProdutosCarrinho.innerHTML = "";

    for (const idProduto in idsProdutoCarrinhoComQuantidade){
        desenharProdutoCarrinho(idProduto);
    }
}

export function adicionarAoCarrinho(idProduto){
    if (idProduto in idsProdutoCarrinhoComQuantidade) {
        incrementarQuandidadeProduto(idProduto);
        return 0;
    }
    idsProdutoCarrinhoComQuantidade[idProduto] = 1;
    desenharProdutoCarrinho(idProduto);
}