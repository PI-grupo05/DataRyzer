var database = require("../database/config");

function cidadeMaisAfetada() {
    var instrucaoSql = `
        SELECT c.nome AS cidade, COUNT(i.id_interrupcao) AS total_interrupcoes
        FROM interrupcao i
        JOIN cidade c ON i.fk_cidade = c.id_cidade
        GROUP BY c.id_cidade
        ORDER BY total_interrupcoes DESC
        LIMIT 1;
    `;
    return database.executar(instrucaoSql);
}

function cidadeMaiorTempoInterrupcao() {
    var instrucaoSql = `
        SELECT c.nome AS cidade, SUM(i.duracao) AS total_duracao
        FROM interrupcao i
        JOIN cidade c ON i.fk_cidade = c.id_cidade
        GROUP BY c.id_cidade
        ORDER BY total_duracao DESC
        LIMIT 1;
    `;
    return database.executar(instrucaoSql);
}

function interrupcoesPorCidade() {
    const instrucaoSql = `
        SELECT c.nome AS cidade, COUNT(i.id_interrupcao) AS total_interrupcoes
        FROM interrupcao i
        JOIN cidade c ON i.fk_cidade = c.id_cidade
        GROUP BY c.nome
        ORDER BY total_interrupcoes DESC
        LIMIT 5;
    `;
    return database.executar(instrucaoSql);
}

function duracaoMediaInterrupcoes() {
    const instrucaoSql = `
        SELECT c.nome AS cidade, AVG(i.duracao) AS duracao_media
        FROM interrupcao i
        JOIN cidade c ON i.fk_cidade = c.id_cidade
        GROUP BY c.nome
        ORDER BY duracao_media DESC
        LIMIT 5;
    `;
    return database.executar(instrucaoSql);
}


module.exports = {
    cidadeMaisAfetada,
    cidadeMaiorTempoInterrupcao,
    interrupcoesPorCidade,
    duracaoMediaInterrupcoes
};