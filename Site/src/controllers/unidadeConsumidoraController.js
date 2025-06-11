var unidadeConsumidoraModel = require("../models/unidadeConsumidoraModel");

function exibirUnidadesConsumidoras(req, res){
        var valorFiltro = req.params.valorFiltro
        var fk_distribuidora = req.params.fk_distribuidora
        unidadeConsumidoraModel.exibirUnidadesConsumidoras(fk_distribuidora, valorFiltro)
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