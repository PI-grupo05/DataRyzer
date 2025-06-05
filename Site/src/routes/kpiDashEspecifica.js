var express = require("express");
var router = express.Router();
var kpiDashEspecificaController = require("../controllers/kpiDashEspecificaController");

router.get("/duracao-media", kpiDashEspecificaController.obterDuracaoMedia);
router.get("/maior-indice-quedas", kpiDashEspecificaController.obterMaiorIndiceQuedas);
router.get("/media-por-dia", kpiDashEspecificaController.obterMediaPorDia);

router.get("/grafico-linha", kpiDashEspecificaController.obterDadosGraficoLinha);
router.get("/grafico-barra", kpiDashEspecificaController.obterDadosGraficoBarra);

module.exports = router;
