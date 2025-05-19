// sessão
function validarSessao() {
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

    var nomeUsuario = document.getElementById("nomeUsuario");

    if (email != null && nome != null) {
        nomeUsuario.innerHTML = nome;
    } else {
        window.location = "../login.html";
    }
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "../login.html";
}

function verificarTipoUsuario(){
    var opcoes = document.getElementById("opcoes")
    var tipoUsuario = sessionStorage.TIPO_USUARIO
    
    if(tipoUsuario == "MASTER"){
        opcoes.innerHTML=`
                        <h1>Dashboard de Análises e indicadores</h1>
                        <div id="opcao">
                            <img src="./assets/imgs/iconeGrupos.png" alt="">
                            <h2>Grupos</h2>
                        </div>
                        <div id="opcao">
                            <img src="./assets/imgs/iconeDashboard.png" alt="">
                            <h2>Dashboard Geral</h2>
                        </div>
                        <div id="opcao">
                            <img src="./assets/imgs/iconeHistorico.png" alt="">
                            <h2>Histórico</h2>
                        </div>
                        <div id="opcao">
                            <img src="./assets/imgs/iconeCidades.png" alt="">
                            <h2>Unidades Consumidoras</h2>
                        </div>
                            `
    }
    else{
        opcoes.innerHTML=`
                        <h1>Dashboard de Análises e indicadores</h1>
                        <div onclick="window.location = '../dashEspecifica.html'"
                             id="opcao">
                            <img src="./assets/imgs/iconeDashboard.png" alt="">
                            <h2>Dashboard Especifico</h2>
                        </div>
                        <div id="opcao">
                            <img src="./assets/imgs/iconeHistorico.png" alt="">
                            <h2>Histórico</h2>
                        </div>
                            `
    }
}

// carregamento (loading)
function aguardar() {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "flex";
}

 function finalizarAguardar(texto) {
    var divAguardar = document.getElementById("div_aguardar");
    divAguardar.style.display = "none";

    var divErrosLogin = document.getElementById("div_erros_login");
    if (texto) {
        divErrosLogin.style.display = "flex";
        divErrosLogin.innerHTML = texto;
    }
} 

