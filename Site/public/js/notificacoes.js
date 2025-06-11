function cancelarAlteracoes(){
     alternarEdicao()
     ultimaParametrizacao()
}



function ultimaParametrizacao() {

    var url = document.getElementById("url");
    var receberNotificacao = document.getElementById("receberNotificacao");
    var frequencia = document.getElementById("frequencia");
    var labels = document.querySelectorAll("label"); 

    document.getElementById("div_botoes").style.justifyContent = "flex-end";
    document.getElementById("botaoCancelar").style.display = "none"; 
    
    url.disabled = true;
    receberNotificacao.disabled = true;
    frequencia.disabled = true;
    url.style.color = "#888";
    labels.forEach(label => label.style.color = "#888");
    receberNotificacao.parentElement.style.opacity = "0.5";

    var fkDistribuidora = sessionStorage.FK_DISTRIBUIDORA
    
    fetch(`/notificacoes/ultimaParametrizacao/${fkDistribuidora}`,{
        method: 'GET',
        cache: 'no-store'
    }).then(function (response) {
        if(response.ok) {
            response.json().then(function (resposta) {
                console.log(`Consulta de ultima parametrização de notificação: ${JSON.stringify(resposta)}`)
                
                if (Object.keys(resposta).length == 0){
                    return
                }
                
                document.getElementById("url").value = resposta.url;
                document.getElementById("receberNotificacao").checked = resposta.receberNotificacao; 
                document.getElementById("frequencia").value = resposta.frequencia;
                document.getElementById("proxima_notificacao").textContent = "Próxima notificação: "
                if(resposta.proxima_notificacao != null){
                    document.getElementById("proxima_notificacao").textContent += resposta.proxima_notificacao;    
                }else {
                    document.getElementById("proxima_notificacao").textContent += "Não definida";
                }
            })
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados para consulta de ultima parametrização: ${error.message}`);

    })

}

function alternarEdicao() {
    var botao = document.getElementById("botaoEditar");
    var url = document.getElementById("url");
    var receberNotificacao = document.getElementById("receberNotificacao");
    var frequencia = document.getElementById("frequencia");
    var labels = document.querySelectorAll("label"); 

    if (botao.innerText == "EDITAR") {

        botao.innerText = "SALVAR";
        url.disabled = false;
        receberNotificacao.disabled = false;
        frequencia.disabled = false;
        botao.style.backgroundColor = "#28a745";
        document.getElementById("div_botoes").style.justifyContent = "space-between";
        document.getElementById("botaoCancelar").style.display = "block"; 
        url.style.color = "#000";
        labels.forEach(label => label.style.color = "#000");
        receberNotificacao.parentElement.style.opacity = "1";
        
    } else {
        botao.style.backgroundColor = "#007BFF";
        botao.innerText = "EDITAR";
        url.disabled = true;
        receberNotificacao.disabled = true;
        frequencia.disabled = true;

        url.style.color = "#888";
        labels.forEach(label => label.style.color = "#888");
        receberNotificacao.parentElement.style.opacity = "0.5";

    }
}

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM carregado!");
    ultimaParametrizacao();
});



function parametrizarNotificacoes() {
    if(document.getElementById("botaoEditar").innerText  == "EDITAR" ) {
        alternarEdicao();
        return;
    }
    var url = document.getElementById("url").value
    var receberNotificacao = document.getElementById("receberNotificacao").checked
    var frequencia = document.getElementById("frequencia").value
    var fkDistribuidora = sessionStorage.FK_DISTRIBUIDORA

    if(!validarVariaveis(url)){
        return;
    }

    fetch(`/notificacoes/consultarParametrizacao/${fkDistribuidora}`,{
        method: 'GET',
        cache: 'no-store'
    }).then(function (response) {
        if(response.ok) {
            response.json().then(function (resposta) {
                console.log(`Consulta de historico de parametrização de notificação: ${JSON.stringify(resposta)}`)
                Swal.fire({
                    title: "Salvar alterações?",
                    text: "Tem certeza que deseja salvar as alterações?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#28a745",  // Vermelho para ação perigosa
                    cancelButtonColor: "#6c757d",  // Azul padrão para cancelar
                    cancelButtonText: "Cancelar",
                    confirmButtonText: "Confirmar",
                    reverseButtons: true,
                    // Propriedades extras para melhor UX:
                    allowOutsideClick: false,  // Impede fechar clicando fora
                    allowEscapeKey: false,     // Impede fechar com ESC
                    focusCancel: true          // Foca no botão cancelar por segurança
                }).then((result) => {
                    if (result.isConfirmed) {
                         if(resposta.quantidadeResultados > 0) {
                
                            atualizarParametrizacao(fkDistribuidora, url, receberNotificacao, frequencia);
                        }else {
                            criarParametrizacao(fkDistribuidora, url, receberNotificacao, frequencia);
                        }
                    } else if (result.dismiss === Swal.DismissReason.cancel) {
                        // Opcional: feedback quando cancela
                        Swal.fire({
                            title: "Cancelado",
                            text: "Alterações descartadas",
                            icon: "info",
                            timer: 2000,
                            showConfirmButton: false
                        });
                    }
                });
           
            })
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados para consulta de parametrização: ${error.message}`);

    })

}



