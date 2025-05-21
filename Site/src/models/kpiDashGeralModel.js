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
        SELECT c.nome AS cidade, ROUND(AVG(i.duracao), 2) AS media_duracao
        FROM interrupcao i
        JOIN cidade c ON i.fk_cidade = c.id_cidade
        GROUP BY c.id_cidade;
         
    `;
    return database.executar(instrucaoSql);
}



module.exports = {
    cidadeMaisAfetada,
    cidadeMaiorTempoInterrupcao,
    interrupcoesPorCidade,
    duracaoMediaInterrupcoes,
    volumeInterrupcoesPorMotivo,
    duracaoMediaPorCidade
};
