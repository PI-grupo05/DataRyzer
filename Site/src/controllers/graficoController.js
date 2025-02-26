var graficoModel = require("../models/graficoModel.js");

function jogadoresPontos(req, res) {
    graficoModel.jogadoresPontos()
    .then(resultados => {
        res.json(resultados);
    })
    .catch(erro => {
        console.error('Erro ao buscar pontuações dos jogadores: ', erro);
        res.status(500).json({ erro: 'Erro ao buscar as pontuações dos jogadores.' });
    });
    
    
}


function dadosGraficos(req, res) {
    graficoModel.dadosGraficos()
    .then(function (resultadodadosGraficos) {
        if (resultadodadosGraficos.length > 0) {
            console.log("Dados coletados:", resultadodadosGraficos);
            res.status(200).json({
                Wolverine: resultadodadosGraficos[0].Wolverine,
                HomemDeFerro: resultadodadosGraficos[0].HomemDeFerro,
                HomemAranha: resultadodadosGraficos[0].HomemAranha,
                CapitaoAmerica: resultadodadosGraficos[0].CapitaoAmerica,
            });
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    })
    .catch(function (erro) {
        console.error("Erro ao coletar dados:", erro);
        res.status(500).send("Erro no servidor");
    });
}
function heroisMaisEscolhido(req, res) {
    graficoModel.heroisMaisEscolhido()
    .then(function (resultado) {
        if (resultado.length > 0) {
            console.log("Herois mais escolhido:", resultado);
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    })
    .catch(function (erro) {
        console.error("Erro ao coletar dados:", erro);
        res.status(500).send("Erro no servidor");
    });
}
function mediaPontos(req, res) {
    graficoModel.mediaPontos()
    .then(function (resultado) {
        if (resultado.length > 0) {
            console.log("média pontos", resultado);
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!");
        }
    })
    .catch(function (erro) {
        console.error("Erro ao coletar dados:", erro);
        res.status(500).send("Erro no servidor");
    });

    
}
function maiorPontuador(req, res) {
    graficoModel.maiorPontuador()
        .then(function (resultado) {
            if (resultado.length > 0) {
                console.log("Maior pontuador:", resultado[0]); // Apenas o primeiro resultado
                res.status(200).json(resultado[0]); // Retorna o maior pontuador como objeto
            } else {
                console.log("Nenhum resultado encontrado!");
                res.status(204).send("Nenhum resultado encontrado!"); // Código 204 sem conteúdo
            }
        })
        .catch(function (erro) {
            console.error("Erro ao coletar dados:", erro);
            res.status(500).send("Erro no servidor");
        });
}
module.exports = {
    dadosGraficos,
    heroisMaisEscolhido,
    jogadoresPontos,
    mediaPontos,
    maiorPontuador
};