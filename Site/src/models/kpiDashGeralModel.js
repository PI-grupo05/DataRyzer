var database = require("../database/config");

function cidadeMaisAfetada() {
    var instrucaoSql = `
        SELECT c.nome AS unidade_consumidora, COUNT(i.id_interrupcao) AS total_interrupcoes
        FROM interrupcao i
        JOIN unidade_consumidora c ON i.fk_unidade_consumidora = c.id_unidade_consumidora
        GROUP BY c.id_unidade_consumidora
        ORDER BY total_interrupcoes DESC
        LIMIT 1;
    `;
    return database.executar(instrucaoSql);
}

function cidadeMaiorTempoInterrupcao() {
    var instrucaoSql = `
        SELECT c.nome AS unidade_consumidora, SUM(i.duracao) AS total_duracao
        FROM interrupcao i
        JOIN unidade_consumidora c ON i.fk_unidade_consumidora = c.id_unidade_consumidora
        GROUP BY c.id_unidade_consumidora
        ORDER BY total_duracao DESC
        LIMIT 1;
    `;
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

function duracaoMediaInterrupcoes() {
    const instrucaoSql = `
        SELECT c.nome AS unidade_consumidora, AVG(i.duracao) AS duracao_media
        FROM interrupcao i
        JOIN unidade_consumidora c ON i.fk_unidade_consumidora = c.id_unidade_consumidora
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
    cidadeMaisAfetada,
    cidadeMaiorTempoInterrupcao,
    interrupcoesPorCidade,
    duracaoMediaInterrupcoes,
    volumeInterrupcoesPorMotivo,
    duracaoMediaPorCidade,
    porcentagemPorMotivo
};
