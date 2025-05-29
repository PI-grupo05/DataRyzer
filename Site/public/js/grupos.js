let limiteGrupos = 0;

function criarGrupo() {
  if (limiteGrupos == 3) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Você já atingiu o limite de grupos (3)!",
    });
    return;
  }
  let nome = document.getElementById("nome-grupo").value;
  const idUsuario = sessionStorage.ID_USUARIO;

  if (!nome.trim()) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "Você não digitou o nome do grupo!",
    });
    return;
  } else if (nome.length > 20) {
    Swal.fire({
      icon: "warning",
      title: "Oops...",
      text: "O nome do grupo não pode ultrapassar 20 caracteres!",
    });
    return;
  }

  fetch("/grupos/criar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ nome, idUsuario }),
  })
    .then((response) => {
      if (!response.ok) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Erro ao criar grupo!",
        });
        throw new Error("Erro na resposta do servidor");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Resposta do backend ao criar grupo:", data);
      if (data.error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.error,
        });
        return;
      }
      if (data.ok) {
        criarGrupoNaTela(nome, data.idGrupo);
        limiteGrupos++;
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.error,
        });
      }
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Erro ao criar grupo!",
      });
    });

  document.getElementById("nome-grupo").value = "";
}

function criarGrupoNaTela(nome, idGrupo) {
  const listarGrupos = document.getElementById("list-groups");

  // criando elementos html que referenciam um grupo criado
  // pai
  const grupo = document.createElement("div");
  grupo.className = "group";
  grupo.setAttribute("data-id", idGrupo);

  // filhos
  const spanNome = document.createElement("span");
  spanNome.textContent = nome;
  spanNome.className = "nomeGrupo";

  const btnDivGrupo = document.createElement("div");
  btnDivGrupo.className = "div-btns";

  const btnCidades = document.createElement("button");
  btnCidades.className = "btn-cidades";
  btnCidades.textContent = "Gerenciar grupo";
  btnCidades.addEventListener("click", () => abrirModalGerenciar(idGrupo));

  const btnEditar = document.createElement("button");
  btnEditar.className = "btn-editar";
  btnEditar.innerHTML = `<img src="assets/imgs/icons8-lápis-100.png" alt="Editar" width="25px" height="25px">`;
  btnEditar.addEventListener("click", () => editarGrupo(grupo));

  const btnExcluir = document.createElement("button");
  btnExcluir.className = "btn-excluir";
  btnExcluir.innerHTML = `<img src="assets/imgs/icons8-lixeira-60.png" alt="Editar" width="25px" height="25px"> `;
  btnExcluir.addEventListener("click", () => excluirGrupo(grupo));

  //adicionando os filhos ao pai
  grupo.appendChild(spanNome);
  grupo.appendChild(btnCidades);
  grupo.appendChild(btnEditar);
  grupo.appendChild(btnExcluir);
  grupo.appendChild(btnDivGrupo);

  btnDivGrupo.appendChild(btnCidades);
  btnDivGrupo.appendChild(btnEditar);
  btnDivGrupo.appendChild(btnExcluir);

  //adicionando o grupo a lista de grupos
  listarGrupos.appendChild(grupo);
}

function carregarGruposDoUsuario() {
  const idUsuario = sessionStorage.ID_USUARIO;

  fetch(`/grupos/listar/${idUsuario}`)
    .then((res) => res.json())
    .then((grupos) => {
      grupos.forEach((grupo) => {
        criarGrupoNaTela(grupo.nome, grupo.id_grupo);
      });
    })
    .catch((err) => {
      console.error("Erro ao carregar grupos:", err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Erro ao carregar grupos existentes!",
      });
    });
}

