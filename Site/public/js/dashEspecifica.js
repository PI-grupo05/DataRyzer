menuAberto = true;

function abrirMenu(){
  const botaoMenu = document.getElementById('botaoMenu')
  const menuLateral = document.getElementById('menuLateral')
  const containerConteudo = document.getElementById('containerConteudo')

  if(menuAberto == true){
    botaoMenu.style.transform = "scaleX(-1)"
    menuLateral.style.width = "0%"
    menuLateral.style.fontSize = "0%"
    containerConteudo.style.width = "100%"
    menuAberto = false
  }
  else{
    botaoMenu.style.transform = "scaleX(1)"
    menuLateral.style.width = "20%"
    menuLateral.style.fontSize = "100%"
    containerConteudo.style.width = "80%"
    menuAberto = true
  }
}


const ctx = document.getElementById('graficoConteudo');

var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [{
      label: '# of Votes',
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
        text: 'Quedas ao longo dos anos',
        font:{
          size: 18,
        },
        align: 'center'
      }
    }
  }
});

const ctx2 = document.getElementById('graficoConteudo2');

var myChart = new Chart(ctx2, {
  type: 'doughnut',
  data: {
    labels: ['2020', '2021', '2022', '2023', '2024', '2025'],
    datasets: [{
      label: '# of Votes',
      data: [10, 5, 3, 5, 2, 3],
      borderWidth: 3,
      borderColor: "#8D34F9",
      circumference: 180,
      rotation: 270
    }]
  },
  options: {
    scales: {
    },
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Quedas ao longo dos anos',
        font:{
          size: 18,
        },
        align: 'center'
      }
    }
  }
});