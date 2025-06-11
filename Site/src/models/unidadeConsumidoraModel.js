var database = require("../database/config")

function exibirUnidadesConsumidoras(filtro = null){
  var instrucaoFiltro
  if(filtro != null){
    instrucaoFiltro = `where nome like '%${filtro}%' `
  }
  console.log("ACESSEI O USUARIO UNIDADE_CONSUMIDORA \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirUnidadesConsumidoras(): ")
    var instrucaoSql = `
        select nome from unidade_consumidora ${instrucaoFiltro};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    exibirUnidadesConsumidoras
};