
window.addEventListener('load', function () {
  console.log("Página carregada");
  buscarHistorico(); // Executa assim que a página terminar de carregar
});

function buscarHistorico() {
  fetch(`/historico/buscarHistorico/${sessionStorage.FK_DISTRIBUIDORA}`, { 
  method: 'GET',
  cache: 'no-store'
})
.then(function (response) {
  if (response.ok) {
    response.json().then(function (resposta) {
      console.log(`Dados recebidos de historico no front: ${JSON.stringify(resposta)}`);
      document.getElementById("table_historico").innerHTML = ""
      for (let interrupcao of resposta) {
      document.getElementById("table_historico").innerHTML += `
        <tr id="">
          <td>${interrupcao.idDistribuidora}</td>
          <td>${interrupcao.distribuidora}</td>
          <td>${interrupcao.unidade_consumidora}</td>
          <td>${new Date(interrupcao.data_inicio).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</td>
          <td>${new Date(interrupcao.data_fim).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</td>
          <td>${interrupcao.duracao}</td>
          <td>${interrupcao.motivo}</td>
        </tr>
      `;
      }
    });
  } else {
    console.error('Nenhum dado encontrado ou erro na API');
  }
  })
.catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ historico: ${error.message}`);
  });
}

function buscarHistoricoPorfiltro(){
  var id_distribuidora = sessionStorage.FK_DISTRIBUIDORA
  var tipoPesquisa = document.getElementById("tipo_pesquisa").value;
  var inputPesquisar = document.getElementById("input_pesquisar").value
  if(inputPesquisar == ""){
    buscarHistorico()
    return
  }

  fetch(`/historico/buscarHistoricoPorfiltro/${id_distribuidora}/${inputPesquisar}/${tipoPesquisa}`, { 
    method: 'GET',
    cache: 'no-store'
  })
  .then(function (response) {
    if (response.ok) {
      response.json().then(function (resposta) {

        console.log(`Dados recebidos de historico no front: ${JSON.stringify(resposta)}`);
        document.getElementById("table_historico").innerHTML = "";
        for (let interrupcao of resposta) {
        document.getElementById("table_historico").innerHTML += `
          <tr id="">
            <td>${interrupcao.idDistribuidora}</td>
            <td>${interrupcao.distribuidora}</td>
            <td>${interrupcao.unidade_consumidora}</td>
            <td>${new Date(interrupcao.data_inicio).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</td>
            <td>${new Date(interrupcao.data_fim).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}</td>
            <td>${interrupcao.duracao}</td>
            <td>${interrupcao.motivo}</td>
          </tr>
        `;
        }
      });
    } else {
      console.error('Nenhum dado encontrado ou erro na API');
    }
    })
  .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ historico: ${error.message}`);
    });
}


function atualizarTipoInput() {
  var tipoPesquisa = document.getElementById("tipo_pesquisa");
  var inputPesquisar = document.getElementById("input_pesquisar");

  if (tipoPesquisa.value == "i.dt_inicio" || tipoPesquisa.value == "i.dt_fim") {
    inputPesquisar.type = "date";
    inputPesquisar.placeholder = "";
  } else {
    inputPesquisar.type = "text";
    inputPesquisar.placeholder = "Buscar...";
  }

  inputPesquisar.value = "";
}


