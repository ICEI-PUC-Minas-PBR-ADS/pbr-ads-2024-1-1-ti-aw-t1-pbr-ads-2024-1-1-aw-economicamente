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
