var database = require("../database/config");

function listarDatasInicio() {
  var instrucaoSql = `
    SELECT dt_inicio AS data FROM interrupcao ORDER BY data;
  `;
  return database.executar(instrucaoSql);
}

function listarDatasFim() {
  var instrucaoSql = `
    SELECT dt_fim AS data FROM interrupcao ORDER BY data;
  `;
  return database.executar(instrucaoSql);
}

function salvarFiltro(nome, data_inicio, data_fim, fk_usuario) {
  var instrucaoSql = `
    INSERT INTO filtro (nome, data_inicio, data_fim, fk_usuario)
    VALUES ('${nome}', '${data_inicio}', '${data_fim}', ${fk_usuario});
  `;
  return database.executar(instrucaoSql);
}

function listarFiltros(fk_usuario) {
  var instrucaoSql = `
    SELECT * FROM filtro WHERE fk_usuario = ${fk_usuario} ORDER BY id_filtro;
  `;
  return database.executar(instrucaoSql);
}



function deletarFiltro(id_filtro) {
  var instrucaoSql = `
    DELETE FROM filtro WHERE id_filtro = ${id_filtro};
  `;
  return database.executar(instrucaoSql);
}



function atualizarFiltro(id_filtro, nome, data_inicio, data_fim) {
  var instrucaoSql = `
    UPDATE filtro SET nome = '${nome}', data_inicio = '${data_inicio}', data_fim = '${data_fim}'
    WHERE id_filtro = ${id_filtro};
  `;
  return database.executar(instrucaoSql);
}

module.exports = {
  listarDatasInicio,
  listarDatasFim,
  salvarFiltro,
  listarFiltros,
  deletarFiltro,
  atualizarFiltro,
};
