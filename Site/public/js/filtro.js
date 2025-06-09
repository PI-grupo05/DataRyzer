const filtrosDetalhes = {}; // Objeto para armazenar os detalhes dos filtros

function listarNomesParaSelect() {
    const idUsuario = sessionStorage.getItem("ID_USUARIO");

    fetch(`/filtros/listar/${idUsuario}`)
        .then((res) => res.json())
        .then((filtros) => {
            const select = document.getElementById("filtros_select");
            select.innerHTML = `<option value="" disabled selected>Selecione um filtro</option>`;

            filtros.forEach((filtro) => {
                // Armazena os detalhes no objeto
                filtrosDetalhes[filtro.id_filtro] = {
                    nome: filtro.nome,
                    data_inicio: filtro.data_inicio,
                    data_fim: filtro.data_fim,
                };

                // Adiciona a opção ao select
                const option = document.createElement("option");
                option.value = filtro.id_filtro;
                option.textContent = filtro.nome;
                select.appendChild(option);
            });

            // Listener para capturar a seleção
            select.addEventListener("change", () => {
                const filtroId = select.value;
                const detalhes = filtrosDetalhes[filtroId];
                if (detalhes) {
                    console.log(`Filtro selecionado:`, detalhes);
                    usarDatas(detalhes.data_inicio, detalhes.data_fim);
                }
            });
        })
        .catch((error) => {
            console.error("Erro ao listar nomes dos filtros:", error);
            alert("Erro ao carregar os nomes dos filtros!");
        });
}

function usarDatas(dataInicio, dataFim) {
    // Faça o que precisar com as datas
    console.log(`Data início: ${dataInicio}, Data fim: ${dataFim}`);
}

// function listarNomesParaSelect() {
//     const idUsuario = sessionStorage.getItem("ID_USUARIO");

//     fetch(`/filtros/listar/${idUsuario}`)
//         .then((res) => res.json())
//         .then((filtros) => {
//             const select = document.getElementById("filtros_select");
//             select.innerHTML = `<option value="">Selecione um filtro</option>`; 

//             filtros.forEach((filtro) => {
//                 const option = document.createElement("option");
//                 option.value = filtro.id_filtro; 
//                 option.textContent = filtro.nome; 
//                 select.appendChild(option);
//             });
//         })
//         .catch((error) => {
//             console.error("Erro ao listar nomes dos filtros:", error);
//             alert("Erro ao carregar os nomes dos filtros!");
//         });
// }



function listarFiltros() {
    const idUsuario = sessionStorage.getItem("ID_USUARIO");

    fetch(`/filtros/listar/${idUsuario}`)
        .then((res) => res.json())
        .then((filtros) => {
            const lista = document.getElementById("lista_filtros");
            lista.innerHTML = "";

            filtros.forEach((filtro) => {
                const row = document.createElement("tr");

           
                const nomeCell = document.createElement("td");
                nomeCell.textContent = filtro.nome;

                const inicioCell = document.createElement("td");
                inicioCell.textContent = filtro.data_inicio;

                const fimCell = document.createElement("td");
                fimCell.textContent = filtro.data_fim;

                const actionsCell = document.createElement("td");

           
                const editarBtn = document.createElement("button");
                editarBtn.textContent = "Editar";
                editarBtn.onclick = () => preencherFormularioParaEdicao(filtro);

                const deletarBtn = document.createElement("button");
                deletarBtn.textContent = "Deletar";
                deletarBtn.setAttribute("data-id", filtro.id_filtro);
                deletarBtn.onclick = () => excluirFiltro(deletarBtn);

              
                actionsCell.appendChild(editarBtn);
                actionsCell.appendChild(deletarBtn);

                
                row.appendChild(nomeCell);
                row.appendChild(inicioCell);
                row.appendChild(fimCell);
                row.appendChild(actionsCell);

               
                lista.appendChild(row);
            });
        })
        .catch((error) => {
            console.error("Erro ao listar filtros:", error);
            alert("Erro ao carregar filtros existentes!");
        });
}


