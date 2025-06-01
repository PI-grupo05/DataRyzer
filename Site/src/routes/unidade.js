var express = require("express");
var router = express.Router();
var unidadeController = require("../controllers/unidadeController");

router.get("/unidades-disponiveis/:idDistribuidora", function (req, res) {
  unidadeController.listarUnidades(req, res);
});

router.put("/associar", function (req, res) {
  unidadeController.associarUnidade(req, res);
});

router.put("/desassociar/:idUnidade", function (req, res) {
  unidadeController.dessasociarUnidade(req, res);
});

router.get("/unidades-associadas/:idGrupo", function (req, res) {
  unidadeController.carregarUnidades(req, res);
});

router.get("/carregarNomeGrupo/:idGrupo", function (req, res) {
  unidadeController.carregarNomeGrupo(req, res);
});

module.exports = router;
