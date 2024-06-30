document.addEventListener('DOMContentLoaded', () => {
    // Supondo que o ID do usuário esteja armazenado no Local Storage como 'currentUserId'
    const currentUserId = localStorage.getItem('currentUserId');
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const formData = users.find(user => user.id == currentUserId);

    if (formData) {
        document.getElementById('nome').value = formData.nome;
        document.getElementById('email').value = formData.email;
        document.getElementById('senha').value = formData.senha;
        document.getElementById('dataNascimento').value = formData['data-nascimento'];
        document.getElementById('cep').value = formData.cep;
        document.getElementById('numero').value = formData.numero;
        document.getElementById('uf').value = formData.uf;
        document.getElementById('cidade').value = formData.cidade;
        document.getElementById('logradouro').value = formData.logradouro;
        if (formData.avatar) {
            document.getElementById('user-avatar').src = formData.avatar;
        }
        document.getElementById('senha').type = 'password'; // Inicialmente oculta a senha
    } else {
        alert('Nenhum usuário encontrado');
    }
});

function logout() {
    localStorage.removeItem('currentUserId');
    alert('Você saiu');
    window.location.href = '../home/index.html';
}

function changeAvatar(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function() {
        const avatarUrl = reader.result;
        document.getElementById('user-avatar').src = avatarUrl;

        // Atualizar o avatar no Local Storage
        const currentUserId = localStorage.getItem('currentUserId');
        let users = JSON.parse(localStorage.getItem('users')) || [];
        let formData = users.find(user => user.id == currentUserId);
        if (formData) {
            formData.avatar = avatarUrl;
            localStorage.setItem('users', JSON.stringify(users));
        }
    };
    if (file) {
        reader.readAsDataURL(file);
    }
}

function editProfile() {
    const inputs = document.querySelectorAll('.profile-right .info input, .profile-left input');
    inputs.forEach(input => input.disabled = false);
    document.getElementById('edit-btn').style.display = 'none';
    document.getElementById('save-btn').style.display = 'inline';
}

function saveProfile() {
    const currentUserId = localStorage.getItem('currentUserId');
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let formData = users.find(user => user.id == currentUserId);

    if (formData) {
        formData.nome = document.getElementById('nome').value;
        formData.email = document.getElementById('email').value;
        formData.senha = document.getElementById('senha').value;
        formData['data-nascimento'] = document.getElementById('dataNascimento').value;
        formData.cep = document.getElementById('cep').value;
        formData.numero = document.getElementById('numero').value;
        formData.uf = document.getElementById('uf').value;
        formData.cidade = document.getElementById('cidade').value;
        formData.logradouro = document.getElementById('logradouro').value;

        localStorage.setItem('users', JSON.stringify(users));
        alert('Dados salvos com sucesso!');
    } else {
        alert('Nenhum usuário encontrado');
    }

    const inputs = document.querySelectorAll('.profile-right .info input, .profile-left input');
    inputs.forEach(input => input.disabled = true);
    document.getElementById('edit-btn').style.display = 'inline';
    document.getElementById('save-btn').style.display = 'none';
}

function toggleSenha() {
    const senhaElement = document.getElementById('senha');
    const eyeIcon = document.querySelector('.toggle-password');

    if (senhaElement.type === 'password') {
        senhaElement.type = 'text';
        eyeIcon.textContent = '🙈';
    } else {
        senhaElement.type = 'password';
        eyeIcon.textContent = '👁️';
    }
}

function buscarCep() {
    const cep = document.getElementById('cep').value.trim();
    if (cep === '') {
        alert('Por favor, preencha o campo CEP.');
        return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
                alert('CEP não encontrado.');
            } else {
                document.getElementById('logradouro').value = data.logradouro;
                document.getElementById('cidade').value = data.localidade;
                document.getElementById('uf').value = data.uf;
            }
        })
        .catch(error => {
            alert('Erro ao buscar o CEP.');
            console.error(error);
        });
}
