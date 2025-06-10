var kpiDashEspecificaModel = require("../models/kpiDashEspecificaModel");

// function obterDuracaoMedia(req, res) {
//     var fk_unidade_consumidora = req.params.fk_unidade_consumidora;
//     var fk_distribuidora = req.params.fk_distribuidora;

//     kpiDashEspecificaModel.duracaoMedia(fk_unidade_consumidora, fk_distribuidora)
//         .then(resultado => res.json(resultado))
//         .catch(erro => {
//             console.log(erro);
//             res.status(500).json(erro.sqlMessage);
//         });
// }

// function obterDuracaoMedia(req, res) {
//     var { fk_unidade_consumidora, fk_distribuidora } = req.params;
//     var { data_inicio, data_fim } = req.query; // Captura os parâmetros da URL
    
//     kpiDashEspecificaModel.duracaoMedia(fk_unidade_consumidora, fk_distribuidora, data_inicio, data_fim)
//         .then(resultado => res.json(resultado))
//         .catch(erro => {
//             console.log(erro);
//             res.status(500).json(erro.sqlMessage);
//         });
// }

function formatarDataISO(dataISO) {
    if (!dataISO || typeof dataISO !== "string") {
        console.error("Erro: Data inválida recebida", dataISO);
        return null; // Retorna null em vez de "Data inválida"
    }

    const date = new Date(dataISO);
    
    if (isNaN(date.getTime())) { // Se a data for inválida, retorna null
        console.error("Erro ao converter data:", dataISO);
        return null;
    }

    return date.toISOString().split("T")[0]; // Retorna "YYYY-MM-DD"
}

function obterDuracaoMedia(req, res) {
    var { fk_unidade_consumidora, fk_distribuidora } = req.params;
    var { data_inicio, data_fim } = req.query; // Captura os parâmetros da URL

    console.log("Parâmetros recebidos:", { fk_unidade_consumidora, fk_distribuidora, data_inicio, data_fim });

    if (!data_inicio || !data_fim) {
        return res.status(400).json({ error: "Datas inválidas fornecidas" });
    }

    kpiDashEspecificaModel.duracaoMedia(fk_unidade_consumidora, fk_distribuidora, data_inicio, data_fim)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("Erro ao buscar duração média:", erro);
            res.status(500).json({ error: "Erro ao buscar dados no banco" });
        });
}



// function obterDuracaoMedia(req, res) {
//     var { fk_unidade_consumidora, fk_distribuidora } = req.params;
//     var { data_inicio, data_fim } = req.query; // Captura os parâmetros da URL

//     // Converte as datas para o formato apenas de data (YYYY-MM-DD)
//     const formatarData = (data) => {
//         const d = new Date(data);
//         return d.toISOString().split('T')[0]; // Extrai apenas a data no formato YYYY-MM-DD
//     };

//     const dataInicioFormatada = formatarData(data_inicio);
//     const dataFimFormatada = formatarData(data_fim);

//     kpiDashEspecificaModel
//         .duracaoMedia(fk_unidade_consumidora, fk_distribuidora, dataInicioFormatada, dataFimFormatada)
//         .then(resultado => res.json(resultado))
//         .catch(erro => {
//             console.log(erro);
//             res.status(500).json(erro.sqlMessage);
//         });
// }



function obterMaiorIndiceQuedas(req, res) {
    var { fk_unidade_consumidora, fk_distribuidora } = req.params;
    var { data_inicio, data_fim } = req.query; // Captura os parâmetros da URL

    console.log("Parâmetros recebidos:", { fk_unidade_consumidora, fk_distribuidora, data_inicio, data_fim });

    if (!data_inicio || !data_fim) {
        return res.status(400).json({ error: "Datas inválidas fornecidas" });
    }

    kpiDashEspecificaModel.maiorIndiceQuedas(fk_unidade_consumidora, fk_distribuidora, data_inicio, data_fim)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("Erro ao buscar duração média:", erro);
            res.status(500).json({ error: "Erro ao buscar dados no banco" });
        });
}

function obterMediaPorDia(req, res) {
     var { fk_unidade_consumidora, fk_distribuidora } = req.params;
    var { data_inicio, data_fim } = req.query; // Captura os parâmetros da URL

    console.log("Parâmetros recebidos:", { fk_unidade_consumidora, fk_distribuidora, data_inicio, data_fim });

    if (!data_inicio || !data_fim) {
        return res.status(400).json({ error: "Datas inválidas fornecidas" });
    }

    kpiDashEspecificaModel.mediaPorDia(fk_unidade_consumidora, fk_distribuidora, data_inicio, data_fim)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("Erro ao buscar duração média:", erro);
            res.status(500).json({ error: "Erro ao buscar dados no banco" });
        });
}

// function obterDadosGraficoLinha(req, res) {
//     var fk_unidade_consumidora = req.params.fk_unidade_consumidora;
//     var fk_distribuidora = req.params.fk_distribuidora;

//     kpiDashEspecificaModel.dadosGraficoLinha(fk_unidade_consumidora, fk_distribuidora)
//         .then(resultado => res.json(resultado))
//         .catch(erro => {
//             console.log(erro);
//             res.status(500).json(erro.sqlMessage);
//         });
// }
function obterDadosGraficoLinha(req, res) {
    var { fk_unidade_consumidora, fk_distribuidora } = req.params;
    var { data_inicio, data_fim } = req.query; // Captura os parâmetros da URL

    console.log("Parâmetros recebidos para gráfico de linha:", { fk_unidade_consumidora, fk_distribuidora, data_inicio, data_fim });

    if (!data_inicio || !data_fim) {
        return res.status(400).json({ error: "Datas inválidas fornecidas" });
    }

    kpiDashEspecificaModel.dadosGraficoLinha(fk_unidade_consumidora, fk_distribuidora, data_inicio, data_fim)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("Erro ao buscar dados para gráfico de linha:", erro);
            res.status(500).json({ error: "Erro ao buscar dados no banco" });
        });
}


// function obterDadosGraficoBarra(req, res) {
//     var fk_unidade_consumidora = req.params.fk_unidade_consumidora;
//     var fk_distribuidora = req.params.fk_distribuidora;

//     kpiDashEspecificaModel.dadosGraficoBarra(fk_unidade_consumidora, fk_distribuidora)
//         .then(resultado => res.json(resultado))
//         .catch(erro => {
//             console.log(erro);
//             res.status(500).json(erro.sqlMessage);
//         });
// }

function obterDadosGraficoBarra(req, res) {
    var { fk_unidade_consumidora, fk_distribuidora } = req.params;
    var { data_inicio, data_fim } = req.query; // Captura os parâmetros da URL

    console.log("Parâmetros recebidos para gráfico de barra:", { fk_unidade_consumidora, fk_distribuidora, data_inicio, data_fim });

    if (!data_inicio || !data_fim) {
        return res.status(400).json({ error: "Datas inválidas fornecidas" });
    }

    kpiDashEspecificaModel.dadosGraficoBarra(fk_unidade_consumidora, fk_distribuidora, data_inicio, data_fim)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.error("Erro ao buscar dados para gráfico de barra:", erro);
            res.status(500).json({ error: "Erro ao buscar dados no banco" });
        });
}



module.exports = {
    obterDadosGraficoLinha,
    obterDadosGraficoBarra,
    obterDuracaoMedia,
    obterMaiorIndiceQuedas,
    obterMediaPorDia
};
