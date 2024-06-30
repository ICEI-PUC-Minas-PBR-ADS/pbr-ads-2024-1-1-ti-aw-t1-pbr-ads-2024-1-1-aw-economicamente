$(document).ready(function () {
  $('#username, #password').on('focus', function () {
    $(this).addClass('animate__animated animate__pulse');
  }).on('blur', function () {
    $(this).removeClass('animate__animated animate__pulse');
  });

  $('#forgotPasswordBtn').on('click', function () {
    $(this).addClass('animate__animated animate__pulse');
    setTimeout(() => {
      $(this).removeClass('animate__animated animate__pulse');
      window.location.href = "forgotPassword.html"; // Redirect to forgot password page
    }, 500); // Duration of the pulse animation
  });

  document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email);

    const loginMessage = document.getElementById('loginMessage');

    if (user) {
      if (user.senha === password) {
        loginMessage.style.color = 'green';
        loginMessage.textContent = 'Login realizado com sucesso!';
        // Definir currentUserId e redirecionar para a página do perfil
        localStorage.setItem('currentUserId', user.id);
        setTimeout(() => {
          window.location.href = '../home/index.html';
        }, 1000);
      } else {
        loginMessage.style.color = 'red';
        loginMessage.textContent = 'Senha incorreta. Tente novamente.';
      }
    } else {
      loginMessage.style.color = 'red';
      loginMessage.textContent = 'Usuário não encontrado. Verifique o email e tente novamente.';
    }
  });

  // Toggle password visibility
  const togglePassword = document.getElementById('togglePassword');
  const passwordField = document.getElementById('password');

  togglePassword.addEventListener('click', function () {
    // Toggle the type attribute using getAttribute() and setAttribute()
    const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordField.setAttribute('type', type);

    // Toggle the eye / monkey emoji
    this.textContent = type === 'password' ? '👁️' : '🙈';
  });
});
