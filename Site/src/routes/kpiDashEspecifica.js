var express = require("express");
var router = express.Router();
var kpiDashEspecificaController = require("../controllers/kpiDashEspecificaController");

router.get(
    "/duracao-media/:fk_unidade_consumidora/:fk_distribuidora",
    kpiDashEspecificaController.obterDuracaoMedia
);
router.get(
    "/maior-indice-quedas/:fk_unidade_consumidora/:fk_distribuidora",
    kpiDashEspecificaController.obterMaiorIndiceQuedas
);
router.get(
    "/media-por-dia/:fk_unidade_consumidora/:fk_distribuidora",
    kpiDashEspecificaController.obterMediaPorDia
);

router.get(
    "/grafico-linha/:fk_unidade_consumidora/:fk_distribuidora",
    kpiDashEspecificaController.obterDadosGraficoLinha
);
router.get(
    "/grafico-barra/:fk_unidade_consumidora/:fk_distribuidora",
    kpiDashEspecificaController.obterDadosGraficoBarra
);

module.exports = router;
