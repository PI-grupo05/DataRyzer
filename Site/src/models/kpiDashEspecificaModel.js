var database = require("../database/config");

// function duracaoMedia(fk_unidade_consumidora) {
//     var instrucaoSql = `
//         SELECT ROUND(AVG(duracao), 0) AS duracao_media
//         FROM interrupcao
//         WHERE fk_unidade_consumidora = ${fk_unidade_consumidora};
//     `;
//     return database.executar(instrucaoSql, [fk_unidade_consumidora]);
// }

var database = require("../database/config");

// function duracaoMedia(fk_unidade_consumidora, fk_distribuidora) {
//     var instrucaoSql = `
//         SELECT ROUND(AVG(i.duracao), 0) AS duracao_media
//         FROM interrupcao i
//         JOIN unidade_consumidora uc ON i.fk_unidade_consumidora = uc.id_unidade_consumidora
//         WHERE i.fk_unidade_consumidora = ${fk_unidade_consumidora} AND uc.fk_distribuidora = ${fk_distribuidora}
//         GROUP BY uc.fk_distribuidora;
//     `;
//     return database.executar(instrucaoSql, [fk_unidade_consumidora, fk_distribuidora]);
// }

function duracaoMedia(fk_unidade_consumidora, id_distribuidora, data_inicio, data_fim) {
    var instrucaoSql = `
        SELECT ROUND(AVG(i.duracao), 0) AS duracao_media
FROM interrupcao i
JOIN unidade_consumidora uc ON i.fk_unidade_consumidora = uc.id_unidade_consumidora
WHERE i.fk_unidade_consumidora = ${fk_unidade_consumidora}
AND uc.fk_distribuidora = ${id_distribuidora}
AND i.dt_inicio >= '${data_inicio}'
AND i.dt_fim <= '${data_fim}';
    `;

    return database.executar(instrucaoSql, [fk_unidade_consumidora, id_distribuidora, data_inicio, data_fim]);
}


function maiorIndiceQuedas(fk_unidade_consumidora, id_distribuidora, data_inicio, data_fim) {
    var instrucaoSql = `
        SELECT DATE(dt_inicio) AS data, COUNT(*) AS quantidade
        FROM interrupcao i
        JOIN unidade_consumidora uc ON i.fk_unidade_consumidora = uc.id_unidade_consumidora
        WHERE i.fk_unidade_consumidora = ${fk_unidade_consumidora}
        AND uc.fk_distribuidora = ${id_distribuidora}
        AND i.dt_inicio >= '${data_inicio}'
        AND i.dt_fim <= '${data_fim}'
        GROUP BY DATE(dt_inicio)
        ORDER BY quantidade DESC
        LIMIT 1;
    `;

    return database.executar(instrucaoSql, [fk_unidade_consumidora, id_distribuidora, data_inicio, data_fim]);
}




// function maiorIndiceQuedas(fk_unidade_consumidora, fk_distribuidora) {
//     var instrucaoSql = `
//         SELECT DATE(dt_inicio) AS data, COUNT(*) AS quantidade
//         FROM interrupcao i
//         JOIN unidade_consumidora uc ON i.fk_unidade_consumidora = uc.id_unidade_consumidora
//         WHERE i.fk_unidade_consumidora = ${fk_unidade_consumidora} AND uc.fk_distribuidora = ${fk_distribuidora}
//         GROUP BY DATE(dt_inicio)
//         ORDER BY quantidade DESC
//         LIMIT 1;
//     `;
//     return database.executar(instrucaoSql, [fk_unidade_consumidora, fk_distribuidora]);
// }


function mediaPorDia(fk_unidade_consumidora, id_distribuidora, data_inicio, data_fim) {
    var instrucaoSql = `
        SELECT ROUND(COUNT(*) / COUNT(DISTINCT DATE(dt_inicio)), 1) AS media_quedas_dia
        FROM interrupcao i
        JOIN unidade_consumidora uc ON i.fk_unidade_consumidora = uc.id_unidade_consumidora
        WHERE i.fk_unidade_consumidora = ${fk_unidade_consumidora}
        AND uc.fk_distribuidora = ${id_distribuidora}
        AND i.dt_inicio >= '${data_inicio}'
        AND i.dt_fim <= '${data_fim}';
    `;

    return database.executar(instrucaoSql, [fk_unidade_consumidora, id_distribuidora, data_inicio, data_fim]);
}

