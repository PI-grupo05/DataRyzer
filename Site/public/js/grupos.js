let limiteGrupos = 0;

function criarGrupo() {
  const listarGrupos = document.getElementById("list-groups");
  if (limiteGrupos == 3) {
    console.log("Só pode 3 grupos");
    return;
    //adidicioanr validações em nomes*
  }

  let nome = document.getElementById("nome-grupo").value;

  if (!nome.trim()) {
    console.log("nome vazio");
    return;
  }
  // criando elementos html que referenciam um grupo criado

  // pai
  const grupo = document.createElement("div");
  grupo.className = "group";

  // filhos
  const spanNome = document.createElement("span");
  spanNome.textContent = nome;
  spanNome.className = "nomeGrupo";

  const btnCidades = document.createElement("button");
  btnCidades.className = "btn-cidades";
  btnCidades.textContent = "Gerenciar cidades";
  btnCidades.addEventListener("click", () => gerenciarCidade());

  const btnEditar = document.createElement("button");
  btnEditar.className = "btn-editar";
  btnEditar.textContent = "edit";
  btnEditar.addEventListener("click", () => editarGrupo(grupo));

  const btnExcluir = document.createElement("button");
  btnExcluir.className = "btn-excluir";
  btnExcluir.textContent = "X";
  btnExcluir.addEventListener("click", () => excluirGrupo(grupo));

  //adicionando os filhos ao pai
  grupo.appendChild(spanNome);
  grupo.appendChild(btnCidades);
  grupo.appendChild(btnEditar);
  grupo.appendChild(btnExcluir);

  //adicionando o grupo a lista de grupos
  listarGrupos.appendChild(grupo);

  limiteGrupos++;

  document.getElementById("nome-grupo").value = "";
}

function excluirGrupo(grupo) {
  const listarGrupos = document.getElementById("list-groups");
  listarGrupos.removeChild(grupo);
  limiteGrupos--;
}

function editarGrupo(grupo) {
  const spanNome = grupo.querySelector("span");
  const nomeAtual = spanNome.textContent;

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
      if (novoNome) {
        spanNome.textContent = novoNome;
      }
      grupo.removeChild(input);
      spanNome.style.display = "inline";
    }
  });

  input.focus();
}
