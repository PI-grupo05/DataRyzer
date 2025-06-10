var express = require("express");
var router = express.Router();
var filtroController = require("../controllers/filtroControllers");

router.get("/datas_inicio", filtroController.listarDatasInicio);
router.get("/datas_fim", filtroController.listarDatasFim);
router.get("/listar/:idUsuario", filtroController.listarFiltros);
router.get("/listar", filtroController.listarFiltros);

// router.delete("/deletar/:id", filtroController.deletarFiltro);

router.post("/criar", function (req, res) {
  filtroController.salvarFiltro(req, res);
});
// router.post("/salvar", filtroController.salvarFiltro);


router.put("/editar/:id", function (req, res) {
  filtroController.atualizarFiltro(req, res);
});
// router.put("/atualizar/:id", filtroController.atualizarFiltro);
router.get("/listar/:idUsuario", filtroController.listarFiltros);

router.delete("/deletar/:id", function(req,res){
    filtroController.deletarFiltro(req,res);
});

router.get("/detalhes/:idFiltro", filtroController.obterDetalhesFiltro);


module.exports = router;
