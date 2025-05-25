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


module.exports = {
   buscarHistorico
};