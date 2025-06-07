// document.addEventListener('DOMContentLoaded', () => {
//     atualizarKPIs();
//     carregarGraficoLinha();
//     carregarGraficoBarra();
// });

// function carregarGraficoLinha() {
//     fetch('/kpiDashEspecifica/grafico-linha')
//         .then(res => res.json())
//         .then(data => {
//             const labels = data.map(d => d.data.split('T')[0]);
//             const valores = data.map(d => d.total_quedas);

//             const ctx = document.getElementById('graficoLinha').getContext('2d');
//             new Chart(ctx, {
//                 type: 'line',
//                 data: {
//                     labels,
//                     datasets: [{
//                         label: 'Quedas nos Últimos Dias',
//                         data: valores,
//                         borderColor: 'rgba(54, 162, 235, 1)',
//                         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                         fill: true,
//                         tension: 0.3
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     plugins: {
//                         title: {
//                             display: true,
//                             text: 'Quedas Diárias Recentes',
//                             font: { size: 16 }
//                         }
//                     },
//                     scales: {
//                         y: { beginAtZero: true },
//                         x: { title: { display: true, text: '' } }
//                     }
//                 }
//             });
//         })
//         .catch(err => console.error('Erro ao carregar gráfico de linha:', err));
// }

// function carregarGraficoBarra() {
//     fetch('/kpiDashEspecifica/grafico-barra')
//         .then(res => res.json())
//         .then(data => {
//             const labels = data.map(d => d.motivo);
//             const valores = data.map(d => d.total);

//             const ctx = document.getElementById('graficoBarra').getContext('2d');
//             new Chart(ctx, {
//                 type: 'bar',
//                 data: {
//                     labels,
//                     datasets: [{
//                         label: 'Interrupções por Motivo',
//                         data: valores,
//                         backgroundColor: 'rgba(255, 99, 132, 0.5)',
//                         borderColor: 'rgba(255, 99, 132, 1)',
//                         borderWidth: 1
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     plugins: {
//                         title: {
//                             display: true,
//                             text: 'Motivos das Interrupções',
//                             font: { size: 16 }
//                         }
//                     },
//                     scales: {
//                         y: { beginAtZero: true },
//                         x: { title: { display: true, text: "" } }
//                     }
//                 }
//             });
//         })
//         .catch(err => console.error('Erro ao carregar gráfico de barra:', err));
// }

// function atualizarKPIs() {
//     fetch('/kpiDashEspecifica/duracao-media')
//         .then(res => res.json())
//         .then(data => {
//             document.querySelector('.kpi-duracao-media-cidade').innerText = `${data[0].duracao_media} min`;
//         })
//         .catch(err => console.error('Erro KPI duração média:', err));

//     fetch('/kpiDashEspecifica/maior-indice-quedas')
//         .then(res => res.json())
//         .then(data => {
//             document.querySelector('.kpi-maior-indice-quedas').innerText = ` ${data[0].data.split('T')[0]}`;
//         })
//         .catch(err => console.error('Erro KPI maior índice quedas:', err));

//     fetch('/kpiDashEspecifica/media-por-dia')
//         .then(res => res.json())
//         .then(data => {
//             document.querySelector('.kpi-media-por-dia').innerText = `${data[0].media_quedas_dia.split('.')[0]} quedas/dia`;
//         })
//         .catch(err => console.error('Erro KPI média por dia:', err));
// }


// document.addEventListener('DOMContentLoaded', () => {
//     const idUnidadeConsumidora = sessionStorage.FK_UNIDADE_CONSUMIDORA;
//     const idDistribuidora = sessionStorage.FK_DISTRIBUIDORA;

//     if (!idUnidadeConsumidora) {
//         console.error("Distribuidora não definida na sessão.");
//         alert("Sessão inválida. Faça login novamente.");
//         window.location.href = "/login.html";
//         return;
//     }

//     atualizarKPIs(idUnidadeConsumidora);
//     carregarGraficoLinha(idUnidadeConsumidora);
//     carregarGraficoBarra(idUnidadeConsumidora);
// });

// function carregarGraficoLinha(idUnidadeConsumidora) {
//     fetch(`/kpiDashEspecifica/grafico-linha/${idUnidadeConsumidora}`)
//         .then(res => res.json())
//         .then(data => {
//             const labels = data.map(d => d.data.split('T')[0]);
//             const valores = data.map(d => d.total_quedas);

//             const ctx = document.getElementById('graficoLinha').getContext('2d');
//             new Chart(ctx, {
//                 type: 'line',
//                 data: {
//                     labels,
//                     datasets: [{
//                         label: 'Quedas nos Últimos Dias',
//                         data: valores,
//                         borderColor: 'rgba(54, 162, 235, 1)',
//                         backgroundColor: 'rgba(54, 162, 235, 0.2)',
//                         fill: true,
//                         tension: 0.3
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     plugins: {
//                         title: {
//                             display: true,
//                             text: 'Quedas Diárias Recentes',
//                             font: { size: 16 }
//                         }
//                     },
//                     scales: {
//                         y: { beginAtZero: true },
//                         x: { title: { display: true, text: '' } }
//                     }
//                 }
//             });
//         })
//         .catch(err => console.error('Erro ao carregar gráfico de linha:', err));
// }

// function carregarGraficoBarra(idUnidadeConsumidora) {
//     fetch(`/kpiDashEspecifica/grafico-barra/${idUnidadeConsumidora}`)
//         .then(res => res.json())
//         .then(data => {
//             const labels = data.map(d => d.motivo);
//             const valores = data.map(d => d.total);

//             const ctx = document.getElementById('graficoBarra').getContext('2d');
//             new Chart(ctx, {
//                 type: 'bar',
//                 data: {
//                     labels,
//                     datasets: [{
//                         label: 'Interrupções por Motivo',
//                         data: valores,
//                         backgroundColor: 'rgba(255, 99, 132, 0.5)',
//                         borderColor: 'rgba(255, 99, 132, 1)',
//                         borderWidth: 1
//                     }]
//                 },
//                 options: {
//                     responsive: true,
//                     plugins: {
//                         title: {
//                             display: true,
//                             text: 'Motivos das Interrupções',
//                             font: { size: 16 }
//                         }
//                     },
//                     scales: {
//                         y: { beginAtZero: true },
//                         x: { title: { display: true, text: "" } }
//                     }
//                 }
//             });
//         })
//         .catch(err => console.error('Erro ao carregar gráfico de barra:', err));
// }

// function atualizarKPIs(idUnidadeConsumidora) {
//     fetch(`/kpiDashEspecifica/duracao-media/${idUnidadeConsumidora}`)
//         .then(res => res.json())
//         .then(data => {
//             document.querySelector('.kpi-duracao-media-cidade').innerText = `${data[0].duracao_media} min`;
//         })
//         .catch(err => console.error('Erro KPI duração média:', err));

//     fetch(`/kpiDashEspecifica/maior-indice-quedas/${idUnidadeConsumidora}`)
//         .then(res => res.json())
//         .then(data => {
//             document.querySelector('.kpi-maior-indice-quedas').innerText = ` ${data[0].data.split('T')[0]}`;
//         })
//         .catch(err => console.error('Erro KPI maior índice quedas:', err));

//     fetch(`/kpiDashEspecifica/media-por-dia/${idUnidadeConsumidora}`)
//         .then(res => res.json())
//         .then(data => {
//             document.querySelector('.kpi-media-por-dia').innerText = `${data[0].media_quedas_dia.split('.')[0]} quedas/dia`;
//         })
//         .catch(err => console.error('Erro KPI média por dia:', err));
// }

document.addEventListener('DOMContentLoaded', () => {
    const nomeUsuario = sessionStorage.getItem('NOME_USUARIO');

    if (nomeUsuario) {
        document.getElementById('nomeUsuarioLabel').innerText =  nomeUsuario;
    } else {
        console.error("Nome do usuário não encontrado na sessão.");
    }
});

document.addEventListener('DOMContentLoaded',()=>{
    const cargo = sessionStorage.TIPO_USUARIO;

    if(cargo){
        document.getElementById('cargoLabel').innerText = cargo;
    }
    else{
        console.error("Cargo não encontrado.");
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const idUnidadeConsumidora = sessionStorage.FK_UNIDADE_CONSUMIDORA;
    const idDistribuidora = sessionStorage.FK_DISTRIBUIDORA;

    if (!idUnidadeConsumidora || !idDistribuidora) {
        console.error("Unidade consumidora ou distribuidora não definida na sessão.");
        alert("Sessão inválida. Faça login novamente.");
        window.location.href = "/login.html";
        return;
    }

    atualizarKPIs(idUnidadeConsumidora, idDistribuidora);
    carregarGraficoLinha(idUnidadeConsumidora, idDistribuidora);
    carregarGraficoBarra(idUnidadeConsumidora, idDistribuidora);
});

function carregarGraficoLinha(idUnidadeConsumidora, idDistribuidora) {
    fetch(`/kpiDashEspecifica/grafico-linha/${idUnidadeConsumidora}/${idDistribuidora}`)
        .then(res => res.json())
        .then(data => {
            const labels = data.map(d => d.data.split('T')[0]);
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
                        x: { title: { display: true, text: '' } }
                    }
                }
            });
        })
        .catch(err => console.error('Erro ao carregar gráfico de linha:', err));
}

