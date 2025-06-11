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

// Variáveis globais
let APP_HOST, APP_PORT, AMBIENTE_PROCESSO;


fetch("/config")
    .then(res => res.json())
    .then(config => {
        APP_HOST = config.APP_HOST;
        APP_PORT = config.APP_PORT;
        AMBIENTE_PROCESSO = config.AMBIENTE_PROCESSO;

        console.log("Configurações carregadas:");
        console.log(APP_HOST, APP_PORT, AMBIENTE_PROCESSO);
        
    })
    .catch(err => {
        console.error("Erro ao buscar configurações:", err);
    });

function sair() {
    if (!APP_HOST) {
        alert("As configurações ainda não foram carregadas.");
        return;
    }

    sessionStorage.clear();
    window.location.href = `./login.html`;
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
                        <div onclick="window.location = '../dashGeral.html'" id="opcao">
                            <img  src="./assets/imgs/iconeDashboard.png" alt="">
                            <h2>Dashboard Geral</h2>
                        </div>
                        <div onclick="window.location = '../historico_interrupcao.html'"  id="opcao">
                            <img src="./assets/imgs/iconeHistorico.png" alt="">
                            <h2>Histórico</h2>
                        </div>
                        <div onclick="window.location = '../unidadeConsumidora.html'" id="opcao">
                            < img src="./assets/imgs/iconeCidades.png"  alt="">
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
                        <div onclick="window.location = '../unidadeConsumidora.html'" id="opcao">
                            <img  src="./assets/imgs/iconeHistorico.png" alt="">
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

