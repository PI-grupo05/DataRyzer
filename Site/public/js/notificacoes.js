function parametrizarNotificacoes() {
    
    var credenciais = document.getElementById("credenciais").value
    var acaoNotificar = document.getElementById("acao_notificar").value
    var frequencia = document.getElementById("frequencia_notificacao").value
    var idUsuario = sessionStorage.ID_USUARIO

    if(!validarVariaveis(idUsuario, credenciais, acaoNotificar, frequencia)){
        return;
    }

    

    fetch(`/notificacoes/consultarParametrizacao/${idUsuario}`,{
        method: 'GET',
        cache: 'no-store'
    }).then(function (response) {
        if(response.ok) {
            response.json().then(function (resposta) {
                console.log(`Consulta de historico de parametrização de notificação: ${JSON.stringify(resposta)}`)
            if(resposta.length > 0) {
                atualizarParametrizacao(idUsuario, credenciais, acaoNotificar, frequencia);
            }else {
                criarParametrizacao(idUsuario, credenciais, acaoNotificar, frequencia);
            }
            })
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados para consulta de parametrização: ${error.message}`);

    })

}



function atualizarParametrizacao(idUsuario, credenciais, acaoNotificar, frequencia) {
    fetch(`/notificacoes/atualizarParametrizacao/`,{
        method: 'PUT',
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuario: idUsuario,
            credencial: credenciais,
            acaoNotificar: acaoNotificar,
            frequenciaNotificacao: frequencia
        })

    }).then(function (resposta) {
            if (resposta.ok) {
                Swal.fire({
                    title: "Sucesso!",
                    text: "Parametrização atualizada!",
                    icon: "success",
                    showConfirmButton: false,
                    color: "#1ed619",
                    heightAuto: false,
                });
                console.log(`Parametrização atualizada`);
            } else {
                console.log("Houve um erro ao tentar atualizar os dados de parametrização");
                
                resposta.text().then((texto) => {
                    console.error(texto);
                });
            }
    })
    .catch(function (error) {
        console.error(`Erro na atualização de parametrização: ${error.message}`);

    })
}


function criarParametrizacao(idUsuario, credenciais, acaoNotificar, frequencia) {
    fetch(`/notificacoes/criarParametrizacao/`,{
        method: 'POST',
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idUsuario: idUsuario,
            credencial: credenciais,
            acaoNotificar: acaoNotificar,
            frequenciaNotificacao: frequencia
        })

    }).then(function (resposta) {
            if (resposta.ok) {
                Swal.fire({
                    title: "Sucesso!",
                    text: "Parametrização Criada!",
                    icon: "success",
                    showConfirmButton: false,
                    color: "#1ed619",
                    heightAuto: false,
                });
                console.log(`Parametrização Criada`);
            } else {
                console.log("Houve um erro ao tentar criar os dados de parametrização");
                
                resposta.text().then((texto) => {
                    console.error(texto);
                });
            }
    })
    .catch(function (error) {
        console.error(`Erro na criação de parametrização: ${error.message}`);

    })
}