function carregarGraficoBarra(idUnidadeConsumidora, idDistribuidora) {
    fetch(`/kpiDashEspecifica/grafico-barra/${idUnidadeConsumidora}/${idDistribuidora}`)
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
                        x: { title: { display: true, text: "" } }
                    }
                }
            });
        })
        .catch(err => console.error('Erro ao carregar gráfico de barra:', err));
}

function atualizarKPIs(idUnidadeConsumidora, idDistribuidora) {
    fetch(`/kpiDashEspecifica/duracao-media/${idUnidadeConsumidora}/${idDistribuidora}`)
        .then(res => res.json())
        .then(data => {
            document.querySelector('.kpi-duracao-media-cidade').innerText = `${data[0].duracao_media} min`;
        })
        .catch(err => console.error('Erro KPI duração média:', err));

    fetch(`/kpiDashEspecifica/maior-indice-quedas/${idUnidadeConsumidora}/${idDistribuidora}`)
        .then(res => res.json())
        .then(data => {
            document.querySelector('.kpi-maior-indice-quedas').innerText = ` ${data[0].data.split('T')[0]}`;
        })
        .catch(err => console.error('Erro KPI maior índice quedas:', err));

    fetch(`/kpiDashEspecifica/media-por-dia/${idUnidadeConsumidora}/${idDistribuidora}`)
        .then(res => res.json())
        .then(data => {
            document.querySelector('.kpi-media-por-dia').innerText = `${data[0].media_quedas_dia.split('.')[0]} quedas/dia`;
        })
        .catch(err => console.error('Erro KPI média por dia:', err));
}
