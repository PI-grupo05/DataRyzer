// src/routes/kpiDashGeral.js
var express = require("express");
var router = express.Router();
var kpiDashGeralController = require("../controllers/kpiDashGeralController");

// Rotas para KPIs
router.get("/unidade-maior-tempo/:idDistribuidora", function (req, res) {
  kpiDashGeralController.obterUnidadeMaiorTempoInterrupcao(req, res);
});

router.get("/unidade-mais-afetada/:idDistribuidora", function (req, res) {
  kpiDashGeralController.obterUnidadeMaisAfetada(req, res);
});

// Rotas para Gráficos
router.get("/interrupcoes-por-unidade/:idDistribuidora", function (req, res) {
  kpiDashGeralController.obterInterrupcoesPorUnidade(req, res);
});

router.get("/duracao-media-por-unidade/:idDistribuidora", function (req, res) {
  kpiDashGeralController.obterDuracaoMediaInterrupcoes(req, res);
});

router.get("/volume-interrupcoes-motivo/:idDistribuidora", function (req, res) {
  kpiDashGeralController.obterVolumeInterrupcoesPorMotivo(req, res);
});

router.get(
  "/duracao-media-por-cidade",
  kpiDashGeralController.obterDuracaoMediaPorCidade
);
router.get(
  "/porcentagem-por-motivo",
  kpiDashGeralController.obterPorcentagemPorMotivo
); // grafico de pizza

module.exports = router;