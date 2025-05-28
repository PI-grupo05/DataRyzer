function atualizarKPIs() {
    fetch('/kpiDashGeral/cidade-mais-afetada') 
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                document.querySelector('.cidade-mais-afetada-quedas').innerText = 
                    `Cidade mais afetada: ${data[0].cidade} (${data[0].total_interrupcoes} quedas)`;
            } else {
                document.querySelector('.cidade-mais-afetada-quedas').innerText = 
                    'Cidade mais afetada: Nenhuma interrupção registrada.';
            }
        })
        .catch(error => console.error('Erro ao obter cidade mais afetada:', error));

    fetch('/kpiDashGeral/cidade-maior-tempo-interrupcao') 
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                document.querySelector('.cidade-com-maior-tempo-de-interrup-o-mensal').innerText = 
                    `Cidade com maior tempo de interrupção: ${data[0].cidade} (${data[0].total_duracao} minutos)`;
            } else {
                document.querySelector('.cidade-com-maior-tempo-de-interrup-o-mensal').innerText = 
                    'Cidade com maior tempo de interrupção: Nenhuma interrupção registrada.';
            }
        })
        .catch(error => console.error('Erro ao obter cidade com maior tempo de interrupção:', error));
}

function carregarGraficos() {
 
    fetch('/kpiDashGeral/interrupcoes-por-cidade')
        .then(response => response.json())
        .then(data => {
            const labels = data.map(item => item.cidade);
            const valores = data.map(item => item.total_interrupcoes);

            new Chart(document.getElementById('graficoBarra1'), {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Número de Interrupções',
                        data: valores,
                        backgroundColor: 'rgba(54, 162, 235, 0.7)',
                        borderColor: 'rgba(54, 162, 235, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Comparação de quedas por cidade',
                            font: { size: 16 }
                        },
                        legend: { display: false },
                        datalabels: {
                            anchor: 'end',
                            align: 'top',
                            formatter: (value) => value,
                            font: { weight: 'bold' }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Número de Interrupções' }
                        },
                        x: {
                            title: { display: true, text: 'Cidades' }
                        }
                    }
                },
                plugins: [ChartDataLabels]
            });
        })
        .catch(error => console.error('Erro ao carregar gráfico de interrupções por cidade:', error));

 
    fetch('/kpiDashGeral/duracao-media-por-cidade')
        .then(response => response.json())
        .then(data => {
            const labels = data.map(item => item.cidade);
            const valores = data.map(item => item.media_duracao); 

            new Chart(document.getElementById('graficoBarra2'), {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Duração (minutos)',
                        data: valores,
                        backgroundColor: 'rgba(255, 99, 132, 0.7)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Tempo médio de quedas por cidade',
                            font: { size: 16 }
                        },
                        legend: { display: false },
                        datalabels: {
                            anchor: 'end',
                            align: 'top',
                            formatter: (value) => value + ' min',
                            font: { weight: 'bold' }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: { display: true, text: 'Duração (minutos)' }
                        },
                        x: {
                            title: { display: true, text: 'Cidades' }
                        }
                    }
                },
                plugins: [ChartDataLabels]
            });
        })
        .catch(error => console.error('Erro ao carregar gráfico de duração média:', error));
}


fetch('/kpiDashGeral/volume-por-motivo')
    .then(response => response.json())
    .then(data => {
        const labels = data.map(item => item.motivo);
        const valores = data.map(item => item.total); 

        new Chart(document.getElementById('graficoLinha'), {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Volume de Quedas por Motivo',
                    data: valores,
                    fill: false,
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Volume de Quedas por Motivo',
                        font: { size: 16 }
                    },
                    legend: {
                        display: true
                    },
                    datalabels: {
                        anchor: 'end',
                        align: 'top',
                        formatter: value => value,
                        font: { weight: 'bold' }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Quedas' }
                    },
                    x: {
                        title: { display: true, text: 'Motivos' }
                    }
                }
            },
            plugins: [ChartDataLabels]
        });
    })
    .catch(error => console.error('Erro ao carregar gráfico de linha:', error));


document.addEventListener('DOMContentLoaded', function () {
    atualizarKPIs();
    carregarGraficos();
});