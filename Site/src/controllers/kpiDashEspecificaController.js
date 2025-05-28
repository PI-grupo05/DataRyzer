var kpiDashEspecificaModel = require("../models/kpiDashEspecificaModel");

function obterDuracaoMedia(req, res) {
    kpiDashEspecificaModel.duracaoMedia()
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterMaiorIndiceQuedas(req, res) {
    kpiDashEspecificaModel.maiorIndiceQuedas()
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterMediaPorDia(req, res) {
    kpiDashEspecificaModel.mediaPorDia()
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}



var kpiDashEspecificaModel = require("../models/kpiDashEspecificaModel");

function obterDadosGraficoLinha(req, res) {
    var idCidade = req.params.idCidade; // Recebendo ID da cidade via parâmetro
    kpiDashEspecificaModel.dadosGraficoLinha(idCidade)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function obterDadosGraficoBarra(req, res) {
    var idCidade = req.params.idCidade; // Recebendo ID da cidade via parâmetro
    kpiDashEspecificaModel.dadosGraficoBarra(idCidade)
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
