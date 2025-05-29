function atualizarKPIs() {
    fetch('/kpiDashGeral/cidade-mais-afetada') 
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                document.querySelector('.cidade-mais-afetada-quedas').innerText = 
                    `Unidade consumidora mais afetada: (${data[0].total_interrupcoes} quedas)`;
            } else {
                document.querySelector('.cidade-mais-afetada-quedas').innerText = 
                    'Unidade consumidora mais afetada: Nenhuma interrupção registrada.';
            }
        })
        .catch(error => console.error('Erro ao obter unidade consumidora mais afetada:', error));

    fetch('/kpiDashGeral/cidade-maior-tempo-interrupcao') 
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                document.querySelector('.cidade-com-maior-tempo-de-interrup-o-mensal').innerText = 
                    `Unidade consumidora com maior tempo de interrupção:  (${data[0].total_duracao} minutos)`;
            } else {
                document.querySelector('.cidade-com-maior-tempo-de-interrup-o-mensal').innerText = 
                    'Unidade consumidora com maior tempo de interrupção: Nenhuma interrupção registrada.';
            }
        })
        .catch(error => console.error('Erro ao obter unidade consumidora com maior tempo de interrupção:', error));
}

function carregarGraficos() {
 
    fetch('/kpiDashGeral/interrupcoes-por-cidade')
        .then(response => response.json())
        .then(data => {
            console.log(data); 
            const labels = data.map(item => item.unidade_consumidora);
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
                            text: 'Comparação de quedas por unidades consumidoras',
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
                            title: { display: true, text: 'Unidades consumidoras' }
                        }
                    }
                },
                plugins: [ChartDataLabels]
            });
        })
        .catch(error => console.error('Erro ao carregar gráfico de interrupções por unidade consumidora:', error));

 
    fetch('/kpiDashGeral/duracao-media-por-cidade')
        .then(response => response.json())
        .then(data => {
            const labels = data.map(item => item.unidade_consumidora);
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
                            text: 'Tempo médio de quedas por unidade consumidora',
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
                            title: { display: true, text: 'Unidades Consumidoras' }
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


        function carregarGraficoPizzaMotivos() {
    fetch('/kpiDashGeral/porcentagem-por-motivo')
        .then(response => response.json())
        .then(data => {
            const labels = data.map(item => item.motivo);
            const valores = data.map(item => item.porcentagem);

            new Chart(document.getElementById('graficoPizzaMotivos'), {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        data: valores,
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#9CCC65',
                            '#BA68C8',
                            '#4DB6AC'
                        ]
                    }]
                },
                options: {
    responsive: true,
    plugins: {
        datalabels: {
            formatter: (value) => `${value}%`,
            color: '#fff',
            font: { weight: 'bold', size: 18 }
        },
        title: {
            display: true,
            font: { size: 18 }
        },
        legend: {
            position: 'bottom',
            labels: {
                font: {
                    size: 14
                },
                padding: 20
            }
        }
    }
},
                plugins: [ChartDataLabels]
            });
        })
        .catch(error => console.error('Erro ao carregar gráfico de pizza:', error));
}






document.addEventListener('DOMContentLoaded', function () {
    atualizarKPIs();
    carregarGraficos();
    carregarGraficoPizzaMotivos(); 
});