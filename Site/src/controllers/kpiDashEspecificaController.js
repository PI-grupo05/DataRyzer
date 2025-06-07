var kpiDashEspecificaModel = require("../models/kpiDashEspecificaModel");

function obterDuracaoMedia(req, res) {
    var fk_unidade_consumidora = req.params.fk_unidade_consumidora;
    var fk_distribuidora = req.params.fk_distribuidora;

    kpiDashEspecificaModel.duracaoMedia(fk_unidade_consumidora, fk_distribuidora)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterMaiorIndiceQuedas(req, res) {
    var fk_unidade_consumidora = req.params.fk_unidade_consumidora;
    var fk_distribuidora = req.params.fk_distribuidora;

    kpiDashEspecificaModel.maiorIndiceQuedas(fk_unidade_consumidora, fk_distribuidora)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterMediaPorDia(req, res) {
    var fk_unidade_consumidora = req.params.fk_unidade_consumidora;
    var fk_distribuidora = req.params.fk_distribuidora;

    kpiDashEspecificaModel.mediaPorDia(fk_unidade_consumidora, fk_distribuidora)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterDadosGraficoLinha(req, res) {
    var fk_unidade_consumidora = req.params.fk_unidade_consumidora;
    var fk_distribuidora = req.params.fk_distribuidora;

    kpiDashEspecificaModel.dadosGraficoLinha(fk_unidade_consumidora, fk_distribuidora)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterDadosGraficoBarra(req, res) {
    var fk_unidade_consumidora = req.params.fk_unidade_consumidora;
    var fk_distribuidora = req.params.fk_distribuidora;

    kpiDashEspecificaModel.dadosGraficoBarra(fk_unidade_consumidora, fk_distribuidora)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    obterDadosGraficoLinha,
    obterDadosGraficoBarra,
    obterDuracaoMedia,
    obterMaiorIndiceQuedas,
    obterMediaPorDia
};
