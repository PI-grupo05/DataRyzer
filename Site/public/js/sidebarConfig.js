menuAberto = true;

function abrirMenu(){
  const botaoMenu = document.getElementById('botaoMenu')
  const menuLateral = document.getElementById('menuLateral')

  if(menuAberto == true){
    botaoMenu.style.transform = "scaleX(1)"
    menuLateral.style.width = "0%"
    menuLateral.style.fontSize = "0%"
    menuAberto = false
  }
  else{
    botaoMenu.style.transform = "scaleX(-1)"
    menuLateral.style.width = "300px"
    menuLateral.style.fontSize = "100%"
    menuAberto = true
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
            <a href="./grupos.html">
                <img src="./assets/imgs/iconeEmpresas.png" alt="">
                <span>Grupos</span>
            </a>`
  } else {
    sidebar.innerHTML =
    `<a href="./meuPerfilExcluir.html">
        <img src="./assets/imgs/iconePerfil.png" alt="">
        <span>Perfil</span>
    </a>
    `
  }
}