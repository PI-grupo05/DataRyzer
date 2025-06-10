var filtroModel = require("../models/filtroModel");

// controllers/filtroController.js
function obterDetalhesFiltro(req, res) {
    var idFiltro = req.params.idFiltro;

    filtroModel.obterDetalhes(idFiltro)
        .then(resultado => {
            if (!resultado || resultado.length === 0) {
                return res.status(404).json({ error: "Filtro não encontrado" });
            }

            console.log("Dados retornados pelo banco:", resultado[0]); // Log para depuração
            res.json(resultado[0]); // Enviar resposta JSON corretamente
        })
        .catch(erro => {
            console.error("Erro ao obter detalhes do filtro:", erro);
            res.status(500).json({ error: "Erro ao buscar detalhes do filtro" });
        });
}




//===========================================================

function listarDatasInicio(req, res) {
  filtroModel
    .listarDatasInicio()
    .then((resultados) => {
      res.json(resultados.map(row => row.data));
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).json({ error: "Erro ao listar datas de início" });
    });
}

function listarDatasFim(req, res) {
  filtroModel
    .listarDatasFim()
    .then((resultados) => {
      res.json(resultados.map(row => row.data));
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).json({ error: "Erro ao listar datas de fim" });
    });
}




function salvarFiltro(req, res) {
  var { nome, data_inicio, data_fim , fk_usuario} = req.body;
  //var fk_usuario = 2; // fixo, pode pegar do token/autenticação depois

  if (!nome || !data_inicio || !data_fim|| !fk_usuario) {
    return res.status(400).json({ error: "Dados incompletos!" });
  }

  filtroModel
    .salvarFiltro(nome, data_inicio, data_fim, fk_usuario)
    .then(() => {
      res.status(201).json({ message: "Filtro salvo com sucesso!" });
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).json({ error: "Erro ao salvar filtro" });
    });
}


function listarFiltros(req, res) {
    var idUsuario = req.params.idUsuario;

    filtroModel.listarFiltros(idUsuario)
        .then(resultados => {
            console.log("Dados retornados:", resultados);
            res.json(resultados); // Certifique-se de que está enviando JSON
        })
        .catch(erro => {
            console.error("Erro ao listar filtros:", erro);
            res.status(500).json({ error: "Erro interno do servidor" });
        });
}



function deletarFiltro(req, res) {
    var id = req.params.id;
    console.log("Tentativa de deletar filtro com ID:", id); // Debug

    filtroModel.deletarFiltro(id)
        .then((resultado) => {
            if (resultado.affectedRows === 0) {
                return res.status(404).json({ error: `Filtro com ID ${id} não encontrado.` });
            }
            res.json({ message: `Filtro com ID ${id} deletado com sucesso!` });
        })
        .catch((erro) => {
            console.error("Erro ao deletar filtro:", erro.message || erro);
            res.status(500).json({ error: "Erro interno ao deletar filtro" });
        });
}




function atualizarFiltro(req, res) {
  var id = req.params.id;
  var { nome, data_inicio, data_fim } = req.body;

  if (!nome || !data_inicio || !data_fim) {
    return res.status(400).json({ error: "Dados incompletos!" });
  }

  filtroModel
    .atualizarFiltro(id, nome, data_inicio, data_fim)
    .then((resultado) => {
      if (resultado.affectedRows === 0) {
        return res.status(404).json({ error: "Filtro não encontrado" });
      }
      res.json({ message: "Filtro atualizado com sucesso!" });
    })
    .catch((erro) => {
      console.error(erro);
      res.status(500).json({ error: "Erro ao atualizar filtro" });
    });
}

module.exports = {
  listarDatasInicio,
  listarDatasFim,
  salvarFiltro,
  listarFiltros,
  deletarFiltro,
  atualizarFiltro,
  obterDetalhesFiltro, // <- adicionado recete
};
