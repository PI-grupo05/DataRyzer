var unidadeConsumidoraModel = require("../models/unidadeConsumidoraModel");

function exibirUnidadesConsumidoras(req, res){
        unidadeConsumidoraModel.exibirUnidadesConsumidoras(req.params.valorFiltro)
           .then(
            function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`);

                if (resultado.length > 0) {
                    console.log(resultado);
                    
                    res.json(resultado.map(unidadeConsumidora => ({
                            unidadeConsumidora: unidadeConsumidora.nome,
                        })));
                } else {
                    res.status(403).send("Unidades consumidoras não encontradas");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar ao pegar os dados das unidades consumidoras! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    exibirUnidadesConsumidoras
}