var ambiente_processo = 'producao';
// var ambiente_processo = "desenvolvimento";

var caminho_env = ambiente_processo === "producao" ? ".env" : ".env.dev";
// Acima, temos o uso do operador ternário para definir o caminho do arquivo .env
// A sintaxe do operador ternário é: condição ? valor_se_verdadeiro : valor_se_falso

require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var mensagemDev = `${HOST_APP}:${PORTA_APP}`
var mensagemProd = HOST_APP


if(ambiente_processo == "desenvolvimento") {
  var mensagem = mensagemDev
}else if(ambiente_processo == "producao") {
  var mensagem = mensagemProd
}
 


var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var dashGeralRouter = require("./src/routes/kpiDashGeral");
var historicoRouter = require("./src/routes/historico");
var groupRouter = require("./src/routes/grupos");
var notificacoesRouter = require("./src/routes/notificacoes");
var unidadeRouter = require("./src/routes/unidade");
var kpiDashEspecificaRouter = require("./src/routes/kpiDashEspecifica");
var unidadeConsumidoraRouter = require("./src/routes/unidadeConsumidora")


var filtroRouter = require("./src/routes/filtroRoutes"); 



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/historico", historicoRouter);
app.use("/kpiDashGeral", dashGeralRouter); 
app.use("/grupos", groupRouter);
app.use("/notificacoes", notificacoesRouter);
app.use("/unidade", unidadeRouter);
app.use("/kpiDashEspecifica", kpiDashEspecificaRouter);

app.use("/unidadeConsumidora", unidadeConsumidoraRouter);
app.use("/filtros", filtroRouter);


app.get("/config", (req, res) => {
    res.json({
        APP_HOST: HOST_APP,
        APP_PORT: PORTA_APP,
        AMBIENTE_PROCESSO: ambiente_processo
    });
});


app.listen(PORTA_APP, function () {
  console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${mensagem} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
