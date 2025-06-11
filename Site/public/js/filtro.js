

function formatarDataISO(dataISO) {
    if (!dataISO || typeof dataISO !== "string") {
        console.error("Erro: Data inválida recebida", dataISO);
        return null; // Retorna null em vez de "Data inválida"
    }

    const date = new Date(dataISO);
    
    if (isNaN(date.getTime())) { 
        console.error("Erro ao converter data:", dataISO);
        return null;
    }

    return date.toISOString().split("T")[0]; 
}


document.getElementById("filtros_select").addEventListener("change", function () {
    const filtroId = this.value;

    fetch(`/filtros/detalhes/${filtroId}`)
        .then(res => res.json())
        .then(detalhes => {
            console.log("Filtro carregado:", detalhes);

            const dataInicioFormatada = formatarDataISO(detalhes.data_inicio);
            const dataFimFormatada = formatarDataISO(detalhes.data_fim);

            if (!dataInicioFormatada || !dataFimFormatada) {
                console.error("Erro: datas inválidas, não enviando requisição");
                return;
            }

            atualizarDashboard(dataInicioFormatada, dataFimFormatada);
        })
        .catch(error => {
            console.error("Erro ao buscar detalhes do filtro:", error);
            alert("Erro ao carregar os detalhes do filtro.");
        });
});




//================================================================
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
                    data_inicio: filtro.data_inicio.split("T")[0],
                    data_fim: filtro.data_fim.split("T")[0],
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
                    usarDatas(detalhes.data_inicio.split("T")[0], detalhes.data_fim.split("T")[0]);
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
    console.log(`Data início: ${dataInicio.split("T")[0]}, Data fim: ${dataFim.split("T")[0]}`);
}



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
                inicioCell.textContent = filtro.data_inicio.split("T")[0];

                const fimCell = document.createElement("td");
                fimCell.textContent = filtro.data_fim.split("T")[0];

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




async function salvarFiltro() {
    const nomeFiltro = document.getElementById("nome_filtro").value;
    const dataInicio = document.getElementById("calendario").value;
    const dataFim = document.getElementById("calendario_fim").value;
    const idUsuarioS = sessionStorage.getItem("ID_USUARIO");

    console.log("Nome do Filtro:", nomeFiltro);
    console.log("Data Início:", dataInicio);
    console.log("Data Fim:", dataFim);
    console.log("ID Usuário:", idUsuarioS);

    if (!nomeFiltro || !dataInicio || !dataFim || !idUsuarioS) {
        await Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Preencha todos os campos!",
            confirmButtonText: "OK",
            heightAuto: false,
            scrollbarPadding: false,
        });
        return;
    }

    const filtroData = {
        nome: nomeFiltro,
        data_inicio: dataInicio,
        data_fim: dataFim,
        fk_usuario: idUsuarioS,
    };

    console.log("Dados enviados ao backend:", filtroData);

    try {
        const resposta = await fetch(`/filtros/criar`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filtroData),
        });

        console.log("Resposta do servidor:", resposta);

        if (resposta.ok) {
            listarFiltros();
            console.log("Filtro criado com sucesso!");
            
            // Sucesso
            await Swal.fire({
                title: "Sucesso!",
                text: "Filtro criado com sucesso!",
                icon: "success",
                confirmButtonText: "OK",
                heightAuto: false,
            scrollbarPadding: false,
            });
            
            limparCoisas();
            bloaquearDatafim();
            listarNomesParaSelect();
        } else {
            const texto = await resposta.text();
            console.error("Erro no backend:", texto);
            
            // Erro do backend
            await Swal.fire({
                title: "Erro!",
                text: "Erro ao salvar o filtro.",
                icon: "error",
                confirmButtonText: "OK",
                heightAuto: false,
            scrollbarPadding: false,
            });
        }
    } catch (error) {
        console.error("Erro na comunicação com o servidor:", error);
        
        // Erro de comunicação
        await Swal.fire({
            title: "Erro!",
            text: "Erro ao salvar filtro!",
            icon: "error",
            confirmButtonText: "OK",
                heightAuto: false,
            scrollbarPadding: false,
        });
    }
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


