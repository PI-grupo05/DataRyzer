var database = require("../database/config")



function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT id, nome, email, heroiFav FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrar(nome, email, senha, telefone, codigo_associacao_master, tipo_usuario) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
  
    return buscaCodigoDistribuidora(codigo_associacao_master)
      .then(resultadoDistribuidora => {
        if (resultadoDistribuidora.length === 0) {
          return Promise.reject("Código de associação inválido");
        }

        const fk_cidade = null;
        
        const fkDistribuidora = resultadoDistribuidora[0].id_distribuidora;
        
        if(fk_cidade == null){
            var instrucaoSql = `
            INSERT INTO usuario (nome, tipo_usuario, telefone, email, senha, fk_cidade, fk_distribuidora)
            VALUES ('${nome}','${tipo_usuario}', '${telefone}', '${email}', '${senha}', ${fk_cidade}, '${fkDistribuidora}');
          `;
        }else{
            var instrucaoSql = `
          INSERT INTO usuario (nome, tipo_usuario, telefone, email, senha, fk_cidade, fk_distribuidora)
          VALUES ('${nome}','${tipo_usuario}', '${telefone}', '${email}', '${senha}', '${fk_cidade}', '${fkDistribuidora}');
        `;
        }
        
  
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
    
};