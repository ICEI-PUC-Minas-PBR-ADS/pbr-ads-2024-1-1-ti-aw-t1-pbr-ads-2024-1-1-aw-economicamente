document.addEventListener("DOMContentLoaded", () => {
    const currentUserId = localStorage.getItem('currentUserId');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const articles = JSON.parse(localStorage.getItem('articles')) || [
        { id: "1", description: "Artigo de Ferramentas" },
        { id: "2", description: "Ebooks e Cursos" }
    ];
    const userFavorites = JSON.parse(localStorage.getItem('userFavorites')) || {};

    function getUserEmailById(userId) {
        const user = users.find(user => user.id == userId);
        return user ? user.email : null;
    }

    function addToUserFavorites(userId, article) {
        const userEmail = getUserEmailById(userId);
        if (!userEmail) return;

        if (!userFavorites[userEmail]) {
            userFavorites[userEmail] = [];
        }

        const userArticleExists = userFavorites[userEmail].find(item => item.id === article.id);

        if (!userArticleExists) {
            userFavorites[userEmail].push(article);
            localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
        }
    }

    function removeFromUserFavorites(userId, articleId) {
        const userEmail = getUserEmailById(userId);
        if (!userEmail) return;

        userFavorites[userEmail] = userFavorites[userEmail].filter(item => item.id !== articleId);
        localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
    }

    function setupFavoriteIconClickListener() {
        document.querySelectorAll('.favorite-icon').forEach(icon => {
            icon.addEventListener('click', function () {
                if (!currentUserId) {
                    document.getElementById('login-alert').style.display = 'block';
                    return;
                }

                this.classList.toggle('filled');
                const isFilled = this.classList.contains('filled');
                const articleId = this.getAttribute('data-id');
                const articleDescription = this.getAttribute('data-description');
                const articleUrl = this.getAttribute('data-url');

                const article = {
                    id: articleId,
                    description: articleDescription,
                    url: articleUrl
                };

                if (isFilled) {
                    addToUserFavorites(currentUserId, article);
                } else {
                    removeFromUserFavorites(currentUserId, articleId);
                }
            });
        });
    }

    function checkInitialFavoriteState() {
        if (!currentUserId) return;

        const userEmail = getUserEmailById(currentUserId);
        if (!userEmail) return;

        const favorites = userFavorites[userEmail] || [];
        favorites.forEach(article => {
            document.querySelectorAll(`.favorite-icon[data-id='${article.id}']`).forEach(icon => {
                icon.classList.add('filled');
            });
        });
    }

    setupFavoriteIconClickListener();
    checkInitialFavoriteState();
});

