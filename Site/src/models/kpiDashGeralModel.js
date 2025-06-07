var database = require("../database/config");

function unidadeMaisAfetada(idDistribuidora) {
  var instrucaoSql = `
    SELECT 
    c.nome AS unidade_consumidora, 
    COUNT(i.id_interrupcao) AS total_interrupcoes FROM interrupcao i 
    JOIN unidade_consumidora c ON i.fk_unidade_consumidora = c.id_unidade_consumidora
    JOIN distribuidora d ON c.fk_distribuidora = d.id_distribuidora
    WHERE d.id_distribuidora = ${idDistribuidora}  
    GROUP BY c.id_unidade_consumidora, c.nome
    ORDER BY total_interrupcoes DESC
    LIMIT 1;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function unidadeMaiorTempoInterrupcao(idDistribuidora) {
  var instrucaoSql = `
    SELECT uc.nome AS unidade_consumidora, SUM(i.duracao) AS tempo_total_minutos FROM 
    interrupcao i 
    JOIN unidade_consumidora uc ON i.fk_unidade_consumidora = uc.id_unidade_consumidora
    JOIN distribuidora d ON uc.fk_distribuidora = d.id_distribuidora WHERE d.id_distribuidora = ${idDistribuidora} 
    GROUP BY uc.id_unidade_consumidora, uc.nome 
    ORDER BY tempo_total_minutos 
    DESC LIMIT 1;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function interrupcoesPorCidade() {
  const instrucaoSql = `
        SELECT c.nome AS unidade_consumidora, COUNT(i.id_interrupcao) AS total_interrupcoes
        FROM interrupcao i
        JOIN unidade_consumidora c ON i.fk_unidade_consumidora = c.id_unidade_consumidora
        GROUP BY c.nome
        ORDER BY total_interrupcoes DESC
        LIMIT 5;
    `;
  return database.executar(instrucaoSql);
}

function duracaoMediaInterrupcoes(idDistribuidora) {
  const instrucaoSql = `
        SELECT c.nome AS unidade_consumidora,  ROUND(AVG(i.duracao), 2) AS duracao_media_minutos
        FROM interrupcao i JOIN unidade_consumidora c ON i.fk_unidade_consumidora = c.id_unidade_consumidora
        WHERE c.fk_distribuidora = ${idDistribuidora} 
        GROUP BY c.id_unidade_consumidora, c.nome
        ORDER BY duracao_media_minutos DESC
        LIMIT 7;
    `;
  return database.executar(instrucaoSql);
}

function volumeInterrupcoesPorMotivo() {
  const instrucaoSql = `
        SELECT m.nome AS motivo, COUNT(i.id_interrupcao) AS total
        FROM interrupcao i
        JOIN motivo m ON i.fk_motivo = m.id_motivo
        GROUP BY m.id_motivo;
         
    `;
  return database.executar(instrucaoSql);
}

function duracaoMediaPorCidade() {
  const instrucaoSql = `
        SELECT c.nome AS unidade_consumidora, ROUND(AVG(i.duracao), 2) AS media_duracao
        FROM interrupcao i
        JOIN unidade_consumidora c ON i.fk_unidade_consumidora = c.id_unidade_consumidora
        GROUP BY c.id_unidade_consumidora
        LIMIT 5;
         
    `;
  return database.executar(instrucaoSql);
}

function porcentagemPorMotivo() {
  const instrucaoSql = `
        SELECT 
            m.nome AS motivo,
            ROUND((COUNT(i.id_interrupcao) * 100.0 / 
                (SELECT COUNT(*) FROM interrupcao)), 1) AS porcentagem
        FROM interrupcao i
        JOIN motivo m ON i.fk_motivo = m.id_motivo
        GROUP BY m.nome;
    `;
  return database.executar(instrucaoSql);
}

module.exports = {
  unidadeMaisAfetada,
  unidadeMaiorTempoInterrupcao,
  interrupcoesPorCidade,
  duracaoMediaInterrupcoes,
  volumeInterrupcoesPorMotivo,
  duracaoMediaPorCidade,
  porcentagemPorMotivo,
};
