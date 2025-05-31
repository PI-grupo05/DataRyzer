var unidadeModel = require("../models/unidadeModel");

function listarUnidades(req, res) {
  var idDistribuidora = req.params.idDistribuidora;

  if (!idDistribuidora) {
    console.error("idDistribuidora não enviado");
    return res.status(400).json({ error: "idDistribuidora não enviado" });
  }

  unidadeModel
    .listarUnidades(idDistribuidora)
    .then((unidades) => {
      res.json(unidades);
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).json({ error: "Erro ao listar unidades" });
    });
}

function associarUnidade(req, res) {
  var idUnidade = req.body.idUnidade;
  var idGrupo = req.body.idGrupo;

  if (!idUnidade || !idGrupo) {
    return res.status(400).json({ error: "idUnidade ou idGrupo não enviados" });
  }

  unidadeModel
    .associarUnidade(idUnidade, idGrupo)
    .then((resultado) => {
      if (resultado.affectedRows > 0) {
        res.json({ ok: true });
      } else {
        return res.status(404).json({ error: "Unidade não encontrada" });
      }
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).json({ error: "Erro ao associar unidade" });
    });
}

function dessasociarUnidade(req, res) {
  var idUnidade = req.params.idUnidade;

  if (!idUnidade) {
    return res.status(400).json({ error: "idUnidade não enviado" });
  }

  unidadeModel
    .dessasociarUnidade(idUnidade)
    .then((resultado) => {
      if (resultado.affectedRows > 0) {
        res.json({ ok: true });
      } else {
        return res.status(404).json({ error: "Unidade não encontrada" });
      }
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).json({ error: "Erro ao desassociar unidade" });
    });
}

module.exports = {
  listarUnidades,
  associarUnidade,
  dessasociarUnidade
};
