var express = require("express");
var router = express.Router();

var historicoController = require("../controllers/historicoController");

router.get("/buscarHistorico/:idDistribuidora", function (req, res) {
    historicoController.buscarHistorico(req, res);
});

router.get("/buscarHistoricoPorfiltro/:idDistribuidora/:pesquisa/:tipo", function (req, res) {
    historicoController.buscarHistoricoPorfiltro(req, res);
});


module.exports = router;
