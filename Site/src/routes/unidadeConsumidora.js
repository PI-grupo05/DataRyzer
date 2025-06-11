var express = require("express");
var router = express.Router();

var unidadeConsumidoraController = require("../controllers/unidadeConsumidoraController");

router.get("/exibirUnidadesConsumidoras/:valorFiltro?", function (req, res) {
    unidadeConsumidoraController.exibirUnidadesConsumidoras(req, res);
})

module.exports = router;