async function atualizarFiltro() {
    const nomeFiltro = document.getElementById("nome_filtro").value;
    const dataInicio = document.getElementById("calendario").value;
    const dataFim = document.getElementById("calendario_fim").value;

    if (!nomeFiltro || !dataInicio || !dataFim) {
        await Swal.fire({
            title: "Atenção!",
            text: "Preencha todos os campos!",
            icon: "warning",
            confirmButtonText: "OK",
                heightAuto: false,
            scrollbarPadding: false,
        });
        return;
    }

    const filtro = { nome: nomeFiltro, data_inicio: dataInicio, data_fim: dataFim };

    try {
        const res = await fetch(`filtros/editar/${idFiltroAtual}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(filtro),
        });

        if (!res.ok) throw new Error("Erro ao atualizar o filtro!");

        const data = await res.json();

        // Sucesso
        await Swal.fire({
            title: "Sucesso!",
            text: "Filtro atualizado com sucesso!",
            icon: "success",
            confirmButtonText: "OK",
                heightAuto: false,
            scrollbarPadding: false,
        });

        listarFiltros();
        limparCoisas();
        listarNomesParaSelect();
        bloaquearDatafim();

    } catch (error) {
        console.error("Erro ao atualizar filtro:", error);
        
        // Erro
        await Swal.fire({
            title: "Erro!",
            text: "Erro ao atualizar o filtro!",
            icon: "error",
            confirmButtonText: "OK",
                heightAuto: false,
            scrollbarPadding: false,
        });
    }
}


async function excluirFiltro(botao) {
    const listaFiltros = document.getElementById("lista_filtros");
    const idFiltro = botao.getAttribute("data-id");

    if (!idFiltro) {
        console.error("Erro: ID do filtro inválido!");
        await Swal.fire({
            title: "Erro!",
            text: "O filtro não possui um ID válido.",
            icon: "error",
            confirmButtonText: "OK",
                heightAuto: false,
            scrollbarPadding: false,
        });
        return;
    }

    // Confirmação de exclusão
    const confirmResult = await Swal.fire({
        title: "Tem certeza?",
        text: "Você realmente deseja excluir este filtro? Essa ação não pode ser desfeita!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sim, excluir",
        cancelButtonText: "Cancelar",
                heightAuto: false,
            scrollbarPadding: false,
    });

    // Se o usuário cancelou, sair da função
    if (!confirmResult.isConfirmed) return;

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
            
            // Sucesso
            await Swal.fire({
                title: "Sucesso!",
                text: "Filtro deletado com sucesso!",
                icon: "success",
                confirmButtonText: "OK",
                heightAuto: false,
            scrollbarPadding: false,
            });
            
            listarFiltros();
            listarNomesParaSelect();
            limparCoisas();
        } else {
            console.error("Erro ao deletar filtro!");
            
            // Erro na resposta
            await Swal.fire({
                title: "Erro!",
                text: "Erro ao deletar filtro.",
                icon: "error",
                confirmButtonText: "OK",
                heightAuto: false,
            scrollbarPadding: false,
            });
            
            listarFiltros();
            listarNomesParaSelect();
        }
    } catch (error) {
        console.error("Erro ao tentar excluir o filtro:", error);
        
        // Erro de conexão/exceção
        await Swal.fire({
            title: "Erro!",
            text: "Erro ao excluir o filtro!",
            icon: "error",
            confirmButtonText: "OK",
                heightAuto: false,
            scrollbarPadding: false,
        });
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


function formatarData(dataISO) {
    const date = new Date(dataISO);
    return date.toISOString().split("T")[0]; // Retorna apenas "YYYY-MM-DD"
}


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
      
