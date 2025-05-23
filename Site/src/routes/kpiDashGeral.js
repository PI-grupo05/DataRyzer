// src/routes/kpiDashGeral.js
var express = require("express");
var router = express.Router();
var kpiDashGeralController = require("../controllers/kpiDashGeralController");

// Rotas para KPIs
router.get("/cidade-mais-afetada", kpiDashGeralController.obterCidadeMaisAfetada);
router.get("/cidade-maior-tempo-interrupcao", kpiDashGeralController.obterCidadeMaiorTempoInterrupcao);

// Rotas para Gráficos
router.get("/interrupcoes-por-cidade", kpiDashGeralController.obterInterrupcoesPorCidade);
router.get("/duracao-media-interrupcoes", kpiDashGeralController.obterDuracaoMediaInterrupcoes);

router.get("/volume-por-motivo", kpiDashGeralController.obterVolumeInterrupcoesPorMotivo);
router.get("/duracao-media-por-cidade", kpiDashGeralController.obterDuracaoMediaPorCidade);


module.exports = router;
