menuAberto = true;

function abrirMenu(){
  const botaoMenu = document.getElementById('botaoMenu')
  const menuLateral = document.getElementById('menuLateral')
  const containerConteudo = document.getElementById('containerConteudo')

  if(menuAberto == true){
    botaoMenu.style.transform = "scaleX(1)"
    menuLateral.style.width = "0%"
    menuLateral.style.fontSize = "0%"
    containerConteudo.style.width = "100%"
    menuAberto = false
  }
  else{
    botaoMenu.style.transform = "scaleX(-1)"
    menuLateral.style.width = "20%"
    menuLateral.style.fontSize = "100%"
    containerConteudo.style.width = "80%"
    menuAberto = true
  }
}


const ctx = document.getElementById('graficoLinha');

var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['03/04', '04/04', '05/04', '06/04', '07/04', '08/04'],
    datasets: [{
      data: [10, 5, 3, 5, 2, 3],
      borderWidth: 3,
      borderColor: "#8D34F9"
    }]
  },
  options: {
    scales: {
      y: {
        beginAtZero: true, 
      }
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Quedas nos últimos dias',
        font:{
          size: 18,
        },
        align: 'center'
      }
    }
  }
});

const ctx2 = document.getElementById('graficoBarra');

var myChart = new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['Meio Ambiente', 'Não Classificado', 'Sistema'],
    datasets: [
      {
      label: 'Mês Atual',
      data: [45, 42, 45],
      backgroundColor: "#5A6ACF"
    },
    {
      label: 'Mês Passado',
      data: [35, 32, 35],
      backgroundColor: "#c4c2c2"
    },
  ]
  },
  options: {
    scales: {
      y:{
        display: false,
        grid:{
          display: false
        }
      },
      x:{
        grid:{
          display: false
        }
      }
    },
    plugins: {
      datalabels: {
        color: '#fff',
        font:{
          size: 18,
        }
      },
      title: {
        display: true,
        text: 'Interrupções por motivo',
        font:{
          size: 18,
        },
        align: 'center'
      }
    }
  },
  plugins: [ChartDataLabels]
});