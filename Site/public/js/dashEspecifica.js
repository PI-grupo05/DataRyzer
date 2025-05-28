document.addEventListener('DOMContentLoaded', () => {
    atualizarKPIs();
    carregarGraficoLinha();
    carregarGraficoBarra();
});

function carregarGraficoLinha() {
    fetch('/kpiDashEspecifica/grafico-linha')
        .then(res => res.json())
        .then(data => {
            const labels = data.map(d => d.data);
            const valores = data.map(d => d.total_quedas);

            const ctx = document.getElementById('graficoLinha').getContext('2d');
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels,
                    datasets: [{
                        label: 'Quedas nos Últimos Dias',
                        data: valores,
                        borderColor: 'rgba(54, 162, 235, 1)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        fill: true,
                        tension: 0.3
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Quedas Diárias Recentes',
                            font: { size: 16 }
                        }
                    },
                    scales: {
                        y: { beginAtZero: true },
                        x: { title: { display: true, text: 'Data' } }
                    }
                }
            });
        })
        .catch(err => console.error('Erro ao carregar gráfico de linha:', err));
}

function carregarGraficoBarra() {
    fetch('/kpiDashEspecifica/grafico-barra')
        .then(res => res.json())
        .then(data => {
            const labels = data.map(d => d.motivo);
            const valores = data.map(d => d.total);

            const ctx = document.getElementById('graficoBarra').getContext('2d');
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels,
                    datasets: [{
                        label: 'Interrupções por Motivo',
                        data: valores,
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        title: {
                            display: true,
                            text: 'Motivos das Interrupções',
                            font: { size: 16 }
                        }
                    },
                    scales: {
                        y: { beginAtZero: true },
                        x: { title: { display: true, text: 'Motivo' } }
                    }
                }
            });
        })
        .catch(err => console.error('Erro ao carregar gráfico de barra:', err));
}

function atualizarKPIs() {
    fetch('/kpiDashEspecifica/duracao-media')
        .then(res => res.json())
        .then(data => {
            document.querySelector('.kpi-duracao-media-cidade').innerText = `${data[0].duracao_media} min`;
        })
        .catch(err => console.error('Erro KPI duração média:', err));

    fetch('/kpiDashEspecifica/maior-indice-quedas')
        .then(res => res.json())
        .then(data => {
            document.querySelector('.kpi-maior-indice-quedas').innerText = ` ${data[0].data}`;
        })
        .catch(err => console.error('Erro KPI maior índice quedas:', err));

    fetch('/kpiDashEspecifica/media-por-dia')
        .then(res => res.json())
        .then(data => {
            document.querySelector('.kpi-media-por-dia').innerText = `${data[0].media_quedas_dia} quedas/dia`;
        })
        .catch(err => console.error('Erro KPI média por dia:', err));
}
