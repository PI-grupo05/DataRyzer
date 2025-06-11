function verificarTipoUsuario(){
    var opcoes = document.getElementById("opcoes")
    var tipoUsuario = sessionStorage.TIPO_USUARIO
    
    if(tipoUsuario == "MASTER"){
        opcoes.innerHTML=`
                        <h1>Dashboard de Análises e indicadores</h1>
                        <div onclick="window.location = '../grupos.html'" id="opcao">
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
                            <img src="./assets/imgs/iconeCidades.png"  alt="">
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
                        <div onclick="window.location = '../historico_interrupcao.html'" id="opcao">
                            <img  src="./assets/imgs/iconeHistorico.png" alt="">
                            <h2>Histórico</h2>
                        </div>
                            `
    }
}

window.onload = verificarTipoUsuario;