var express = require("express");
var router = express.Router();
var gruposController = require("../controllers/gruposController");

router.post("/criar", function (req, res) {
  gruposController.criarGrupo(req, res);  
});

router.get("/listar/:idUsuario", function (req, res) {
  gruposController.listarPorUsuario(req, res);
});

router.put("/editar/:idGrupo", function (req, res) {
  gruposController.editarGrupo(req, res);
});
module.exports = router;