function excluirGrupo(grupo) {
  const listarGrupos = document.getElementById("list-groups");
  listarGrupos.removeChild(grupo);
  const idGrupo = grupo.getAttribute("data-id");
  console.log("idGrupo--", idGrupo);
  limiteGrupos--;

  fetch(`grupos/deletar/${idGrupo}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((resposta) => {
      if (resposta.ok) {
        console.log("Registro deletado com sucesso");
      } else {
        console.log("Erro ao deletar registro");
      }
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}

function editarGrupo(grupo) {
  const spanNome = grupo.querySelector("span");
  const nomeAtual = spanNome.textContent;
  const idGrupo = grupo.getAttribute("data-id");

  if (grupo.querySelector("input")) {
    console.log("ja exitse um input");
    return;
  }

  const input = document.createElement("input");
  input.type = "text";
  input.value = nomeAtual;
  input.className = "input-edit-name";

  // esconde o span de nome para atualizar o novo
  spanNome.style.display = "none";
  grupo.insertBefore(input, spanNome);

  //Evento de enter para trocar o nome do grupo
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const novoNome = input.value.trim();
      if (!novoNome) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "O nome do grupo não pode ser vazio!",
        });
        input.focus();
        return;
      }
      if (novoNome.length > 20) {
        Swal.fire({
          icon: "warning",
          title: "Oops...",
          text: "O nome do grupo não pode ultrapassar 20 caracteres!",
        });
        input.focus();
        return;
      }

      input.disabled = true;

      fetch(`/grupos/editar/${idGrupo}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome: novoNome }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erro ao editar grupo");
          }
          return response.json();
        })
        .then((data) => {
          if (data.error) {
            Swal.fire({
              icon: "error",
              title: "Erro",
              text: data.error,
            });
          } else {
            spanNome.textContent = novoNome;
          }
        })
        .finally(() => {
          grupo.removeChild(input);
          spanNome.style.display = "inline";
        });
    }
  });

  input.focus();
}
/* Modal de unidades */
function fecharModal() {
  document.getElementById("modal-gerenciar").classList.add("hidden");
}

function abrirModalGerenciar(idGrupo) {
  const modal = document.getElementById("modal-gerenciar");
  modal.classList.remove("hidden");

  const titulo = document.getElementById("titulo-modal-gerenciar");
  titulo.textContent = `Gerenciar Grupo`;

  // Armazenar o id do grupo como data attribute no modal
  modal.setAttribute("data-id-grupo", idGrupo);

  carregarUnidadesDisponiveis(); // já pode chamar ao abrir
}

function associarUnidadeGrupoNaTela(nomeUnidade, idGrupo) {
  const listaUnidades = document.getElementById("list-unidades");

  //pai
  const divUnidades = document.createElement("div");
  divUnidades.className = "unidade";

  //filhos
  const spanUnidade = document.createElement("span");
  spanUnidade.textContent = nomeUnidade;

  const btnDesassociar = document.createElement("button");
  btnDesassociar.className = "btn-desassociar";
  btnDesassociar.innerHTML = `<img src="assets/imgs/icons8-lixeira-60.png" alt="Desassociar" width="25px" height="25px">`;
  btnDesassociar.addEventListener("click", () =>
    desassociarUnidade(spanUnidade, idGrupo)
  );

  //adicionando os filhos ao pai
  divUnidades.appendChild(spanUnidade);
  divUnidades.appendChild(btnDesassociar);

  listaUnidades.appendChild(divUnidades);
}

function carregarUnidadesDisponiveis() {
  const idUsuario = sessionStorage.ID_USUARIO;
  fetch(`/grupos/unidades-disponiveis/${idUsuario}`)
    .then((res) => res.json())
    .then((unidades) => {
      const select = document.getElementById("select-unidade");
      select.innerHTML =
        '<option disabled value="default">Selecione a Unidade</option>';

      for (const unidade of unidades) {
        const option = document.createElement("option");
        option.textContent = unidade.name;
        option.value = unidade.id_unidade_consumidora;
        select.appendChild(option);
      }
    });
}

function associarUnidadeAoGrupo() {
  const selectUnidade = document.getElementById("select-unidade");
  const idUnidade = selectUnidade.value;

  if (idUnidade === "default") {
    Swal.fire({ icon: "warning", text: "Selecione uma unidade!" });
    return;
  }

  const modal = document.getElementById("modal-gerenciar");
  const idGrupo = modal.getAttribute("data-id-grupo");

  fetch("/grupos/unidades/associar", {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idUnidade, idGrupo }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.ok) {
        associarUnidadeGrupoNaTela(data.nome, idGrupo);
        carregarUnidadesDisponiveis();
      } else {
        Swal.fire({ icon: "error", text: "Erro ao associar unidade!" });
      }
    })
    .catch((error) => {
      console.error("Erro na associação:", error);
      Swal.fire({ icon: "error", text: "Erro ao associar unidade!" });
    });
}

function carregarUnidadesAssociadas(idGrupo) {
  fetch(`/grupos/unidades-associadas/${idGrupo}`)
    .then((res) => res.json())
    .then((unidades) => {
      const listaUnidades = document.getElementById("list-unidades");
      listaUnidades.innerHTML = ""; //

      unidades.forEach((unidade) => {
        associarUnidadeGrupoNaTela(unidade.nome, idGrupo);
      });
    })
    .catch((err) => {
      console.error("Erro ao carregar unidades associadas:", err);
      Swal.fire({ icon: "error", text: "Erro ao carregar unidades do grupo!" });
    });
}