function atualizarParametrizacao(fkDistribuidora, url, receberNotificacao, frequencia) {
    
    fetch(`/notificacoes/atualizarParametrizacao/`,{
        method: 'PUT',
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fkDistribuidora: fkDistribuidora,
            url: url,
            receberNotificacao: receberNotificacao,
            frequencia: frequencia
        })

    }).then(function (resposta) {
            if (resposta.ok) {
                Swal.fire({
                title: "Sucesso!",
                text: "Parametrização atualizada",
                icon: "success",
                timer: 1000,  // 3 segundos
                showConfirmButton: false,
                color: "#1ed619",
                heightAuto: false,
                timerProgressBar: true,  // Mostra barra de progresso
                allowOutsideClick: false,  // Impede fechar clicando fora
                allowEscapeKey: false     // Impede fechar com ESC
            }).then(() => {
                console.log(`Parametrização atualizada`);
                ultimaParametrizacao()
                alternarEdicao()
            });
            } else {
                console.log("Houve um erro ao tentar atualizar os dados de parametrização");
                
                resposta.text().then((texto) => {
                    console.error(texto);
                });
            }
    })
    .catch(function (error) {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Houve um erro na atualização de parametrização",
        color: "#f01f1a",
        customClass: {
          confirmButton: "custom-button",
        },
      });
        console.error(`Erro na atualização de parametrização: ${error.message}`);
    })
}


function criarParametrizacao(fkDistribuidora, url, receberNotificacao, frequencia) {
    fetch(`/notificacoes/criarParametrizacao/`,{
        method: 'POST',
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fkDistribuidora: fkDistribuidora,
            url: url,
            receberNotificacao: receberNotificacao,
            frequencia: frequencia
        })

    }).then(function (resposta) {
            if (resposta.ok) {
                 Swal.fire({
                    title: "Sucesso!",
                    text: "Parametrização Criada",
                    icon: "success",
                    timer: 1000,  // 3 segundos
                    showConfirmButton: false,
                    color: "#1ed619",
                    heightAuto: false,
                    timerProgressBar: true,  // Mostra barra de progresso
                    allowOutsideClick: false,  // Impede fechar clicando fora
                    allowEscapeKey: false     // Impede fechar com ESC
                }).then(() => {
                    console.log(`Nova parametrização criada!`);
                    ultimaParametrizacao()
                    alternarEdicao()
                });
            } else {

                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Houve um erro na atualização de parametrização",
                    color: "#f01f1a",
                    customClass: {
                    confirmButton: "custom-button",
                    },
                });
                console.error(`Erro na criação de parametrização: ${error.message}`);
                
                
                resposta.text().then((texto) => {
                    console.error(texto);
                });
            }
    })
    .catch(function (error) {
        console.error(`Erro na criação de parametrização: ${error.message}`);
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Houve um erro na atualização de parametrização",
            color: "#f01f1a",
            customClass: {
            confirmButton: "custom-button",
            },
        });
        console.error(`Erro na criação de parametrização: ${error.message}`);
    })
}

function validarVariaveis(credenciais){
    if(credenciais == "") {
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Preencha as credenciais do slack",
        color: "#f01f1a",
        customClass: {
          confirmButton: "custom-button",
        },
      });
      return false;
    }
    return true;
}