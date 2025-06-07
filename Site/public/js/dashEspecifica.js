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


// script modal filtro:::

document.addEventListener('DOMContentLoaded', () => {
  const btnAbrirModal = document.getElementById('btnAbrirModal');
  const modalData = document.getElementById('modalData');
  const btnFecharModal = document.getElementById('btnFecharModal');
  const btnCancelar = document.getElementById('btnCancelar');
  const btnAdicionarFiltro = document.getElementById('btnAdicionarFiltro');
  const btnSalvarFiltros = document.getElementById('btnSalvarFiltros');
  const listaFiltros = document.getElementById('listaFiltros');
  const dataInicioInput = document.getElementById('dataInicio');
  const dataFimInput = document.getElementById('dataFim');

  let filtros = [];


  btnAbrirModal.addEventListener('click', () => {
    modalData.style.display = 'flex';
  });


  btnFecharModal.addEventListener('click', () => {
    modalData.style.display = 'none';
  });


  btnCancelar.addEventListener('click', () => {
    modalData.style.display = 'none';
  });


  btnAdicionarFiltro.addEventListener('click', () => {
    const dataInicio = dataInicioInput.value;
    const dataFim = dataFimInput.value;

    if (dataInicio && dataFim) {
      const filtro = { dataInicio, dataFim };
      filtros.push(filtro);
      atualizarListaFiltros();
      dataInicioInput.value = '';
      dataFimInput.value = '';
    } else {
      alert('Por favor, preencha ambas as datas.');
    }
  });


  function atualizarListaFiltros() {
    listaFiltros.innerHTML = '';
    filtros.forEach((filtro, index) => {
      const itemFiltro = document.createElement('div');
      itemFiltro.classList.add('filtro-item');
      itemFiltro.innerHTML = `
        <span>De: ${filtro.dataInicio} Até: ${filtro.dataFim}</span>
        <div>
          <button class="editar" data-index="${index}">Editar</button>
          <button class="excluir" data-index="${index}">Excluir</button>
        </div>
      `;
      listaFiltros.appendChild(itemFiltro);
    });


    document.querySelectorAll('.editar').forEach(botao => {
      botao.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        const filtro = filtros[index];
        dataInicioInput.value = filtro.dataInicio;
        dataFimInput.value = filtro.dataFim;
        filtros.splice(index, 1); 
        atualizarListaFiltros();
      });
    });

    document.querySelectorAll('.excluir').forEach(botao => {
      botao.addEventListener('click', (e) => {
        const index = e.target.getAttribute('data-index');
        filtros.splice(index, 1); 
        atualizarListaFiltros();
      });
    });
  }


  btnSalvarFiltros.addEventListener('click', () => {
    console.log('Filtros salvos:', filtros);
    modalData.style.display = 'none';
  });
});