function lerDadosDoBancoDeDados() {
    let strDados = localStorage.getItem('db');
    let objDados = {};

    if (strDados) {
        objDados = JSON.parse(strDados);
    } else {
        objDados = {
            Cursos: [
                { nome: "Introdução à Economia", imagem: "https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w", descricao: "Minha descricao do curso", autor: "Varios autores", data: "06/01/2009", url: "https://www.baixelivros.com.br/ciencias-exatas/administracao/introducao-a-economia#google_vignette" },
                { nome: "Imposto do futuro? Considerações sobre o ISS e a base de serviços", imagem: "https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w", descricao: "Minha descricao do curso", autor: "Por Kleber Pacheco de Castro", data: "23/05/2020", url: "https://portalibre.fgv.br/sites/default/files/2020-12/12ce2020-kleber-pacheco.pdf" },
                { nome: "O que é Investimento?", imagem: "https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w", descricao: "Minha descricao do curso", autor: "Aloisio Campelo Jr", data: "17/02/2020", url: "https://portalibre.fgv.br/sites/default/files/2020-03/o-que-_-investimento-preliminar-v8-para-o-site.pdf" },
                { nome: "Política comercial e a política externa: desencontros a serem evitados", imagem: "https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w", descricao: "Minha descricao do curso", autor: "Lia Baker Valls Pereira", data: "17/01/2020", url: "https://portalibre.fgv.br/sites/default/files/2020-04/lia-baker-valls-pereira-conjuntura-economica-2020-01-baixa_0.pdf" },
                { nome: "Imposto do futuro? Considerações sobre o ISS e a base de serviços", imagem: "https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w", descricao: "Minha descricao do curso", autor: "Lia Baker Valls Pereira", data: "18/01/2019", url: "https://portalibre.fgv.br/sites/default/files/2020-03/lia-valls.pdf" },
                { nome: "Compreendendo a economia brasileira de plataforma: tendências e desafios regulatórios", imagem: "https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w", descricao: "Minha descricao do curso", autor: "Silva Neto, Victo José da; Chiarini", data: "20/05/2024", url: "https://www.scielo.br/j/neco/a/5fqYyrC58McVycPtcCcnrmv/?format=pdf&lang=en" },
                { nome: "Economia mineira em um mundo em transformação: atraso tecnológico e dilemas recentes", imagem: "https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w", descricao: "Minha descricao do curso", autor: "Frederico G. Jayme Jr.", data: "18/11/2023", url: "https://www.scielo.br/j/neco/a/39zRpxBjW9MTGnMTyMMHk7H/?format=pdf&lang=pt" },
                { nome: "Desigualdade de desempenho no ensino médio: evidências sobre a educação de jovens e adultos", imagem: "https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w", descricao: "Minha descricao do curso", autor: "Mariano, Francisca Zilania", data: "18/11/2023", url: "https://portalibre.fgv.br/sites/default/files/2020-12/12ce2020-kleber-pacheco.pdf" }
            ]
        };
        salvarDadosNoBancoDeDados(objDados);
    }
    return objDados;
}

function salvarDadosNoBancoDeDados(dados) {
    localStorage.setItem('db', JSON.stringify(dados));
}

function incluirCursos() {
    let objDados = lerDadosDoBancoDeDados();
    imprimirDadosNaTela(objDados);
}

function imprimirDadosNaTela(objDados) {
    let tela = document.getElementById('tela');
    let strHtml = '';

    for (let i = 0; i < objDados.Cursos.length; i++) {
        strHtml += `
            <div class="col">
                <div class="article">
                    <div class="card">
                        <img src="${objDados.Cursos[i].imagem}" class="card-img-top" alt="Placeholder Image">
                        <div class="card-body">
                            <h5 class="card-title"><a href='${objDados.Cursos[i].url}'>${objDados.Cursos[i].nome}</a></h5>
                            <p class="card-text">${objDados.Cursos[i].autor}: ${objDados.Cursos[i].data}</p>
                            <button class="btn favorite-btn" data-index="${i}">Favoritar</button>
                        </div>
                    </div>
                </div>
            </div>`;
    }

    tela.innerHTML = strHtml;
    adicionarEventoFavoritar();
}

function adicionarEventoFavoritar() {
    const buttons = document.querySelectorAll('.favorite-btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const index = button.getAttribute('data-index');
            toggleFavorito(index);
            button.classList.toggle('favorited');
            const text = button.textContent === 'Favoritar' ? 'Favoritado' : 'Favoritar';
            button.textContent = text;
        });
    });
}

function toggleFavorito(index) {
    let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
    let objDados = lerDadosDoBancoDeDados();
    const curso = objDados.Cursos[index];

    const favoritoIndex = favoritos.findIndex(f => f.url === curso.url);
    if (favoritoIndex > -1) {
        favoritos.splice(favoritoIndex, 1);
    } else {
        favoritos.push(curso);
    }
    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

document.addEventListener('DOMContentLoaded', incluirCursos);
//navbar
$(document).ready(function () {
    $("#openSidebar").click(function (e) {
      e.preventDefault();
      $(".sidebar").toggleClass("active");
    });
  });
  document.getElementById("openSidebar").addEventListener("click", function() {
    document.getElementById("sidebar").classList.toggle("open");
  });
  function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
