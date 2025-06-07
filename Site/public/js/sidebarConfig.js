let menuAberto = true;

function abrirMenu() {
    const botaoMenu = document.getElementById('botaoMenu');
    const menuLateral = document.getElementById('menuLateral');
    const conteudoPrincipal = document.getElementById('conteudoPrincipal');

    if (menuAberto) {
        // Fecha o menu
        botaoMenu.style.transform = "scaleX(1)"; // Mantém sua lógica original
        botaoMenu.textContent = "☰ Abrir";
        menuLateral.classList.add('fechado');
        conteudoPrincipal.classList.add('sidebar-fechada');
        menuAberto = false;
    } else {
        // Abre o menu
        botaoMenu.style.transform = "scaleX(-1)"; // Mantém sua lógica original
        botaoMenu.textContent = "☰ Menu";
        menuLateral.classList.remove('fechado');
        conteudoPrincipal.classList.remove('sidebar-fechada');
        menuAberto = true;
    }
}


window.addEventListener('load', verificarTipoUsuario);

function verificarTipoUsuario() {

  var sidebar = document.getElementById("menuLateralSecoes")
  var tipoUsuario = sessionStorage.TIPO_USUARIO
  if(tipoUsuario == "MASTER") {
    sidebar.innerHTML = `<a href="./meuPerfilExcluir.html">
                <img src="./assets/imgs/iconePerfil.png" alt="">
                <span>Perfil</span>
            </a>
            <a href="./notificacoes.html">
                <img src="./assets/imgs/iconeNotificacao.png" alt="">
                <span>Notificações</span>
            </a>
            <a href="./listaDiretores.html">
                <img src="./assets/imgs/usuarios.png" alt="">
                <span>Usuarios Regionais</span>
            </a>
            `
  } else {
    sidebar.innerHTML =
    `<a href="./meuPerfilExcluir.html">
        <img src="./assets/imgs/iconePerfil.png" alt="">
        <span>Perfil</span>
    </a>
    `
  }
}