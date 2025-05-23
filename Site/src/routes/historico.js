<<<<<<< HEAD
var express = require("express");
var router = express.Router();

var historicoController = require("../controllers/historicoController");

router.get("/buscarHistorico", function (req, res) {
    historicoController.buscarHistorico(req, res);
});

module.exports = router;
=======

>>>>>>> 63fa828af9f4e6d6bfc711790f2e4ec1284ed4be
