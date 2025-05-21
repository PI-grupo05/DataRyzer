var express = require("express");
var router = express.Router();
var grouposController = require("../controllers/gruposController");

router.post("/criarGrupo", function (req, res) {
  grouposController.criarGrupo(req, res);
});

module.exports = router;
