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

function obterInterrupcoesPorCidade(req, res) {
    kpiDashGeralModel.interrupcoesPorCidade()
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterDuracaoMediaInterrupcoes(req, res) {
    kpiDashGeralModel.duracaoMediaInterrupcoes()
        .then(resultado => {
            res.json(resultado);
        })
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}


function obterVolumeInterrupcoesPorMotivo(req, res) {
    kpiDashGeralModel.volumeInterrupcoesPorMotivo()
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterDuracaoMediaPorCidade(req, res) {
    kpiDashGeralModel.duracaoMediaPorCidade()
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}


module.exports = {
    obterCidadeMaisAfetada,
    obterCidadeMaiorTempoInterrupcao,
    obterInterrupcoesPorCidade,
    obterDuracaoMediaInterrupcoes,
    obterVolumeInterrupcoesPorMotivo,
    obterDuracaoMediaPorCidade
};
