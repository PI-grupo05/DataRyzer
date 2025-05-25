var database = require("../database/config");

function criarGrupo(nome, idUsuario) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function criarGrupo()"
  );

  var instrucaoSql = `
    INSERT INTO grupo  
        VALUES (default, '${nome}', ${idUsuario});
  `; //talvez colocar data
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarPorUsuario(idUsuario) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarPorUsuario()"
  );

  var instrucaoSql = `
    SELECT * FROM grupo WHERE fk_usuario = ${idUsuario};
  `; //talvez colocar data
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function editarNomeGrupo(nome, idGrupo) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarNomeGrupo()"
  );

  var instrucaoSql = `
    UPDATE grupo SET nome = '${nome}' WHERE id_grupo = ${idGrupo};
  `;

  return database.executar(instrucaoSql);
}

function deletarGrupo(idGrupo) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarNomeGrupo()"
  );

  var instrucaoSql = `
    DELETE FROM grupo WHERE id_grupo = ${idGrupo};
  `;

  return database.executar(instrucaoSql);
}

function contarGruposUsuario(idUsuario) {
  console.log(
    "ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function contarGruposUsuario()"
  );

  var instrucaoSql = `
    SELECT COUNT(*) AS total FROM grupo WHERE fk_usuario = ${idUsuario};
  `;

  return database.executar(instrucaoSql);
}

module.exports = {
  criarGrupo,
  listarPorUsuario,
  contarGruposUsuario,
  editarNomeGrupo,
  deletarGrupo,
};
