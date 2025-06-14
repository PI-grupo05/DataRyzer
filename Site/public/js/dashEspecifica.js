function atualizarDashboard(dataInicio, dataFim) {
    const idUnidadeConsumidora = sessionStorage.FK_UNIDADE_CONSUMIDORA;
    const idDistribuidora = sessionStorage.FK_DISTRIBUIDORA;

    

    if (!idUnidadeConsumidora || !idDistribuidora) {
        console.error("Sessão inválida.");
        alert("Sessão inválida. Faça login novamente.");
        window.location.href = "/login.html";
        return;
    }

    const dataInicioFormatada = formatarDataISO(dataInicio);
    const dataFimFormatada = formatarDataISO(dataFim);

    if (!dataInicioFormatada || !dataFimFormatada) {
        console.error("Erro ao atualizar dashboard: datas inválidas");
        return;
    }
  


    
    carregarGraficoLinha(idUnidadeConsumidora, idDistribuidora, dataInicioFormatada, dataFimFormatada);
    carregarGraficoBarra(idUnidadeConsumidora, idDistribuidora, dataInicioFormatada, dataFimFormatada);
    atualizarKPIs(idUnidadeConsumidora, idDistribuidora, dataInicioFormatada, dataFimFormatada);
}


function formatarDataISO(dataISO) {
    if (!dataISO) return "Data inválida";

    const date = new Date(dataISO);
    
    if (isNaN(date.getTime())) { 
        console.error("Erro ao converter data:", dataISO);
        return "Data inválida";
    }

    
    const ano = date.getUTCFullYear();
    const mes = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const dia = String(date.getUTCDate()).padStart(2, '0'); 

    return `${ano}/${mes}/${dia}`;
}


//=====================================================================
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



let graficoLinha = null;


function carregarGraficoLinha(idUnidadeConsumidora, idDistribuidora, dataInicio, dataFim) {
    if (!dataInicio || !dataFim) {
        console.error("Datas inválidas:", dataInicio, dataFim);
        return;
    }

    fetch(`/kpiDashEspecifica/grafico-linha/${idUnidadeConsumidora}/${idDistribuidora}?data_inicio=${dataInicio}&data_fim=${dataFim}`)
        .then(res => res.json())
        .then(data => {
            const ctx = document.getElementById('graficoLinha').getContext('2d');

            if (data.length === 0) {
                console.warn("Nenhum dado retornado para gráfico de linha.");
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                return;
            }

         
            if (graficoLinha) {
                graficoLinha.destroy();
            }

            const labels = data.map(d => d.data.split('T')[0]);
            const valores = data.map(d => d.total_quedas);

            graficoLinha = new Chart(ctx, {
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





let graficoBarra = null;
function carregarGraficoBarra(idUnidadeConsumidora, idDistribuidora, dataInicio, dataFim) {
    const canvas = document.getElementById('graficoBarra');
    const ctx = canvas.getContext('2d');


    if (graficoBarra) {
        graficoBarra.destroy();
    }
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    // canvas.style.display = "none"; // Oculta o gráfico

    fetch(`/kpiDashEspecifica/grafico-barra/${idUnidadeConsumidora}/${idDistribuidora}?data_inicio=${dataInicio}&data_fim=${dataFim}`)
        .then(res => res.json())
        .then(data => {
            if (data.length === 0) {
                console.warn("Nenhum dado retornado para gráfico de barra.");
                return;
            }

           
            canvas.style.display = "block";

            const labels = data.map(d => d.motivo);
            const valores = data.map(d => d.total);

            graficoBarra = new Chart(ctx, {
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




function atualizarKPIs(idUnidadeConsumidora, idDistribuidora, dataInicio, dataFim) {
    if (!dataInicio || !dataFim) {
        console.error("Datas inválidas:", dataInicio, dataFim);
        return;
    }

    
    function resetarKPI(selector, valorPadrao = "--") {
        document.querySelector(selector).innerText = valorPadrao;
    }

    fetch(`/kpiDashEspecifica/duracao-media/${idUnidadeConsumidora}/${idDistribuidora}?data_inicio=${dataInicio}&data_fim=${dataFim}`)
        .then(res => res.json())
        .then(data => {
            if (data.length > 0) {
                document.querySelector('.kpi-duracao-media-cidade').innerText = `${data[0].duracao_media} min`;
            } else {
                resetarKPI('.kpi-duracao-media-cidade');
            }
        })
        .catch(err => {
            console.error('Erro KPI duração média:', err);
            resetarKPI('.kpi-duracao-media-cidade');
        });

    fetch(`/kpiDashEspecifica/maior-indice-quedas/${idUnidadeConsumidora}/${idDistribuidora}?data_inicio=${dataInicio}&data_fim=${dataFim}`)
        .then(res => res.json())
        .then(data => {
            if (data.length > 0) {
                document.querySelector('.kpi-maior-indice-quedas').innerText = ` ${data[0].data.split('T')[0]}`;
            } else {
                resetarKPI('.kpi-maior-indice-quedas');
            }
        })
        .catch(err => {
            console.error('Erro KPI maior índice quedas:', err);
            resetarKPI('.kpi-maior-indice-quedas');
        });

    fetch(`/kpiDashEspecifica/media-por-dia/${idUnidadeConsumidora}/${idDistribuidora}?data_inicio=${dataInicio}&data_fim=${dataFim}`)
        .then(res => res.json())
        .then(data => {
            if (data.length > 0) {
                document.querySelector('.kpi-media-por-dia').innerText = `${Math.floor(data[0].media_quedas_dia)} quedas/dia`;
            } else {
                resetarKPI('.kpi-media-por-dia');
            }
        })
        .catch(err => {
            console.error('Erro KPI média por dia:', err);
            resetarKPI('.kpi-media-por-dia');
        });
}

