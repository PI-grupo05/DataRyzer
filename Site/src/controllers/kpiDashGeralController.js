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

function obterMotivoMaisRecorrente(req, res) {
  var idDistribuidora = req.params.idDistribuidora;

  if (!idDistribuidora) {
    return res.status(400).json({ error: "idDistribuidora não enviado" });
  }

  kpiDashGeralModel
    .motivoMaisRecorrente(idDistribuidora)
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
// grafics
function obterInterrupcoesPorUnidade(req, res) {
  var idDistribuidora = req.params.idDistribuidora;

  if (!idDistribuidora) {
    return res.status(400).json({ error: "idDistribuidora não enviado" });
  }
  kpiDashGeralModel
    .interrupcoesPorUnidade(idDistribuidora)
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
  var idDistribuidora = req.params.idDistribuidora;

  if (!idDistribuidora) {
    return res.status(400).json({ error: "idDistribuidora não enviado" });
  }

  kpiDashGeralModel
    .volumeInterrupcoesPorMotivo(idDistribuidora)
    .then((resultado) => res.json(resultado))
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function obterPorcentagemPorMotivo(req, res) {
  var idDistribuidora = req.params.idDistribuidora;

  if (!idDistribuidora) {
    return res.status(400).json({ error: "idDistribuidora não enviado" });
  }

  kpiDashGeralModel
    .porcentagemPorMotivo(idDistribuidora)
    .then((resultado) => res.json(resultado))
    .catch((erro) => {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  obterUnidadeMaisAfetada,
  obterUnidadeMaiorTempoInterrupcao,
  obterInterrupcoesPorUnidade,
  obterDuracaoMediaInterrupcoes,
  obterVolumeInterrupcoesPorMotivo,
  obterPorcentagemPorMotivo,
  obterMotivoMaisRecorrente,
};
