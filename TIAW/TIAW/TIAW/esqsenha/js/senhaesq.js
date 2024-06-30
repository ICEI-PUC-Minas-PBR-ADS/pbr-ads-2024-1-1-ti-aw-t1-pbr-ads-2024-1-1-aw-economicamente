$(document).ready(function () {
  // Toggle password visibility
  function togglePasswordVisibility(toggleId, passwordFieldId) {
      $(toggleId).on('click', function () {
          const passwordField = $(passwordFieldId);
          const type = passwordField.attr('type') === 'password' ? 'text' : 'password';
          passwordField.attr('type', type);
          $(this).text(type === 'password' ? '👁️' : '🙈');
      });
  }

  togglePasswordVisibility('#toggleNewPassword', '#newPassword');
  togglePasswordVisibility('#toggleConfirmPassword', '#confirmPassword');

  // Form submission handling
  $('#resetForm').on('submit', function (event) {
      event.preventDefault();

      const username = $('#username').val().trim();
      const email = $('#email').val().trim();
      const newPassword = $('#newPassword').val().trim();
      const confirmPassword = $('#confirmPassword').val().trim();
      const users = JSON.parse(localStorage.getItem('users')) || [];
      const resetMessage = $('#resetMessage');

      if (newPassword !== confirmPassword) {
          resetMessage.text('As senhas não coincidem.').addClass('text-danger');
          return;
      }

      const user = users.find(user => user.email === email && user.nome === username);

      if (user) {
          user.senha = newPassword;
          localStorage.setItem('users', JSON.stringify(users));
          resetMessage.text('Senha alterada com sucesso!').addClass('text-success');
          setTimeout(() => {
              window.location.href = '../login/loginpage.html';
          }, 1500);
      } else {
          resetMessage.text('Usuário ou email não encontrado.').addClass('text-danger');
      }
  });
});
