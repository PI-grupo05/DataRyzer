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


window.onload = verificarTipoUsuario
function verificarTipoUsuario() {

  var sidebar = document.getElementById("menuLateralSecoes")
  var tipoUsuario = sessionStorage.TIPO_USUARIO
  if(tipoUsuario == "MASTER") {
    sidebar.innerHTML = `<a href="./menu.html">
    <img src="./assets/imgs/iconeDash.png" alt="">
    <span>Menu incial</span>
  </a>
  <a href="./dashGeral.html">
    <img src="./assets/imgs/icon_grafico.svg" alt="">
    <span>Dashboard</span>
  </a>
  <a href="./unidadeConsumidora.html">
    <img src="./assets/imgs/iconeEmpresas.png" alt="">
    <span>Unidades Consumidoras</span>
  </a>
  <a href="./historico_interrupcao.html">
    <img src="./assets/imgs/historico_icon.png" alt="">
    <span>historico de interrupções</span>
  </a> `
  console.log("Inseri essa merda")
  } else {
    sidebar.innerHTML =
    `<a href="./menu.html">
    <img src="./assets/imgs/iconeDash.png" alt="">
    <span>Menu incial</span>
    </a>
    <a href="./dashEspecifica.html">
      <img src="./assets/imgs/icon_grafico.svg" alt="">
      <span>Dashboard</span>
    </a>`
  }
}