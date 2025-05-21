menuAberto = true;

function abrirMenu(){
  const botaoMenu = document.getElementById('botaoMenu')
  const menuLateral = document.getElementById('menuLateral')
  const containerConteudo = document.getElementById('containerConteudo')

  if(menuAberto == true){
    botaoMenu.style.transform = "scaleX(1)"
    menuLateral.style.width = "0%"
    menuLateral.style.fontSize = "0%"
    menuAberto = false
  }
  else{
    botaoMenu.style.transform = "scaleX(-1)"
    menuLateral.style.width = "20%"
    menuLateral.style.fontSize = "100%"
    menuAberto = true
  }
}