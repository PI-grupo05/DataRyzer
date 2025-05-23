var database = require("../database/config")


function buscarHistorico(idUnidadeConsumidora) {


    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function buscarHistorico: ", idUnidadeConsumidora)
    
    var instrucaoSql = `
        SELECT 
            i.id_interrupcao AS id_interrupcao,
            i.dt_inicio AS inicio,
            i.dt_fim AS fim,
            i.duracao AS duracao_minutos,
            c.nome AS unidade_consumidora,
            d.nome AS distribuidora,
            m.nome AS motivo
        FROM 
            interrupcao i
        JOIN 
            cidade c ON i.fk_cidade = c.id_cidade
        JOIN 
            distribuidora d ON c.fk_distribuidora = d.id_distribuidora
        JOIN 
            motivo m ON i.fk_motivo = m.id_motivo;
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
