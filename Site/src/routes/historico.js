var express = require("express");
var router = express.Router();

var historicoController = require("../controllers/historicoController");

router.get("/buscarHistorico/:idDistribuidora", function (req, res) {
    historicoController.buscarHistorico(req, res);
});

module.exports = router;
