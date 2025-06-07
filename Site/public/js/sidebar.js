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

window.onload = verificarTipoUsuario
function verificarTipoUsuario() {

  var sidebar = document.getElementById("menuLateralSecoes")
  var tipoUsuario = sessionStorage.TIPO_USUARIO
  if(tipoUsuario == "MASTER") {
    sidebar.innerHTML = `<a href="./menu.html">
    <img src="./assets/imgs/house_icon.svg" alt="">
    <span>Menu incial</span>
  </a>
  <a href="./dashGeral.html">
    <img src="./assets/imgs/icon_grafico.svg" alt="">
    <span>Dashboard</span>
  </a>
  <a href="./unidadeConsumidora.html">
    <img src="./assets/imgs/unidade_consumidora_icon.svg" alt="">
    <span>Unidades Consumidoras</span>
  </a>
  <a href="./historico_interrupcao.html">
    <img src="./assets/imgs/historico_sidebar.svg" alt="">
    <span>historico de interrupções</span>
  </a>
  <a href="./grupos.html">
      <img src="./assets/imgs/grupos_icon.svg" alt="">
      <span>Grupos</span>
  </a>`
  } else {
    sidebar.innerHTML =
    `<a href="./menu.html">
    <img src="./assets/imgs/iconeDash.png" alt="">
    <span>Menu incial</span>
    </a>
    <a href="./dashEspecifica.html">
      <img src="./assets/imgs/icon_grafico.svg" alt="">
      <span>Dashboard</span>
    </a>
    <a href="./grupos.html">
        <img src="./assets/imgs/iconeEmpresas.png" alt="">
        <span>Grupos</span>
    </a>`
  }
}

