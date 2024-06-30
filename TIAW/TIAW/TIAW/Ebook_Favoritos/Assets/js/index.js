document.addEventListener("DOMContentLoaded", () => {
  const fileGrid = document.getElementById("file-grid");
  const currentUserId = localStorage.getItem('currentUserId');
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const userFavorites = JSON.parse(localStorage.getItem('userFavorites')) || {};

  console.log('currentUserId:', currentUserId);
  console.log('users:', users);
  console.log('userFavorites:', userFavorites);

  if (!currentUserId) {
      console.error("User is not logged in.");
      document.getElementById('login-alert').style.display = 'block';
      return;
  }

  function getUserEmailById(userId) {
      const user = users.find(user => user.id == userId);
      return user ? user.email : null;
  }

  function renderFavoritos() {
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
          console.log('favorite:', favorite);

          if (favorite && favorite.url) {
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

  function removeFavorito(articleId) {
      const userEmail = getUserEmailById(currentUserId);
      if (userEmail) {
          userFavorites[userEmail] = userFavorites[userEmail].filter(item => item.id !== articleId);
          localStorage.setItem('userFavorites', JSON.stringify(userFavorites));
          renderFavoritos();
      }
  }

  renderFavoritos();
});
