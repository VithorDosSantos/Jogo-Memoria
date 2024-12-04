const simbolos = [
 '😗','😗','🤣','🤣','😢','😢','😁','😁','🤗','🤗','🤷‍♂️','🤷‍♂️'
];

let pontuacao = 0;
let vidas = 3;
let cartasViradas = [];
let cartasCombinadas = [];
let jogoIniciado = false;

const embaralharArray = (array) => array.sort(() => Math.random() - 0.5);

const atualizarPontuacao = (pontos) => {
  pontuacao = Math.max(0, pontuacao + pontos);
  document.getElementById("pontuacao").textContent = `Pontuação: ${pontuacao}`;
};

const atualizarVidas = () => {
  document.getElementById("vidas").textContent = `Vidas restantes: ${vidas}`;
};

const finalizarJogo = (mensagem) => {
  setTimeout(() => {
    alert(mensagem);
    jogoIniciado = false;
    document.getElementById("botao-iniciar").style.display = "block";
  }, 500);
};

const criarCarta = (simbolo) => {
  const carta = document.createElement("div");
  carta.classList.add("card");

  const cartaInner = document.createElement("div");
  cartaInner.classList.add("card-inner");

  const cartaCostas = document.createElement("div");
  cartaCostas.classList.add("card-costas");
  const imgCostas = document.createElement("img");
  imgCostas.src = "https://media-for2-1.cdn.whatsapp.net/v/t61.24694-24/74917334_201143451048333_3348140587941277975_n.jpg?ccb=11-4&oh=01_Q5AaIC44xLpn3Yn-4MKFdeu8eIyDhSIujGPaB3i56Waa4Dc_&oe=6755F618&_nc_sid=5e03e0&_nc_cat=100";
  imgCostas.alt = "Verso da carta";
  cartaCostas.appendChild(imgCostas);

  const cartaFrente = document.createElement("div");
  cartaFrente.classList.add("card-frente");
  cartaFrente.textContent = simbolo;
  cartaInner.appendChild(cartaCostas);
  cartaInner.appendChild(cartaFrente);
  carta.appendChild(cartaInner);

  carta.addEventListener("click", () => {
    if (jogoIniciado) virarCarta(carta, simbolo);
  });

  return carta;
};

const virarCarta = (carta, simbolo) => {
  if (cartasViradas.length === 2 || cartasCombinadas.includes(carta)) return;

  carta.classList.add("virada");
  cartasViradas.push({ carta, simbolo });

  if (cartasViradas.length === 2) {
    const [primeira, segunda] = cartasViradas;
    if (primeira.simbolo === segunda.simbolo) {
      cartasCombinadas.push(primeira.carta, segunda.carta);
      atualizarPontuacao(3);
      cartasViradas = [];
      if (cartasCombinadas.length === simbolos.length) {
        finalizarJogo("Parabéns! Você ganhou!");
      }
    } else {
      vidas--;
      atualizarPontuacao(-2);
      atualizarVidas();
      setTimeout(() => {
        primeira.carta.classList.remove("virada");
        segunda.carta.classList.remove("virada");
        cartasViradas = [];
        if (vidas === 0) {
          finalizarJogo("Você perdeu! Tente novamente.");
        }
      }, 1000);
    }
  }
};

const inicializarJogo = () => {
  const tabuleiro = document.getElementById("tabuleiro");
  tabuleiro.innerHTML = "";
  embaralharArray(simbolos).forEach((simbolo) => {
    const carta = criarCarta(simbolo);
    tabuleiro.appendChild(carta);
  });
  pontuacao = 0;
  atualizarPontuacao(0);
  vidas = 3;
  atualizarVidas();
  cartasCombinadas = [];
  cartasViradas = [];
  jogoIniciado = false;
};

const iniciarJogo = () => {
  jogoIniciado = true;
  document.getElementById("botao-iniciar").style.display = "none";
  const cartas = document.querySelectorAll(".card");
  cartas.forEach((carta) => carta.classList.add("virada"));

  setTimeout(() => {
    cartas.forEach((carta) => carta.classList.remove("virada"));
  }, 2000);
};

document.getElementById("botao-iniciar").addEventListener("click", () => {
  inicializarJogo();
  iniciarJogo();
});

inicializarJogo();
