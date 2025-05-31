var database = require("../database/config");

function consultarParametrizacao(idUsuario) {
    var instrucao = `
        SELECT * FROM ParametrizacaoNotificacao WHERE fkUsuario = ${idUsuario};
    `;
    return database.executar(instrucao);
}

function criarParametrizacao(idUsuario, credencial, acaoNotificar, frequencia) {
    var instrucao = `
        INSERT INTO ParametrizacaoNotificacao (fkUsuario, credencial, acaoNotificar, frequenciaNotificacao)
        VALUES (${idUsuario}, '${credencial}', '${acaoNotificar}', '${frequencia}');
    `;
    return database.executar(instrucao);
}

function atualizarParametrizacao(idUsuario, credencial, acaoNotificar, frequencia) {
    var instrucao = `
        UPDATE ParametrizacaoNotificacao
        SET credencial = '${credencial}',
            acaoNotificar = '${acaoNotificar}',
            frequenciaNotificacao = '${frequencia}'
        WHERE fkUsuario = ${idUsuario};
    `;
    return database.executar(instrucao);
}

module.exports = {
    consultarParametrizacao,
    criarParametrizacao,
    atualizarParametrizacao,
};
