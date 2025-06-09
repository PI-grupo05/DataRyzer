var notificacaoModel = require("../models/notificacaoModel");

function ultimaParametrizacao(req, res) {
    var fk_distribuidora = req.params.fkDistribuidora
    
    notificacaoModel.consultarParametrizacao(fk_distribuidora)
   .then(
        function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`); 
            res.json({
                fkDistribuidora: fk_distribuidora ,
                url: resultado[0].url,
                receberNotificacao: resultado[0].receber_notificacao,
                frequencia: resultado[0].frequencia_notificacao,
                quantidadeResultados: resultado[0].length
            })
        }
   )
   .catch(  
    function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar ao carregar as credenciais! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function consultarParametrizacao(req, res) {
    var fk_distribuidora = req.params.fkDistribuidora
    
    notificacaoModel.consultarParametrizacao(fk_distribuidora)
   .then(
        function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`); 
            res.json({
                quantidadeResultados: resultado.length
            })
        }
   )
   .catch(  
    function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar ao carregar as credenciais! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function atualizarParametrizacao(req, res) {
    var fkDistribuidora = req.body.fkDistribuidora
    var url = req.body.url
    var receberNotificacao = req.body.receberNotificacao
    var frequencia = req.body.frequencia


    notificacaoModel.atualizarParametrizacao(fkDistribuidora, url, receberNotificacao, frequencia)
        .then(
            function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`);

                res.status(200).send("Parametrização atualizado com sucesso")
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao atualizar a parametrização! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function criarParametrizacao(req, res) {
    var fkDistribuidora = req.body.fkDistribuidora
    var url = req.body.url
    var receberNotificacao = req.body.receberNotificacao
    var frequencia = req.body.frequencia


    notificacaoModel.criarParametrizacao(fkDistribuidora, url, receberNotificacao, frequencia)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("\nHouve um erro ao criar parametrização!");
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
           
        });
    
}

module.exports = {
    consultarParametrizacao,
    atualizarParametrizacao,
    criarParametrizacao,
    ultimaParametrizacao
}

