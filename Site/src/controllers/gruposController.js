var gruposModel = require("../models/gruposModel");

function criarGrupo(req, res) {
  var nome = req.body.nome;

  if (nome) {
    //...
  }
  gruposModel.criarGrupo(nome);
}

module.exports = {
  criarGrupo,
};
