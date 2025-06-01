var notificacaoModel = require("../models/notificacaoModel");

function consultarParametrizacao(req, res) {
    var id_usuario = req.params.id_usuario
    notificacaoModel.consultarParametrizacao(id_usuario)
   .then(
        function (resultado) {
            console.log(`\nResultados encontrados: ${resultado.length}`);
            console.log(`Resultados: ${JSON.stringify(resultado)}`); 
            if (resultado.length == 1) {
                    res.json({
                        idUsuario: resultado[0].id_usuario,
                        credencial: resultado[0].credenciais,
                        acaoNotificar: resultado[0].acaoNotificar,
                        frequenciaNotificacao: resultado[0].frequencia
                    })
            } else {
                res.status(403).send("Lista não encontrada");
            }
        }
   )
   .cath(
    function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao realizar ao carregar as credenciais! Erro: ", erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        }
    );
}

function atualizarParametrizacao(req, res) {
    var id_usuario = req.params.idUsuario
    var credencial = req.body.credencial
    var acaoNotificar = req.body.acaoNotificar
    var frequenciaNotificacao = req.body.frequenciaNotificacao


    notificacaoModel.atualizarParametrizacao(id_usuario, credencial, acaoNotificar, frequenciaNotificacao)
        .then(
            function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`);

                res.status(200).send("Parametrização atualizado com sucesso")
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao atualizar a parametrização! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function criarParametrizacao(req, res) {
    var id_usuario = req.params.idUsuario
    var credencial = req.body.credencial
    var acaoNotificar = req.body.acaoNotificar
    var frequenciaNotificacao = req.body.frequenciaNotificacao

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }  else if(telefone == undefined){
        res.status(400).send("Seu telefone está undefined");
    }else if(codigoAssociacao == undefined){
        res.status(400).send("Seu codigo está undefined");
    }else if(tipoUsuario == undefined){
        res.status(400).send("Tipo de usuario undefined")
    }else{

    notificacaoModel.criarParametrizacao(id_usuario, credencial, acaoNotificar, frequenciaNotificacao)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("\nHouve um erro ao criar parametrização!");
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
           
        });
    }    
}

module.exports = {
    consultarParametrizacao,
    atualizarParametrizacao,
    criarParametrizacao
}

