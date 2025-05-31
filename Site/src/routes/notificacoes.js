var express = require("express");
var router = express.Router();

var notificacoesController = require("../controllers/notificacoesController");


router.post("/notificacoes", function (req, res) {
    notificacoesController.notificacoes(req, res);
})



Module.exports = router
