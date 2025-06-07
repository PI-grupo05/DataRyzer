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
}

function carregarGraficos() {
  const idDistribuidora = sessionStorage.FK_DISTRIBUIDORA;
  console.log(idDistribuidora);
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
              backgroundColor: "rgba(54, 162, 235, 0.7)",
              borderColor: "rgba(54, 162, 235, 1)",
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
              backgroundColor: "rgba(255, 99, 132, 0.7)",
              borderColor: "rgba(255, 99, 132, 1)",
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
          borderColor: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
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
  fetch("/kpiDashGeral/porcentagem-por-motivo")
    .then((response) => response.json())
    .then((data) => {
      const labels = data.map((item) => item.motivo);
      const valores = data.map((item) => item.porcentagem);

      new Chart(document.getElementById("graficoPizzaMotivos"), {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              data: valores,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#9CCC65",
                "#BA68C8",
                "#4DB6AC",
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
              font: { weight: "bold", size: 18 },
            },
            title: {
              display: true,
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
  atualizarKPIs();
  carregarGraficos();
  carregarGraficoPizzaMotivos();
});