function salvarFiltro() {
    const nomeFiltro = document.getElementById("nome_filtro").value;
    const dataInicio = document.getElementById("calendario").value;
    const dataFim = document.getElementById("calendario_fim").value;
    const idUsuarioS = sessionStorage.getItem("ID_USUARIO");


    console.log("Nome do Filtro:", nomeFiltro);
    console.log("Data Início:", dataInicio);
    console.log("Data Fim:", dataFim);
    console.log("ID Usuário:", idUsuarioS);

    if (!nomeFiltro || !dataInicio || !dataFim || !idUsuarioS) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const filtroData = {
        nome: nomeFiltro,
        data_inicio: dataInicio,
        data_fim: dataFim,
        fk_usuario: idUsuarioS,
    };

    console.log("Dados enviados ao backend:", filtroData);

    fetch(`/filtros/criar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filtroData),
    })
        .then((resposta) => {
            console.log("Resposta do servidor:", resposta);
            if (resposta.ok) {
                listarFiltros();
                console.log("Filtro criado com sucesso!");
                alert("Filtro criado com sucesso!");
                limparCoisas();
                bloaquearDatafim();
                 
        listarNomesParaSelect();
               
            } else {
                return resposta.text().then((texto) => {
                    console.error("Erro no backend:", texto);
                    alert("Erro ao salvar o filtro.");
                });
            }
        })
        .catch((error) => {
            console.error("Erro na comunicação com o servidor:", error);
            alert("Erro ao salvar filtro!");
        });
}


function preencherFormularioParaEdicao(filtro) {
    
    const formatarData = (data) => {
        const date = new Date(data);
        if (isNaN(date)) return ""; 
        return date.toISOString().split("T")[0]; 
    };

    document.getElementById("nome_filtro").value = filtro.nome;
    document.getElementById("calendario").value = formatarData(filtro.data_inicio);
    document.getElementById("calendario_fim").value = formatarData(filtro.data_fim);

    idFiltroAtual = filtro.id_filtro; 
    document.getElementById("salvar_filtro").style.display = "none";
    document.getElementById("atualizar_filtro").style.display = "block";

    const calendarioFim = document.getElementById("calendario_fim");
calendarioFim.disabled = false;

document.getElementById("calendario").addEventListener("change", function () {
    calendarioFim.disabled = !this.value;
});
}

function atualizarFiltro() {
    const nomeFiltro = document.getElementById("nome_filtro").value;
    const dataInicio = document.getElementById("calendario").value;
    const dataFim = document.getElementById("calendario_fim").value;

    if (!nomeFiltro || !dataInicio || !dataFim) {
        alert("Preencha todos os campos!");
        return;
    }

    const filtro = { nome: nomeFiltro, data_inicio: dataInicio, data_fim: dataFim };

    fetch(`filtros/editar/${idFiltroAtual}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(filtro),
    })
        .then((res) => {
            if (!res.ok) throw new Error("Erro ao atualizar o filtro!");
            return res.json();
        })
        .then(() => {
            alert("Filtro atualizado com sucesso!");
            listarFiltros();
            limparCoisas();
        listarNomesParaSelect();
            bloaquearDatafim();
        })
        .catch((error) => {
            console.error("Erro ao atualizar filtro:", error);
            alert("Erro ao atualizar o filtro!");
        });
}


async function excluirFiltro(botao) {
    const listaFiltros = document.getElementById("lista_filtros");
    const idFiltro = botao.getAttribute("data-id");

    if (!idFiltro) {
        console.error("Erro: ID do filtro inválido!");
        alert("Erro: O filtro não possui um ID válido.");
        return;
    }

    if (!confirm("Tem certeza que deseja excluir este filtro? Essa ação não pode ser desfeita!")) return;

    try {
        const resposta = await fetch(`filtros/deletar/${idFiltro}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (resposta.ok) {
            botao.parentElement.remove(); 
            console.log("Filtro deletado com sucesso!");
            alert("Filtro deletado com sucesso!");
             listarFiltros();
     listarNomesParaSelect();
     limparCoisas();
   
     
    
        } else {
            console.error("Erro ao deletar filtro!");
            alert("Erro ao deletar filtro.");
             listarFiltros();
     listarNomesParaSelect();
     
        }
    } catch (error) {
        console.error("Erro ao tentar excluir o filtro:", error);
        alert("Erro ao excluir o filtro!");
    }
}

document.addEventListener("DOMContentLoaded", () => {
    

    listarFiltros();
     listarNomesParaSelect();
      
    document.getElementById("salvar_filtro").addEventListener("click", salvarFiltro);
    document.getElementById("atualizar_filtro").addEventListener("click", atualizarFiltro);
});


function limparCoisas() {
 
    const nomeFiltro = document.getElementById("nome_filtro");
    const calendarioInicio = document.getElementById("calendario");
    const calendarioFim = document.getElementById("calendario_fim");
    const salvarFiltro = document.getElementById("salvar_filtro");
    const atualizarFiltro = document.getElementById("atualizar_filtro");


    nomeFiltro.value = "";
    calendarioInicio.value = "";
    calendarioFim.value = "";


    calendarioFim.min = "";
    calendarioFim.disabled = false;

  
    salvarFiltro.style.display = "block";
    atualizarFiltro.style.display = "none";

    
    console.log("Formulário limpo com sucesso!");
}



function bloaquearDatafim(){
    const calendarioFim = document.getElementById("calendario_fim");
calendarioFim.disabled = true;

document.getElementById("calendario").addEventListener("change", function () {
    calendarioFim.disabled = !this.value;
});



}




     
document.getElementById("calendario").addEventListener("change", function () {
    const dataInicio = this.value; 
    const calendarioFim = document.getElementById("calendario_fim");

    if (dataInicio) {
       
        calendarioFim.min = dataInicio;

     
        if (calendarioFim.value && calendarioFim.value < dataInicio) {
            calendarioFim.value = dataInicio;
        }
    } else {
     
        calendarioFim.min = "";
    }
});
const calendarioFim = document.getElementById("calendario_fim");
calendarioFim.disabled = true;

document.getElementById("calendario").addEventListener("change", function () {
    calendarioFim.disabled = !this.value;
});




//=====================================================================

       // Controle do modal
    const modal = document.getElementById("modal");
    const abrirModalBtn = document.getElementById("abrirModalBtn");
    const fecharModalSpan = document.querySelector(".modal-close");

    abrirModalBtn.addEventListener("click", () => {
      modal.style.display = "block";
      listarFiltros();
  listarNomesParaSelect();
    });

    fecharModalSpan.addEventListener("click", () => {
      modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    });
      
