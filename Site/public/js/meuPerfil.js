
  function aplicarMascaraTelefone(numero) {
  return numero.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
  }


function cancelarAlteracoes(){
    Swal.fire({
        title: "Descartar Alterações",
        text: "Tem certeza que deseja descartar alterações?",
        icon: "warning",
        showCancelButton: true,
        
        confirmButtonColor: "#4CAF50",
        cancelButtonColor: "#545454",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
        reverseButtons: true 
        
    }).then((result) => {
        if (result.isConfirmed) {
            // Usuário confirmou - executar a atualização
            window.location.href='./meuPerfilExcluir.html'
        }
    });

}

function validarExclusao(){
    Swal.fire({
        title: "Excluir Usuário",
        text: "Tem certeza que deseja excluir seu usuário? Esta ação não pode ser desfeita!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",  // Vermelho para ação perigosa
        cancelButtonColor: "#3085d6",  // Azul padrão para cancelar
        cancelButtonText: "Cancelar",
        confirmButtonText: "Sim, excluir!",
        reverseButtons: true,
        // Propriedades extras para melhor UX:
        allowOutsideClick: false,  // Impede fechar clicando fora
        allowEscapeKey: false,     // Impede fechar com ESC
        focusCancel: true          // Foca no botão cancelar por segurança
    }).then((result) => {
        if (result.isConfirmed) {
            // Usuário confirmou - executar a exclusão
            deletarDiretor();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            // Opcional: feedback quando cancela
            Swal.fire({
                title: "Cancelado",
                text: "Seu usuário não foi excluído.",
                icon: "info",
                timer: 2000,
                showConfirmButton: false
            });
        }
    });
}
 function deletarDiretor(){
        fetch(`/usuarios/deletarDadosDiretor/${sessionStorage.ID_USUARIO}`, {
            method: "DELETE",
        })
        .then(function (resposta) {
            console.log("ESTOU NO THEN DO deletarDiretor()!");
            console.log(resposta)
            if (resposta.ok) {
                console.log(`Diretor de id = ${sessionStorage.ID_USUARIO} 
                deletado com sucesso`);
                Swal.fire({
                    title: "Sucesso!",
                    text: "Usuário excluido! Redirecionando",
                    icon: "success",
                    timer: 3000,  // 3 segundos
                    showConfirmButton: false,
                    color: "#1ed619",
                    heightAuto: false,
                    timerProgressBar: true,  // Mostra barra de progresso
                    allowOutsideClick: false,  // Impede fechar clicando fora
                    allowEscapeKey: false     // Impede fechar com ESC
                }).then(() => {
                    // Executa após o timer ou quando fechar
                    sair();
                });
                
            } else {
                console.log("Houve um erro ao tentar deletar os dados do diretor!");
                
                resposta.text().then((texto) => {
                    console.error(texto);
                });
            }
        })
        .catch(function (erro) {
            console.log(erro);
        });
    }

    
   function alterarDados() {
    var nome = document.getElementById("id_nome").value.trim();
    var email = document.getElementById("id_email").value.trim();
    var telefone = document.getElementById("id_telefone").value.trim();
    
    // Validações usando SweetAlert2
    if (nome === "" || email === "" || telefone === "") {
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "Todos os campos devem ser preenchidos",
            confirmButtonText: "OK"
        });
        return false;
    } else if (nome.length > 20) {
        Swal.fire({
            icon: "warning",
            title: "Oops...",
            text: "O nome não pode ultrapassar 20 caracteres!",
            confirmButtonText: "OK"
        });
        return false;
    } else if (telefone.length < 10 || telefone.length > 15) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "O telefone deve ter entre 10 e 15 dígitos",
            confirmButtonText: "OK"
        });
        return false;
    } else if (!email.includes("@") || !email.includes(".com")) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "O email deve conter '@' e '.com'",
            confirmButtonText: "OK"
        });
        return false;
    }
    
    // Confirmação usando SweetAlert2
    Swal.fire({
        title: "Confirmar Alterações",
        text: "Tem certeza que deseja atualizar os dados de usuário?",
        icon: "warning",
        showCancelButton: true,
        
        confirmButtonColor: "#4CAF50",
        cancelButtonColor: "#545454",
        cancelButtonText: "Cancelar",
        confirmButtonText: "Confirmar",
        reverseButtons: true 
        
    }).then((result) => {
        if (result.isConfirmed) {
            // Usuário confirmou - executar a atualização
            atualizarDiretor();
        }
    });
    
    console.log("Dados validados:", nome, email, telefone);
}




    function atualizarDiretor(){
        fetch(`/usuarios/atualizarDadosDiretor/${sessionStorage.ID_USUARIO}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
                nome: document.getElementById("id_nome").value ,
                email: document.getElementById("id_email").value ,
                telefone: document.getElementById("id_telefone").value ,
            }),
        })
        .then(function (resposta) {
            console.log("ESTOU NO THEN DO deletarDiretor()!");
            console.log(resposta)
            if (resposta.ok) {
                Swal.fire({
                    title: "Sucesso!",
                    text: "Usuário atualizado! Redirecionando",
                    icon: "success",
                    timer: 3000,  // 3 segundos
                    showConfirmButton: false,
                    color: "#1ed619",
                    heightAuto: false,
                    timerProgressBar: true,  // Mostra barra de progresso
                    allowOutsideClick: false,  // Impede fechar clicando fora
                    allowEscapeKey: false     // Impede fechar com ESC
                }).then(() => {
                    // Executa após o timer ou quando fechar
                    window.location.href = "meuPerfilExcluir.html";
                });
                
                console.log(`Diretor de id = ${sessionStorage.ID_USUARIO} atualizado com sucesso`);

            } else {
                console.log("Houve um erro ao tentar atualizar os dados do diretor!");
                
                resposta.text().then((texto) => {
                    console.error(texto);
                });
            }
        })
        .catch(function (erro) {
            console.log(erro);
        });
    }


    function pegarDadosDiretor(){
        fetch(`/usuarios/pegarDadosDiretor/${sessionStorage.ID_USUARIO}`, {
            method: "GET",
        })
        .then(function (resposta) {
            console.log("ESTOU NO THEN DO pegarDadosDiretor()!");
            console.log(resposta)
            if (resposta.ok) {

            resposta.json().then((json) => {
                console.log(json);
                console.log(JSON.stringify(json));
                document.getElementById("id_nome").value = json.diretor;
                document.getElementById("id_email").value = json.email;
                document.getElementById("id_telefone").value  = aplicarMascaraTelefone(json.telefone);
            });
            } else {
                console.log("Houve um erro ao tentar pegar os dados do diretor!");
                
                resposta.text().then((texto) => {
                    console.error(texto);
                });
            }
        })
        .catch(function (erro) {
            console.log(erro);
        });
    }

    window.addEventListener('load', pegarDadosDiretor);
    





