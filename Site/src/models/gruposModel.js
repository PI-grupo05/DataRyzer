var database = require("../database/config");

function criarGrupo(nome) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()"
  );

  var instrucaoSql = `
    INSERT INTO grupos  
        VALUES (default, '${nome}');
  
  `; //talvez colocar data
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  criarGrupo,
};
