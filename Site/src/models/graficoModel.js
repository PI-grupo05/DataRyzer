
var database = require("../database/config");

function dadosGraficos() {
    var instrucaoSql = `
    select
        (select count(heroiFav) from usuario where heroiFav = 'Wolverine') as 'Wolverine',
        (select count(heroiFav) from usuario where heroiFav = 'Homem de Ferro') as 'HomemDeFerro',
        (select count(heroiFav) from usuario where heroiFav = 'Homem-Aranha') as 'HomemAranha',
        (select count(heroiFav) from usuario where heroiFav = 'Capitão América') as 'CapitaoAmerica';
       
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function heroisMaisEscolhido() {
    var instrucaoSql = `
        SELECT heroiFav, COUNT(*) AS quantidade
    FROM usuario
    GROUP BY heroiFav
    ORDER BY quantidade DESC
    LIMIT 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function jogadoresPontos() {
    var instrucaoSql = `
SELECT 
    usuario.id AS jogador_id,
    usuario.nome AS nome_jogador,
    SUM(Quiz.pontos) AS pontos_totais
FROM 
    usuario
JOIN 
    Quiz ON Quiz.fkUsuario = usuario.id
GROUP BY 
    usuario.id
ORDER BY 
    pontos_totais DESC;`
console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
    
}
function mediaPontos() {
    var instrucaoSql = `select round(avg(pontos),2) FROM Quiz;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
}
function maiorPontuador() {
    var instrucaoSql = `SELECT 
    usuario.nome AS nome_jogador, 
    SUM(Quiz.pontos) AS total_pontos
FROM 
    usuario
JOIN 
    Quiz ON usuario.id = Quiz.fkUsuario
GROUP BY 
    usuario.id
ORDER BY 
    total_pontos DESC
LIMIT 1;
    `
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
return database.executar(instrucaoSql);
    
}

module.exports = {
    dadosGraficos,
    heroisMaisEscolhido,
    jogadoresPontos,
    mediaPontos,
    maiorPontuador
};
