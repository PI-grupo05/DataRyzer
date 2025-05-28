
fetch(`/historico/buscarHistorico/${sessionStorage.FK_DISTRIBUIDORA}`, { 
  method: 'GET',
  cache: 'no-store'
})
.then(function (response) {
  if (response.ok) {
    response.json().then(function (resposta) {
      console.log(`Dados recebidos de historico no front: ${JSON.stringify(resposta)}`);

      for (let interrupcao of resposta) {
      table_historico.innerHTML += `
        <tr>
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






