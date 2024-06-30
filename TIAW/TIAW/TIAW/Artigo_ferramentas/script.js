document.addEventListener("DOMContentLoaded", () => {
    const currentUserId = localStorage.getItem('currentUserId');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const articles = JSON.parse(localStorage.getItem('articles')) || [];
    const userFavorites = JSON.parse(localStorage.getItem('userFavorites')) || {};

    // Função para obter o e-mail do usuário pelo ID
    function getUserEmailById(userId) {
        const user = users.find(user => user.id == userId);
        return user ? user.email : null;
    }

    // Função para adicionar artigo aos favoritos do usuário
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

    // Função para remover artigo dos favoritos do usuário
    function removeFromUserFavorites(userId, articleId) {
        const userEmail = getUserEmailById(userId);
        if (!userEmail) return;

        userFavorites[userEmail] = userFavorites[userEmail].filter(item => item.id !== articleId);
        localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
    }

    // Função para manipular o clique no ícone de coração
    function setupFavoriteIconClickListener() {
        document.querySelectorAll('.favorite-icon').forEach(icon => {
            icon.addEventListener('click', function () {
                if (!currentUserId) {
                    // Exibir mensagem de alerta se o usuário não estiver logado
                    document.getElementById('login-alert').style.display = 'block';
                    return;
                }

                this.classList.toggle('filled');
                const isFilled = this.classList.contains('filled');
                const articleId = this.getAttribute('data-id'); // ID do artigo
                const articleDescription = this.getAttribute('data-description'); // Descrição do artigo
                const articleUrl = this.getAttribute('data-url'); // URL do artigo

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

    // Verificar o estado inicial dos ícones de coração
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

    // Função para renderizar os favoritos
    function renderFavoritos() {
        const fileGrid = document.getElementById("file-grid");
        fileGrid.innerHTML = '';

        const userEmail = getUserEmailById(currentUserId);
        console.log('userEmail:', userEmail);

        if (!userEmail || !userFavorites[userEmail] || userFavorites[userEmail].length === 0) {
            const noFavoritosMessage = document.createElement("div");
            noFavoritosMessage.classList.add("no-favorites-message");
            noFavoritosMessage.textContent = "Você não possui nenhum item favoritado";
            fileGrid.appendChild(noFavoritosMessage);
            return;
        }

        userFavorites[userEmail].forEach((favorite, index) => {
            const articleData = articles.find(article => article.id === favorite.id);
            console.log('articleData:', articleData);

            if (articleData) {
                const fileItem = document.createElement("div");
                fileItem.classList.add("file");
                fileItem.innerHTML = `
                    <div>
                        <a href="${favorite.url}" target="_blank">${favorite.description}</a>
                    </div>
                    <i class="fas fa-heart favorited favorite-icon" data-id="${favorite.id}" data-index="${index}"></i>
                `;
                fileGrid.appendChild(fileItem);
            } else {
                console.error(`Artigo não encontrado: ${favorite.id}`);
            }
        });

        document.querySelectorAll('.favorite-icon').forEach(icon => {
            icon.addEventListener('click', () => {
                const articleId = icon.getAttribute('data-id');
                removeFavorito(articleId);
            });
        });
    }

    setupFavoriteIconClickListener();
    checkInitialFavoriteState();
    renderFavoritos();
});

document.getElementById('simuladorForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o envio do formulário

    // Obtém os valores dos campos
    const sonho = document.getElementById('sonho').value;
    const custo = parseFloat(document.getElementById('custo').value);
    const guardado = parseFloat(document.getElementById('guardado').value);
    const guardarMes = parseFloat(document.getElementById('guardarMes').value);
    const taxaRendimento = parseFloat(document.getElementById('taxaRendimento').value);
    const prazo = parseInt(document.getElementById('prazo').value);

    // Valida os campos
    if (isNaN(custo) || isNaN(guardado) || isNaN(guardarMes) || isNaN(taxaRendimento) || isNaN(prazo)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Calcula o valor necessário para realizar o sonho
    let valorNecessario = custo - guardado;
    let valorAcumulado = guardado;
    let mesesRestantes = 0;

    while (valorAcumulado < custo && mesesRestantes < prazo) {
        valorAcumulado += guardarMes + (valorAcumulado * taxaRendimento);
        mesesRestantes++;
    }

    if (valorAcumulado >= custo) {
        // Exibe o resultado de sucesso
        document.getElementById('valorSonho').textContent = `R$ ${custo.toFixed(2)}`;
        document.getElementById('mesesRestantes').textContent = `${mesesRestantes}`;
        document.getElementById('resultadoSucesso').style.display = 'block';
        document.getElementById('resultadoFracasso').style.display = 'none';
    } else {
        // Calcula o tempo necessário se não for possível no prazo desejado
        while (valorAcumulado < custo) {
            valorAcumulado += guardarMes + (valorAcumulado * taxaRendimento);
            mesesRestantes++;
        }

        // Exibe o resultado de fracasso
        document.getElementById('valorSonhoFracasso').textContent = `R$ ${custo.toFixed(2)}`;
        document.getElementById('mesesRestantesFracasso').textContent = `${mesesRestantes}`;
        document.getElementById('resultadoFracasso').style.display = 'block';
        document.getElementById('resultadoSucesso').style.display = 'none';
    }

    document.getElementById('resultado').style.display = 'block';
});

function createMovingPhrases(times) {
    const container = document.getElementById('container');
    for (let i = 0; i < times; i++) {
        const phrase = document.createElement('div');
        phrase.classList.add('phrase');
        phrase.style.animationDelay = `${i * 5}s`; // Atraso para cada frase
        phrase.textContent = "Acredite nós seus sonhos!";
        container.appendChild(phrase);
    }
}

// Chamando a função para exibir a frase 5 vezes
createMovingPhrases(1);