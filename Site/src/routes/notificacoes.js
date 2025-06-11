var express = require("express");
var router = express.Router();

var notificacoesController = require("../controllers/notificacoesController");

router.get("/ultimaParametrizacao/:fkDistribuidora", function (req, res) {
    notificacoesController.ultimaParametrizacao(req, res);
})

router.get("/consultarParametrizacao/:fkDistribuidora", function (req, res) {
    notificacoesController.consultarParametrizacao(req, res);
})

router.put("/atualizarParametrizacao", function (req, res) {
    notificacoesController.atualizarParametrizacao(req, res);
})

router.post("/criarParametrizacao", function (req, res) {
    notificacoesController.criarParametrizacao(req, res);
})


module.exports = router
