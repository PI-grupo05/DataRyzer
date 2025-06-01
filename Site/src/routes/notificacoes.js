var express = require("express");
var router = express.Router();

var notificacoesController = require("../controllers/notificacoesController");


router.get("/consultarParametrizacao", function (req, res) {
    notificacoesController.consultarParametrizacao(req, res);
})

router.put("/atualizarParametrizacao", function (req, res) {
    notificacoesController.atualizarParametrizacao(req, res);
})


router.post("/atualizarParametrizacao", function (req, res) {
    notificacoesController.atualizarParametrizacao(req, res);
})


module.exports = router
