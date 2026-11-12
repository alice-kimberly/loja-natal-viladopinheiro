//contador//
(function () {
    const caixas = document.getElementById("contagemCaixas");
    const msg = document.getElementById("msgNatal");

    if (!caixas) return;

    function contagemNatal() {
        const agora = new Date();
        let natal = new Date(agora.getFullYear(), 11, 25, 0, 0, 0);

        if (agora.getMonth() === 11 && agora.getDate() === 25) {
            caixas.style.display = "none";
            msg.textContent = "🎄 Feliz Natal! 🎅";
            return;
        }

        if (agora > natal) {
            natal = new Date(agora.getFullYear() + 1, 11, 25, 0, 0, 0);
        }

        caixas.style.display = "flex";
        msg.textContent = "";

        const diff = natal - agora;

        document.getElementById("dias").textContent = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById("horas").textContent = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, "0");
        document.getElementById("minutos").textContent = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, "0");
        document.getElementById("segundos").textContent = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
    }

    contagemNatal();
    setInterval(contagemNatal, 1000);
})();

//Página Inicial//
const neve = document.querySelector('.neve');
const botaoNeve = document.querySelector('#botaoNeve');

let neveAtiva = false;

botaoNeve.addEventListener('click', () => {

    neveAtiva = !neveAtiva;

    if (neveAtiva) {

        neve.innerHTML = '';

        for (let i = 0; i < 500; i++) {

            const floco = document.createElement('span');

            floco.classList.add('floco');
            floco.innerHTML = '❄';

            floco.style.left = Math.random() * 100 + '%';
            floco.style.fontSize = (Math.random() * 12 + 8) + 'px';
            floco.style.opacity = Math.random();
            floco.style.animationDuration = (Math.random() * 10 + 5) + 's';
            floco.style.animationDelay = (Math.random() * -15) + 's';

            neve.appendChild(floco);
        }

        botaoNeve.innerHTML = '❄ Desativar neve';

    } else {

        neve.innerHTML = '';

        botaoNeve.innerHTML = '❄ Ativar neve';
    }
});

const fundo = document.querySelector('.fundo');
const meio = document.querySelector('.meio');
const frente = document.querySelector('.frente');

window.addEventListener('scroll', () => {

    const scroll = window.scrollY;

    fundo.style.transform =
        `translateY(${-scroll * 0.10}px)`;

    meio.style.transform =
        `translateY(${-scroll * 0.15}px)`;

    frente.style.transform =
        `translateY(${-scroll * 0.20}px)`;

});

let slideAtual = 0;

const slides = document.querySelector('.slides');
const imagens = document.querySelectorAll('.slides img');
const indicadores = document.querySelectorAll('.indicadores span');

function mostrarSlide() {

    slides.style.transform =
        `translateX(-${slideAtual * 100}%)`;

    indicadores.forEach((indicador, index) => {
        indicador.classList.toggle('ativo', index === slideAtual);
    });

}

function mudarSlide(direcao) {

    slideAtual += direcao;

    if (slideAtual >= imagens.length) {
        slideAtual = 0;
    }

    if (slideAtual < 0) {
        slideAtual = imagens.length - 1;
    }

    mostrarSlide();

}

function irSlide(numero) {

    slideAtual = numero;
    mostrarSlide();

}

mostrarSlide();

//Página de produtos//
function pesquisarProdutos() {
    const campo = document.getElementById("campoPesquisa");
    const pesquisa = campo.value.toLowerCase().trim();

    const produtos = document.querySelectorAll(".produto");

    produtos.forEach(produto => {
        const nome = produto.querySelector(".produto-card").textContent.toLowerCase();

        if (pesquisa === "" || nome.includes(pesquisa)) {
            produto.style.removeProperty("display");
        } else {
            produto.style.display = "none";
        }
    });
}

function controlarMusica() {
    const musica = document.getElementById("musicaFundo");
    const botao = document.getElementById("botaoMusica");

    musica.volume = 0.2;

    if (musica.paused) {
        musica.play()
            .then(() => {
                botao.textContent = "⏸ Pausar música";
            })
            .catch(erro => {
                console.log("Erro:", erro);
            });
    } else {
        musica.pause();
        botao.textContent = "🎵 Tocar música";
    }
}