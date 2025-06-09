var database = require("../database/config");

function consultarParametrizacao(fkDistribuidora) {
    var instrucao = `
        SELECT * FROM parametrizacao WHERE fk_distribuidora = ${fkDistribuidora};
    `;
    console.log(`executando ${instrucao}`)
    return database.executar(instrucao);
}

function criarParametrizacao(fkDistribuidora, url, receberNotificacao, frequencia) {
    var instrucao = `
        INSERT INTO parametrizacao (fk_distribuidora, url, receber_notificacao, frequencia_notificacao)
        VALUES (${fkDistribuidora}, '${url}', ${receberNotificacao}, '${frequencia}');
    `;
    console.log(`executando ${instrucao}`)
    return database.executar(instrucao);
}

function atualizarParametrizacao(fkDistribuidora, url, receberNotificacao, frequencia) {
    var instrucao = `
        UPDATE parametrizacao
        SET url = '${url}',
            receber_notificacao = ${receberNotificacao},
            frequencia_notificacao = '${frequencia}'
        WHERE fk_distribuidora = ${fkDistribuidora};
    `;
    console.log(`executando ${instrucao}`)
    return database.executar(instrucao);
}

module.exports = {
    consultarParametrizacao,
    criarParametrizacao,
    atualizarParametrizacao,
};
