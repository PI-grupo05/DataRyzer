menuFechado = true

function abrirMenu(){
    menu = document.getElementsByClassName('nav__menu')
    header = document.getElementsByClassName('header')
    if(menuFechado == true){
        menu[0].style.display = 'flex'
        header[0].style.transition = '0.5s'
        header[0].style.height = '30%'
        menuFechado = false
    }else{
        menu[0].style.display = 'none'
        header[0].style.height = '10%'
        menuFechado = true
    }
}
function abrirLogin(){
    window.location.href = "login.html"
}