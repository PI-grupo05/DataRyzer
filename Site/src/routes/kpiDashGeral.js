var express = require("express");
var router = express.Router();
var kpiDashGeralController = require("../controllers/kpiDashGeralController");


router.get("/cidade-mais-afetada", kpiDashGeralController.obterCidadeMaisAfetada);
router.get("/cidade-maior-tempo-interrupcao", kpiDashGeralController.obterCidadeMaiorTempoInterrupcao);

module.exports = router;
