var express = require("express");
var router = express.Router();
var unidadeController = require("../controllers/unidadeController");

router.get("/unidades-disponiveis/:idDistribuidora", function (req, res) {
  unidadeController.listarUnidades(req, res);
});

router.put("/associar", function (req, res) {
  unidadeController.associarUnidade(req, res);
});

router.pull("/desassociar/:idUnidade", function (req, res) {
  unidadeController.desassociarUnidade(req, res);
});

module.exports = router;
