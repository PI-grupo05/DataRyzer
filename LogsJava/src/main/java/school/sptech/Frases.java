package school.sptech;

public class Frases {

    static String[] pegarMensagens() {
        return new String[]{
            "Cadastro realizado: Usuário ID 102 - Nome: Ana Souza - Email: ana.souza@example.com"
                    ,
                    "Falha no cadastro: Email já cadastrado - Email: ana.souza@example.com"
                    ,
                    "Login realizado: Usuário ID 103 - Email: joao.silva@example.com"
                    ,
                    "Falha no login: Senha incorreta - Email: maria.joaquina@example.com"
                    ,
                    "Tentativa de login suspeita: IP: 192.168.1.150 - Email: hacker@fake.com"
                    ,
                    "Conexão estabelecida: Usuário ID 103 - IP: 192.168.1.103"
                    ,
                    " Acesso negado: Permissão insuficiente para acessar a página Admin Dashboard - Usuário ID 102"
                    ,
                    "Erro interno do servidor: Código 500 - Usuário ID 102 ao acessar Página de Configurações"
                    ,
                    "Atualização de senha concluída: Usuário ID 102"
                    ,
                    "Tentativa de cadastro com CPF inválido: Usuário ID não gerado - CPF: 000.000.000-00"
        };
    }

    static String[] pegarLabels() {
        return new String[]{
                "INFORMACAO","ERRO","INFORMACAO",
                "ERRO","ALERTA","INFORMACAO",
                "ERRO","ERRO","INFORMACAO","ERRO"
        };
    }

    static String[] pegarCores() {
        return new String[]{
                "\u001B[32m", // Verde (INFORMAÇÃO)
                "\u001B[31m", // Vermelho (ERRO)
                "\u001B[32m", // Verde (INFORMAÇÃO)
                "\u001B[31m", // Vermelho (ERRO)
                "\u001B[33m", // Amarelo (ALERTA)
                "\u001B[32m", // Verde (INFORMAÇÃO)
                "\u001B[31m", // Vermelho (ERRO)
                "\u001B[31m", // Vermelho (ERRO)
                "\u001B[32m", // Verde (INFORMAÇÃO)
                "\u001B[31m"  // Vermelho (ERRO)

        };
    }
}
