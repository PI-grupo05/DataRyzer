var historicoModel = require("../models/historicoModel");

function buscarHistorico(req, res) {

    var idDistribuidora = req.params.idDistribuidora

    console.log("Pegando as ultimas interrupções em controllers.")

    historicoModel.buscarHistorico(idDistribuidora).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o historico de interrupções.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function buscarHistoricoPorfiltro(req, res) {
    var idDistribuidora = req.params.idDistribuidora
    var pesquisa = req.params.pesquisa
    var tipo = req.params.tipo

    console.log(`Pegando as interrupções pesquisando por ${tipo} em controllers. Valor da pesquisa: ${pesquisa}`)

    historicoModel.buscarHistoricoPorfiltro(pesquisa, tipo, idDistribuidora).then(function (resultado) {
         res.status(200).json(resultado);
        
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar o historico de interrupções com a pesquisa.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });

}



module.exports = {
   buscarHistorico,
   buscarHistoricoPorfiltro
};