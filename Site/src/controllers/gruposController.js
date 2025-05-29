var gruposModel = require("../models/gruposModel");

function criarGrupo(req, res) {
  var nome = req.body.nome;
  var idUsuario = req.body.idUsuario;

  if (!nome || !idUsuario) {
    return res.status(400).json({ error: "Nome ou idUsuario não enviados" });
  }

  gruposModel
    .contarGruposUsuario(idUsuario)
    .then((resposta) => {
      const qtd = resposta[0].total;
      if (qtd >= 3) {
        return res.status(400).json({ error: "Limite de grupos atingido (3)" });
      }
      // Criar o grupo
      return gruposModel.criarGrupo(nome, idUsuario).then((resultado) => {
        console.log("sdsdxs", resultado);
        res.json({ ok: true, idGrupo: resultado.insertId });
      });
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).json({ error: "Erro ao contar ou criar grupo" });
    });
}

function listarPorUsuario(req, res) {
  var idUsuario = req.params.idUsuario;

  if (!idUsuario) {
    return res.status(400).json({ error: "idUsuario não enviado" });
  }
  gruposModel
    .listarPorUsuario(idUsuario)
    .then((grupos) => {
      res.json(grupos);
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).json({ error: "Erro ao listar grupos" });
    });
}

function editarGrupo(req, res) {
  var nome = req.body.nome;
  var idGrupo = req.params.idGrupo;

  if (!nome || !idGrupo) {
    return res.status(400).json({ error: "Nome ou idGrupo não enviados" });
  }

  gruposModel
    .editarNomeGrupo(nome, idGrupo)
    .then((resultado) => {
      console.log("sdsdxs", resultado);
      if (resultado.affectedRows > 0) {
        res.json({ ok: true, idGrupo: idGrupo });
      } else {
        return res.status(404).json({ error: "Grupo não encontrado" });
      }
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).json({ error: "Erro ao editar grupo" });
    });
}

function deletarGrupo(req, res) {
  var idGrupo = req.params.idGrupo;

  if (!idGrupo) {
    return res.status(400).json({ error: "idGrupo não enviados" });
  }

  gruposModel
    .dessasociarUnidadesGrupo(idGrupo)
    .then(() => {
      gruposModel
        .deletarGrupo(idGrupo)
        .then(() => {
          res.json({ ok: true });
        })
        .catch((erro) => {
          console.error(erro);
          res.status(500).json({ error: "Erro ao deletar grupo" });
        });
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).json({ error: "Erro ao deletar grupo" });
    });
}

function carregarUnidadesDisponiveis(idUsuario){
  

}

module.exports = {
  criarGrupo,
  listarPorUsuario,
  editarGrupo,
  deletarGrupo,
};
