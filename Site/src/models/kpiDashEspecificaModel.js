var database = require("../database/config");

function duracaoMedia() {
    var instrucaoSql = `
        SELECT ROUND(AVG(duracao), 0) AS duracao_media
        FROM interrupcao
        WHERE fk_unidade_consumidora = 1;
    `;
    return database.executar(instrucaoSql);
}

function maiorIndiceQuedas() {
    var instrucaoSql = `
        SELECT DATE(dt_inicio) AS data, COUNT(*) AS quantidade
        FROM interrupcao
        WHERE fk_unidade_consumidora = 1
        GROUP BY DATE(dt_inicio)
        ORDER BY quantidade DESC
        LIMIT 1;
    `;
    return database.executar(instrucaoSql);
}

function mediaPorDia() {
    var instrucaoSql = `
        SELECT ROUND(COUNT(*) / COUNT(DISTINCT DATE(dt_inicio)), 1) AS media_quedas_dia
        FROM interrupcao
        WHERE fk_unidade_consumidora = 1;
    `;
    return database.executar(instrucaoSql);
}


function dadosGraficoLinha() {
    var instrucaoSql = `
        SELECT DATE(dt_inicio) AS data, COUNT(*) AS total_quedas
        FROM interrupcao
        WHERE fk_unidade_consumidora = 1
        GROUP BY data
        ORDER BY data;
    `;
    return database.executar(instrucaoSql);
}

function dadosGraficoBarra() {
    var instrucaoSql = `
        SELECT m.nome AS motivo, COUNT(*) AS total
        FROM interrupcao i
        JOIN motivo m ON i.fk_motivo = m.id_motivo
        WHERE fk_unidade_consumidora = 1
        GROUP BY motivo
        ORDER BY total asc;
    `;
    return database.executar(instrucaoSql);
}

module.exports = {
    dadosGraficoLinha,
    dadosGraficoBarra,
    duracaoMedia,
    maiorIndiceQuedas,
    mediaPorDia
};  