// function mediaPorDia(fk_unidade_consumidora, fk_distribuidora) {
//     var instrucaoSql = `
//         SELECT ROUND(COUNT(*) / COUNT(DISTINCT DATE(dt_inicio)), 1) AS media_quedas_dia
//         FROM interrupcao i
//         JOIN unidade_consumidora uc ON i.fk_unidade_consumidora = uc.id_unidade_consumidora
//         WHERE i.fk_unidade_consumidora = ${fk_unidade_consumidora} AND uc.fk_distribuidora = ${fk_distribuidora}
//     `;
//     return database.executar(instrucaoSql, [fk_unidade_consumidora, fk_distribuidora]);
// }

// function dadosGraficoLinha(fk_unidade_consumidora, fk_distribuidora) {
//     var instrucaoSql = `
//         SELECT DATE(dt_inicio) AS data, COUNT(*) AS total_quedas
//         FROM interrupcao i
//         JOIN unidade_consumidora uc ON i.fk_unidade_consumidora = uc.id_unidade_consumidora
//         WHERE i.fk_unidade_consumidora = ${fk_unidade_consumidora} AND uc.fk_distribuidora = ${fk_distribuidora}
//         GROUP BY data
//         ORDER BY data;
//     `;
//     return database.executar(instrucaoSql, [fk_unidade_consumidora, fk_distribuidora]);
// }

function dadosGraficoLinha(fk_unidade_consumidora, id_distribuidora, data_inicio, data_fim) {
    var instrucaoSql = `
        SELECT DATE(dt_inicio) AS data, COUNT(*) AS total_quedas
        FROM interrupcao i
        JOIN unidade_consumidora uc ON i.fk_unidade_consumidora = uc.id_unidade_consumidora
        WHERE i.fk_unidade_consumidora = ${fk_unidade_consumidora}
        AND uc.fk_distribuidora = ${id_distribuidora}
        AND i.dt_inicio >= '${data_inicio}'
        AND i.dt_fim <= '${data_fim}'
        GROUP BY data
        ORDER BY data;
    `;

    return database.executar(instrucaoSql, [fk_unidade_consumidora, id_distribuidora, data_inicio, data_fim]);
}



// function dadosGraficoBarra(fk_unidade_consumidora, fk_distribuidora) {
//     var instrucaoSql = `
//         SELECT m.nome AS motivo, COUNT(*) AS total
//         FROM interrupcao i
//         JOIN motivo m ON i.fk_motivo = m.id_motivo
//         JOIN unidade_consumidora uc ON i.fk_unidade_consumidora = uc.id_unidade_consumidora
//         WHERE i.fk_unidade_consumidora = ${fk_unidade_consumidora} AND uc.fk_distribuidora = ${fk_distribuidora}
//         GROUP BY motivo
//         ORDER BY total desc limit 5;
//     `;
//     return database.executar(instrucaoSql, [fk_unidade_consumidora, fk_distribuidora]);
// }

function dadosGraficoBarra(fk_unidade_consumidora, id_distribuidora, data_inicio, data_fim) {
    var instrucaoSql = `
        SELECT m.nome AS motivo, COUNT(*) AS total
        FROM interrupcao i
        JOIN motivo m ON i.fk_motivo = m.id_motivo
        JOIN unidade_consumidora uc ON i.fk_unidade_consumidora = uc.id_unidade_consumidora
        WHERE i.fk_unidade_consumidora = ${fk_unidade_consumidora}
        AND uc.fk_distribuidora = ${id_distribuidora}
        AND i.dt_inicio >= '${data_inicio}'
        AND i.dt_fim <= '${data_fim}'
        GROUP BY motivo
        ORDER BY total DESC
        LIMIT 5;
    `;

    return database.executar(instrucaoSql, [fk_unidade_consumidora, id_distribuidora, data_inicio, data_fim]);
}



module.exports = {
    duracaoMedia,
    maiorIndiceQuedas,
    mediaPorDia,
    dadosGraficoLinha,
    dadosGraficoBarra
};
