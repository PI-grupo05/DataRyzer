var database = require("../database/config")


function buscarHistorico(idDistribuidora) {


    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarHistorico: ", idDistribuidora)
    
    var instrucaoSql = `
        SELECT
            d.id_distribuidora AS idDistribuidora,
            d.nome AS distribuidora,
            uc.nome AS unidade_consumidora,
            i.dt_inicio AS data_inicio,
            i.dt_fim AS data_fim,
            i.duracao,
            m.nome AS motivo
        FROM
            interrupcao i
        JOIN unidade_consumidora uc ON i.fk_unidade_consumidora = uc.id_unidade_consumidora
        JOIN distribuidora d ON uc.fk_distribuidora = d.id_distribuidora
        JOIN motivo m ON i.fk_motivo = m.id_motivo
        WHERE
            d.id_distribuidora = ${idDistribuidora}
        ORDER BY
            i.dt_inicio DESC
        LIMIT 50;
        `;
        
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}



function buscarHistoricoPorfiltro(pesquisa, tipo, idDistribuidora){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarHistoricoPorFilttro: ", idDistribuidora)
    
    var instrucaoSql = `
        SELECT
            d.id_distribuidora AS idDistribuidora,
            d.nome AS distribuidora,
            uc.nome AS unidade_consumidora,
            i.dt_inicio AS data_inicio,
            i.dt_fim AS data_fim,
            i.duracao,
            m.nome AS motivo
        FROM
            interrupcao i
        JOIN unidade_consumidora uc ON i.fk_unidade_consumidora = uc.id_unidade_consumidora
        JOIN distribuidora d ON uc.fk_distribuidora = d.id_distribuidora
        JOIN motivo m ON i.fk_motivo = m.id_motivo
        WHERE
            d.id_distribuidora = ${idDistribuidora} and ${tipo} like '%${pesquisa}%'
        ORDER BY
            i.dt_inicio DESC
        LIMIT 50;
        `;
        
    console.log("Executando a instrução SQL: \n" + instrucaoSql);

    return database.executar(instrucaoSql);
}
module.exports = {
    buscarHistorico,
    buscarHistoricoPorfiltro
};
