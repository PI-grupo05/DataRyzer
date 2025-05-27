var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/listarDiretoresRegionais", function (req, res) {
    usuarioController.exibirDiretoresRegionais(res);
});

router.get("/pegarDadosDiretor/:id_usuario", function (req, res) {
    usuarioController.pegarDadosDiretor(req, res);
});

router.put("/atualizarDadosDiretor/:id_usuario", function (req, res) {
    usuarioController.atualizarDadosDiretor(req, res);
});

router.delete("/deletarDadosDiretor/:id_usuario", function (req, res) {
    usuarioController.deletarDadosDiretor(req, res);
});


module.exports = router;