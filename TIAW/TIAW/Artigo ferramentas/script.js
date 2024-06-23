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