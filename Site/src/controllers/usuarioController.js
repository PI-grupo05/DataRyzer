var usuarioModel = require("../models/usuarioModel");

function exibirDiretoresRegionais(res){
    usuarioModel.exibirDiretoresRegionais()
       .then(
            function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`); 
                if (resultado.length > 0) {
                       res.json(resultado.map(diretor => ({
                            id_usuario: diretor.id_usuario,
                            diretor: diretor.diretor,
                            distribuidora: diretor.distribuidora,
                            unidade_consumidora: diretor.unidade_consumidora
                        })));
                } else {
                    res.status(403).send("Lista não encontrada");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar ao carregar os diretores! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function pegarDadosDiretor(req, res){
    var id_usuario = req.params.id_usuario
    usuarioModel.pegarDadosDiretor(id_usuario)
       .then(
            function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`);

                if (resultado.length == 1) {
                    console.log(resultado);
                    
                    res.json({
                        diretor: resultado[0].diretor,
                        email: resultado[0].email,
                        distribuidora: resultado[0].distribuidora,
                        telefone: resultado[0].telefone,
                    })
                } else {
                    res.status(403).send("Diretor não encontrado");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar ao pegar os dados do diretor! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function atualizarDadosDiretor(req, res){
    var id_usuario = req.params.id_usuario
    var nome = req.body.nome
    var email = req.body.email
    var telefone = req.body.telefone
    usuarioModel.atualizarDadosDiretor(id_usuario, nome, email, telefone)
       .then(
            function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`);

                res.status(200).send("Diretor atualizado com sucesso")
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar ao pegar os dados do diretor! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function deletarDadosDiretor(req,res){
    var id_usuario = req.params.id_usuario
    usuarioModel.deletarDadosDiretor(id_usuario)
       .then(
            function (resultado) {
                console.log(`\nResultados encontrados: ${resultado.length}`);
                console.log(`Resultados: ${JSON.stringify(resultado)}`);

                res.status(200).send("Diretor excluído com sucesso")

            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao realizar ao deletar os dados do diretor! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function autenticar(req, res)  {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                        
                        res.json({
                            id_usuario: resultadoAutenticar[0].id_usuario,
                            nome: resultadoAutenticar[0].nome,
                            tipo_usuario: resultadoAutenticar[0].tipo_usuario,
                            telefone: resultadoAutenticar[0].telefone,
                            email: resultadoAutenticar[0].email,
                            fk_cidade: resultadoAutenticar[0].fk_cidade
                        })
                        // id_usuario, nome, tipo_usuario, telefone, email, fk_cidade, fk_distribuidora
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}
function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var telefone = req.body.telefoneServer;
    var codigoAssociacao = req.body.codigoAssociacaoServer;
    var tipoUsuario = req.body.tipoUsuarioServer;

    // Faça as validações dos valores
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
        
    
        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        usuarioModel.cadastrar(nome, email, senha, telefone, codigoAssociacao, tipoUsuario)
            .then(function (resultado) {
                res.json(resultado);
            })
            .catch(function (erro) {
                console.log("\nHouve um erro ao realizar o cadastro!");
                console.log(erro);
    
                // Verifica se o erro foi causado por código inválido
                if (erro === "Código de associação inválido") {
                    res.status(400).json({ erro: "Código de associação inválido" });
                } else {
                    res.status(500).json({ erro: erro.sqlMessage || "Erro ao cadastrar" });
                }
            });
    }
}

module.exports = {
    autenticar,
    cadastrar,
    pegarDadosDiretor,
    exibirDiretoresRegionais,
    deletarDadosDiretor,
    atualizarDadosDiretor,
}