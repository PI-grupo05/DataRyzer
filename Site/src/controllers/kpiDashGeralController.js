var kpiDashGeralModel = require("../models/kpiDashGeralModel");

function obterUnidadeMaisAfetada(req, res) {
  var idDistribuidora = req.params.idDistribuidora;

  if (!idDistribuidora) {
    return res.status(400).json({ error: "idDistribuidora não enviado" });
  }

  kpiDashGeralModel
    .unidadeMaisAfetada(idDistribuidora)
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function obterUnidadeMaiorTempoInterrupcao(req, res) {
  var idDistribuidora = req.params.idDistribuidora;

  if (!idDistribuidora) {
    return res.status(400).json({ error: "idDistribuidora não enviado" });
  }

  kpiDashGeralModel
    .unidadeMaiorTempoInterrupcao(idDistribuidora)
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function obterInterrupcoesPorCidade(req, res) {
  kpiDashGeralModel
    .interrupcoesPorCidade()
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function obterDuracaoMediaInterrupcoes(req, res) {
  var idDistribuidora = req.params.idDistribuidora;

  if (!idDistribuidora) {
    return res.status(400).json({ error: "idDistribuidora não enviado" });
  }

  kpiDashGeralModel
    .duracaoMediaInterrupcoes(idDistribuidora)
    .then((resultado) => {
      res.json(resultado);
    })
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function obterVolumeInterrupcoesPorMotivo(req, res) {
  kpiDashGeralModel
    .volumeInterrupcoesPorMotivo()
    .then((resultado) => res.json(resultado))
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function obterDuracaoMediaPorCidade(req, res) {
  kpiDashGeralModel
    .duracaoMediaPorCidade()
    .then((resultado) => res.json(resultado))
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function obterPorcentagemPorMotivo(req, res) {
  kpiDashGeralModel
    .porcentagemPorMotivo()
    .then((resultado) => res.json(resultado))
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  obterUnidadeMaisAfetada,
  obterUnidadeMaiorTempoInterrupcao,
  obterInterrupcoesPorCidade,
  obterDuracaoMediaInterrupcoes,
  obterVolumeInterrupcoesPorMotivo,
  obterDuracaoMediaPorCidade,
  obterPorcentagemPorMotivo,
};
