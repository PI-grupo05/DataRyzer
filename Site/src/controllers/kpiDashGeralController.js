var kpiDashGeralModel = require("../models/kpiDashGeralModel");

function obterCidadeMaisAfetada(req, res) {
    kpiDashGeralModel.cidadeMaisAfetada()
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterCidadeMaiorTempoInterrupcao(req, res) {
    kpiDashGeralModel.cidadeMaiorTempoInterrupcao()
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    obterCidadeMaisAfetada,
    obterCidadeMaiorTempoInterrupcao
};
