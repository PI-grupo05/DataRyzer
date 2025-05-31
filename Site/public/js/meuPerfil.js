
  function aplicarMascaraTelefone(numero) {
  return numero.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
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
                sair()
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

        if (nome === "" || email === "" || telefone === "") {
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: `Todos os campos devem ser preenchidos`,
            });
            return false;
        } else if (nome.length > 20) {
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "O nome não pode ultrapassar 20 caracteres!",
            });
            return false;
        } else if (telefone.length < 10 || telefone.length > 15) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "O telefone deve ter entre 10 e 15 dígitos",
                color: "#f01f1a",
                customClass: {
                    confirmButton: "custom-button",
                },
            });
            return false;
        } else if (!email.includes("@") || !email.includes(".com")) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "O email deve conter '@' e '.com'",
                color: "#f01f1a",
                customClass: {
                    confirmButton: "custom-button", 
                },
            });
            return false;
        }

        atualizarDiretor();

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
                    text: "Usuário atualizado!",
                    icon: "success",
                    showConfirmButton: false,
                    color: "#1ed619",
                    heightAuto: false,
                });
                console.log(`Diretor de id = ${sessionStorage.ID_USUARIO} 
                atualizado com sucesso`);
                window.location.href = "meuPerfilExcluir.html"
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
    





