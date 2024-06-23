function toggleSenha() {
    const senhaInput = document.getElementById('senha');
    const mostrarSenha = document.querySelector('.mostrar-senha');
    if (senhaInput.type === 'password') {
        senhaInput.type = 'text';
        mostrarSenha.textContent = '👁️';
    } else {
        senhaInput.type = 'password';
        mostrarSenha.textContent = '👁️';
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

function changeBackground() {
    document.body.style.background = "linear-gradient(270deg, #ffffff, #e0e0e0)";
    document.body.style.backgroundSize = "400% 400%";
    document.body.style.animation = "gradientAnimation 15s ease infinite";
}

document.getElementById('cadastroForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fields = ['nome', 'email', 'senha', 'data-nascimento', 'cep', 'logradouro', 'cidade', 'uf', 'numero'];
    let allFilled = true;

    const formData = {};

    fields.forEach(function(field) {
        const input = document.querySelector(`[name="${field}"]`);
        if (input.value.trim() === '') {
            allFilled = false;
            input.style.border = '2px solid red';
        } else {
            input.style.border = '';
            formData[field] = input.value;
        }
    });

    if (!allFilled) {
        alert('Por favor, preencha todos os campos.');
    } else {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.email === formData.email || user.senha === formData.senha);

        if (existingUser) {
            alert('Já existe um cadastro com este email ou senha.');
        } else {
            formData.id = new Date().getTime(); // Criando um ID único para o usuário
            users.push(formData);
            localStorage.setItem('users', JSON.stringify(users));
            alert('Dados cadastrados com sucesso!');
        }
    }
});
