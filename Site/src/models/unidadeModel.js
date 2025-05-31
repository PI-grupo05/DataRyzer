var database = require("../database/config");

function listarUnidades(idDistribuidora) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarUnidades()"
  );

  var instrucaoSql = `
      SELECT nome, id_unidade_consumidora FROM unidade_consumidora where fk_distribuidora = ${idDistribuidora} and fk_grupo is null;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
function dessasociarUnidade(idUnidade) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function dessasociarUnidade()"
  );

  var instrucaoSql = `
    UPDATE unidade_consumidora set fk_grupo = null where id_unidade_consumidora = ${idUnidade};
  `;

  return database.executar(instrucaoSql);
}

function contarUnidadesPorGrupo(idGrupo) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function contarUnidadesPorGrupo()"
  );

  var instrucaoSql = `
    SELECT COUNT(*) as total FROM unidade_consumidora WHERE fk_grupo = ${idGrupo};
  `;

  return database.executar(instrucaoSql);
}

function carregarNomeGrupo(idGrupo) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function carregarNomeGrupo()"
  );

  var instrucaoSql = `
    SELECT nome FROM grupo WHERE id_grupo = ${idGrupo};
  `;

  return database.executar(instrucaoSql);
}

function associarUnidade(idUnidade, idGrupo) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarUnidades()"
  );

  var instrucaoSql = `
     UPDATE unidade_consumidora set fk_grupo = ${idGrupo} where id_unidade_consumidora = ${idUnidade};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function carregarUnidades(idGrupo) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function carregarUnidade()"
  );

  var instrucaoSql = `
    SELECT id_unidade_consumidora, nome FROM unidade_consumidora where fk_grupo = ${idGrupo};
  `;

  return database.executar(instrucaoSql);
}

module.exports = {
  listarUnidades,
  associarUnidade,
  dessasociarUnidade,
  carregarUnidades,
  contarUnidadesPorGrupo,
  carregarNomeGrupo,
};
