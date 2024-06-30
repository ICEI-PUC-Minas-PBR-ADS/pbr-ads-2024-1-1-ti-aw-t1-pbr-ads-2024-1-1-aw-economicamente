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

function calculateTax() {
  let salaryInput = document.getElementById('salary').value;
  let salary = parseFloat(salaryInput.replace(/\./g, '').replace(',', '.'));
  const hasVale = document.getElementById('vale-transporte').value === 'sim';

  if (isNaN(salary) || salary <= 0) {
      alert('Por favor, insira um salário bruto válido.');
      return;
  }

  // Cálculo do INSS (2024)
  let inss;
  if (salary <= 1320) {
      inss = salary * 0.075;
  } else if (salary <= 2571.29) {
      inss = 1320 * 0.075 + (salary - 1320) * 0.09;
  } else if (salary <= 3856.94) {
      inss = 1320 * 0.075 + (2571.29 - 1320) * 0.09 + (salary - 2571.29) * 0.12;
  } else if (salary <= 7507.49) {
      inss = 1320 * 0.075 + (2571.29 - 1320) * 0.09 + (3856.94 - 2571.29) * 0.12 + (salary - 3856.94) * 0.14;
  } else {
      inss = 828.39;
  }

  // Cálculo do IRRF (2024)
  let irrfBase = salary - inss;
  let irrf;
  if (irrfBase <= 1903.98) {
      irrf = 0;
  } else if (irrfBase <= 2826.65) {
      irrf = irrfBase * 0.075 - 142.80;
  } else if (irrfBase <= 3751.05) {
      irrf = irrfBase * 0.15 - 354.80;
  } else if (irrfBase <= 4664.68) {
      irrf = irrfBase * 0.225 - 636.13;
  } else {
      irrf = irrfBase * 0.275 - 869.36;
  }

  // Cálculo do Vale-Transporte
  let vale = hasVale ? salary * 0.06 : 0;

  // Salário Líquido
  let netSalary = salary - inss - irrf - vale;

  // Exibir resultados
  document.getElementById('inss').textContent = formatCurrency(inss);
  document.getElementById('irrf').textContent = formatCurrency(irrf);
  document.getElementById('vale').textContent = formatCurrency(vale);
  document.getElementById('net-salary').textContent = formatCurrency(netSalary);

  // Exibir a tabela
  document.getElementById('result').style.display = 'block';

  // Criar gráfico
  const ctx = document.getElementById('taxChart').getContext('2d');
  new Chart(ctx, {
      type: 'pie',
      data: {
          labels: ['INSS', 'IRRF', 'Vale-Transporte', 'Salário Líquido'],
          datasets: [{
              label: 'Distribuição de Descontos',
              data: [inss, irrf, vale, netSalary],
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          }]
      },
      options: {
          responsive: true,
          plugins: {
              legend: {
                  position: 'top',
              },
              tooltip: {
                  callbacks: {
                      label: function(tooltipItem) {
                          return tooltipItem.label + ': ' + formatCurrency(tooltipItem.raw);
                      }
                  }
              }
          }
      }
  });
}

document.getElementById('salary').addEventListener('input', function (e) {
  let value = e.target.value;
  value = value.replace(/\D/g, '');
  value = (value / 100).toFixed(2) + '';
  value = value.replace('.', ',');
  value = value.replace(/(\d)(?=(\d{3})+\,)/g, '$1.');
  e.target.value = value;
});




// Abixo-Api-CoinGecko API

async function fetchPrices() {
    try {
        
        let response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true');
        let data = await response.json();
        let bitcoinPrice = data.bitcoin.usd;
        let bitcoinChange = data.bitcoin.usd_24h_change.toFixed(2);
        let bitcoinVolume = (data.bitcoin.usd_24h_vol / 1e9).toFixed(2) + ' B';
        let bitcoinMarketCap = (data.bitcoin.usd_market_cap / 1e9).toFixed(2) + ' B';


        response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        data = await response.json();
        let dollarPrice = data.rates.BRL;

        document.getElementById('bitcoin-price').innerText = '$' + bitcoinPrice.toLocaleString();
        document.getElementById('bitcoin-change').innerText = bitcoinChange + '%';
        document.getElementById('bitcoin-change').style.color = bitcoinChange < 0 ? 'red' : 'green';
        document.getElementById('bitcoin-volume').innerText = bitcoinVolume;
        document.getElementById('bitcoin-marketcap').innerText = bitcoinMarketCap;

        document.getElementById('dollar-price').innerText = 'R$' + dollarPrice.toFixed(2);

      
        let ctxBitcoin = document.getElementById('bitcoin-chart').getContext('2d');
        new Chart(ctxBitcoin, {
            type: 'line',
            data: {
                labels: ['1d', '2d', '3d', '4d', '5d', '6d', '7d'],
                datasets: [{
                    label: 'Bitcoin',
                    data: [32000, 33000, 31000, 34000, 36000, 37000, bitcoinPrice],
                    borderColor: 'red',
                    fill: false,
                }]
            },
            options: {
                scales: {
                    x: { display: false },
                    y: { display: false },
                },
                plugins: {
                    legend: { display: false },
                },
                elements: {
                    line: { tension: 0.4 },
                    point: { radius: 0 }
                }
            }
        });

        let ctxDollar = document.getElementById('dollar-chart').getContext('2d');
        new Chart(ctxDollar, {
            type: 'line',
            data: {
                labels: ['1d', '2d', '3d', '4d', '5d', '6d', '7d'],
                datasets: [{
                    label: 'Dollar',
                    data: [5.10, 5.12, 5.08, 5.15, 5.18, 5.20, dollarPrice],
                    borderColor: 'blue',
                    fill: false,
                }]
            },
            options: {
                scales: {
                    x: { display: false },
                    y: { display: false },
                },
                plugins: {
                    legend: { display: false },
                },
                elements: {
                    line: { tension: 0.4 },
                    point: { radius: 0 }
                }
            }
        });
    } catch (error) {
        console.error('Error fetching prices:', error);
    }
}