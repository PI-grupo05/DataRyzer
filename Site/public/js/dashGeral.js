function atualizarKPIs() {
  const idDistribuidora = sessionStorage.FK_DISTRIBUIDORA;

  fetch(`/kpiDashGeral/unidade-mais-afetada/${idDistribuidora}`)
    .then((response) => response.json())
    .then((data) => {
      const cidadeMaisQuedas = document.getElementById("cidade-mais-quedas");
      if (data && data.length > 0) {
        const unidade = data[0].unidade_consumidora;
        const total = data[0].total_interrupcoes;
        cidadeMaisQuedas.textContent = `${unidade} - ${total} quedas`;
      } else {
        cidadeMaisQuedas.textContent = "Nenhuma informação disponível";
      }
    })
    .catch((error) => {
      console.error("Erro ao obter unidade consumidora mais afetada:", error);
      document.getElementById("cidade-mais-quedas").textContent =
        "Erro ao carregar";
    });

  fetch(`/kpiDashGeral/unidade-maior-tempo/${idDistribuidora}`)
    .then((response) => response.json())
    .then((data) => {
      const cidadeMaiorTempo = document.getElementById("cidade-maior-tempo");
      if (data && data.length > 0) {
        const unidade = data[0].unidade_consumidora;
        const tempo = data[0].tempo_total_minutos;
        cidadeMaiorTempo.textContent = `${unidade} - ${tempo} min`;
      } else {
        cidadeMaiorTempo.textContent = "Nenhuma informação disponível";
      }
    })
    .catch((error) =>
      console.error(
        "Erro ao obter unidade consumidora com maior tempo de interrupção:",
        error
      )
    );

  fetch(`/kpiDashGeral/motivo-mais-reccorente/${idDistribuidora}`)
    .then((response) => response.json())
    .then((data) => {
      const motivoMaisRecorrente = document.getElementById(
        "motivo-mais-reccorente"
      );
      if (data && data.length > 0) {
        const motivo = data[0].motivo_mais_frequente;
        const total = data[0].total_interrupcoes;
        motivoMaisRecorrente.textContent = `${motivo} - ${total} quedas`;
      } else {
        motivoMaisRecorrente.textContent = "Nenhuma informação disponível";
      }
    })
    .catch((error) =>
      console.error("Erro ao obter motivo mais reccorente:", error)
    );
}

const idDistribuidora = sessionStorage.FK_DISTRIBUIDORA;
function carregarGraficos() {
  fetch(`/kpiDashGeral/interrupcoes-por-unidade/${idDistribuidora}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const labels = data.map((item) => item.unidade_consumidora);
      const valores = data.map((item) => item.total_interrupcoes);

      new Chart(document.getElementById("graficoBarra1"), {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Número de Interrupções",
              data: valores,
              backgroundColor: "#070226",
              borderColor: "#070226",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Comparação de quedas por unidades",
              font: { size: 16 },
            },
            legend: { display: false },
            datalabels: {
              anchor: "end",
              align: "top",
              formatter: (value) => value,
              font: { weight: "bold" },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: "Número de Interrupções" },
            },
            x: {
              title: { display: true, text: "Unidades consumidoras" },
            },
          },
        },
        plugins: [ChartDataLabels],
      });
    })
    .catch((error) =>
      console.error(
        "Erro ao carregar gráfico de interrupções por unidade consumidora:",
        error
      )
    );

  fetch(`/kpiDashGeral/duracao-media-por-unidade/${idDistribuidora}`)
    .then((response) => response.json())
    .then((data) => {
      const labels = data.map((item) => item.unidade_consumidora);
      const valores = data.map((item) => item.duracao_media_minutos);

      new Chart(document.getElementById("graficoBarra2"), {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Duração (minutos)",
              data: valores,
              backgroundColor: "#321ec6",
              borderColor: "#321ec6",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Tempo médio de quedas por unidade",
              font: { size: 16 },
            },
            legend: { display: false },
            datalabels: {
              anchor: "end",
              align: "top",
              formatter: (value) => value + " hr",
              font: { weight: "bold" },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: { display: true, text: "Duração (minutos)" },
            },
            x: {
              title: { display: true, text: "Unidades Consumidoras" },
            },
          },
        },
        plugins: [ChartDataLabels],
      });
    })
    .catch((error) =>
      console.error("Erro ao carregar gráfico de duração média:", error)
    );

  fetch(`/kpiDashGeral/volume-interrupcoes-motivo/${idDistribuidora}`)
    .then((response) => response.json())
    .then((data) => {
      const meses = [...new Set(data.map((item) => item.mes))];
      const motivosUnicos = [...new Set(data.map((item) => item.motivo))];

      const coresFixas = {
        "Arvore ou Vegetacao": "#FF6384",
        "Descarga Atmosferica": "#36A2EB",
        "Falha de material ou equipamento": "#FFCE56",
        "Para Melhoria": "#9CCC65",
        "Vento": "#BA68C8"
      };

      const datasets = motivosUnicos.map((motivo) => {
        const dadosPorMotivo = meses.map((mes) => {
          const registro = data.find(
            (item) => item.motivo === motivo && item.mes === mes
          );
          return registro ? registro.total_ocorrencias : 0;
        });

        return {
          label: motivo,
          data: dadosPorMotivo,
          fill: false,
          borderColor: coresFixas[motivo] || `#000000`,
          tension: 0.1,
        };
      });

      new Chart(document.getElementById("graficoLinha"), {
        type: "line",
        data: {
          labels: meses,
          datasets: datasets,
        },
        options: {
          responsive: true,
          plugins: {
            title: {
              display: true,
              text: "Volume de Quedas por Motivo (últimos 6 meses)",
              font: { size: 16 },
            },
            legend: {
              display: true,
            },
            datalabels: {
              anchor: "end",
              align: "top",
              formatter: (value) => value,
              font: { weight: "bold" },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Quantidade de Quedas",
              },
            },
            x: {
              title: {
                display: true,
                text: "Mês",
              },
            },
          },
        },
        plugins: [ChartDataLabels],
      });
    })
    .catch((error) =>
      console.error("Erro ao carregar gráfico de linha:", error)
    );
}
function carregarGraficoPizzaMotivos() {
  fetch(`/kpiDashGeral/porcentagem-por-motivo/${idDistribuidora}`)
    .then((response) => response.json())
    .then((data) => {
      const labels = data.map((item) => item.motivo);
      const valores = data.map((item) => item.percentual);

      new Chart(document.getElementById("graficoPizzaMotivos"), {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              data: valores,
              backgroundColor: [
                "#321ec6",
                "#130569",
                "#000000",
                "#1d93e8",
                "#a0a6aa",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            datalabels: {
              formatter: (value) => `${value}%`,
              color: "#fff",
              font: { weight: "bold", size: 20 },
            },
            title: {
              display: true,
              text: "5 Principais Motivos de Quedas (%)",
              font: { size: 18 },
            },
            legend: {
              position: "bottom",
              labels: {
                font: {
                  size: 14,
                },
                padding: 20,
              },
            },
          },
        },
        plugins: [ChartDataLabels],
      });
    })
    .catch((error) =>
      console.error("Erro ao carregar gráfico de pizza:", error)
    );
}

// carregar funções quando a pagina carregar
document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebarGrafico");
  const toggleBtn = document.getElementById("toggleSidebar");

  if (sidebar && toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      sidebar.classList.toggle("expandida");
    });
  }
  atualizarKPIs();
  carregarGraficos();
  carregarGraficoPizzaMotivos();
});
