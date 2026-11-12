
let carrinho = [];

// Adicionar produto
document.querySelectorAll(".adicionar-carrinho").forEach(botao => {

    botao.addEventListener("click", () => {

        const card = botao.closest(".produto-card");

        const nome = card.querySelector(".produto-conteudo").textContent;
        const preco = Number(card.dataset.preco);

        const existente = carrinho.find(item => item.nome === nome);

        if (existente) {
            existente.quantidade++;
        } else {
            carrinho.push({
                nome: nome,
                preco: preco,
                quantidade: 1
            });
        }

        atualizarCarrinho();
        tocarSino();

    });

});

// Mostrar os produtos
function atualizarCarrinho() {

    const lista = document.getElementById("listaCarrinho");
    const totalElemento = document.getElementById("totalCarrinho");

    lista.innerHTML = "";

    let total = 0;

    if (carrinho.length === 0) {
        lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
    }

    carrinho.forEach((item, index) => {

        const produto = document.createElement("div");

        const nome = document.createElement("h3");
        nome.textContent = item.nome;

        const preco = document.createElement("p");
        preco.textContent = "R$ " +
            (item.preco * item.quantidade).toFixed(2).replace(".", ",");

        const quantidade = document.createElement("p");
        quantidade.textContent = "Quantidade: " + item.quantidade;

        const remover = document.createElement("button");
        remover.textContent = "Remover";

        remover.addEventListener("click", () => {
            carrinho.splice(index, 1);
            atualizarCarrinho();
        });

        produto.append(nome, preco, quantidade, remover);
        lista.appendChild(produto);

        total += item.preco * item.quantidade;

    });

    totalElemento.textContent = total.toFixed(2).replace(".", ",");
    const quantidadeCarrinho = document.getElementById("quantidadeCarrinho");

let quantidadeTotal = 0;

carrinho.forEach(item => {
    quantidadeTotal += item.quantidade;
});

quantidadeCarrinho.textContent = quantidadeTotal;

}

function tocarSino() {
    const sino = new Audio("./sons/sino.mp3");

    sino.volume = 0.1;

    sino.currentTime = 0;

    sino.play().catch(erro => {
        console.log("Erro:", erro);
    });

     setTimeout(() => {
        sino.pause();
        sino.currentTime = 0;
    }, 1000);
}

// Limpar carrinho
document.getElementById("limparCarrinho").addEventListener("click", () => {

    carrinho = [];
    atualizarCarrinho();

});

// Abrir carrinho
document.getElementById("abrirCarrinho").addEventListener("click", () => {
    document.getElementById("meuCarrinho").style.display = "block";
});

// Fechar carrinho
document.getElementById("fecharCarrinho").addEventListener("click", () => {
    document.getElementById("meuCarrinho").style.display = "none";
});

