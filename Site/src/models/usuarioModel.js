var database = require("../database/config")


function exibirDiretoresRegionais(){
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirDiretoresRegionais(): ")
    var instrucaoSql = `
        select id_usuario, usuario.nome as diretor,
        distribuidora.nome as distribuidora,
        unidade_consumidora.nome as unidade_consumidora
        from usuario join distribuidora
        on fk_distribuidora = id_distribuidora
        join unidade_consumidora
        on fk_unidade_consumidora = id_unidade_consumidora
        where tipo_usuario = 'REGIONAL' order by id_usuario;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function pegarDadosDiretor(id_usuario){
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function pegarDadosDiretor(): pegando dados do diretor com id = ", id_usuario)
    var instrucaoSql = `
        select usuario.nome as diretor, email, distribuidora.nome as distribuidora, telefone from usuario join distribuidora on fk_distribuidora = id_distribuidora where fk_distribuidora = 1 and id_usuario = ${id_usuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarDadosDiretor(id_usuario, nome, email, telefone){
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarDadosDiretor(): atualizando dados do diretor com id = ", id_usuario)
    var instrucaoSql = `
        update usuario set nome = '${nome}', email = '${email}', telefone = '${telefone}' where id_usuario = ${id_usuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deletarDadosDiretor(id_usuario){
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletarDadosDiretor(): deletando dados do diretor com id = ", id_usuario)
    var instrucaoSql = `
        delete from usuario where id_usuario = ${id_usuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id_usuario, nome, tipo_usuario, telefone, email, fk_unidade_consumidora, fk_distribuidora FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, telefone, codigo_associacao_master, tipo_usuario, fk_unidade_consumidora) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
  
    return buscaCodigoDistribuidora(codigo_associacao_master)
      .then(resultadoDistribuidora => {
        if (resultadoDistribuidora.length === 0) {
          return Promise.reject("Código de associação inválido");
        }
        
        const fkDistribuidora = resultadoDistribuidora[0].id_distribuidora;
         
        var instrucaoSql = `
        INSERT INTO usuario (nome, tipo_usuario, telefone, email, senha, fk_unidade_consumidora, fk_distribuidora)
        VALUES ('${nome}','${tipo_usuario}', '${telefone}', '${email}', '${senha}', ${fk_unidade_consumidora}, '${fkDistribuidora}');
        `;
    
  
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
      });
  }

function buscaCodigoDistribuidora(codigoAssociacao){
    var instrucaoSql = `
        select id_distribuidora from distribuidora where codigo_associacao_master = '${codigoAssociacao}';
    `;

    return database.executar(instrucaoSql);
}



module.exports = {
    autenticar,
    cadastrar,
    pegarDadosDiretor,
    exibirDiretoresRegionais,
    deletarDadosDiretor,
    atualizarDadosDiretor,
};