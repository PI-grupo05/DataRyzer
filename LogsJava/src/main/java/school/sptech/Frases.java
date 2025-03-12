package school.sptech;

public class Frases {

    static String[] pegarMensagens() {
        return new String[]{
                "Sistema de monitoramento de interrupções de energia iniciado com sucesso.",
                "Alerta: Interrupção de energia detectada na região Oeste. Concessionária responsável: 'X'.",
                "Duração estimada da interrupção: 2 horas. Equipe técnica foi notificada.",
                "Energia restaurada na região Oeste. Concessionária responsável: 'X'.",
                "Atenção: Interrupção prolongada na região Nordeste. Investigação em andamento.",
                "Erro crítico: Falha no sistema de monitoramento de quedas de energia.",
                "Aviso: Variação instável na tensão elétrica detectada na região Sul.",
                "Nova queda de energia registrada na região Central. Técnicos a caminho.",
                "Aviso: Manutenção programada na rede elétrica da região Norte. Possíveis oscilações.",
                "Sistema de backup ativado devido a falha na distribuição de energia.",
                "Relatório gerado: Média de tempo de restauração nas últimas 24 horas: 3 horas e 15 minutos.",
                "Alerta: Sobrecarga na rede identificada na região Sudeste. Monitoramento intensificado.",
                "Falha na comunicação com sensores remotos. Verificação necessária."
        };
    }

    static String[] pegarLabels() {
        return new String[]{
                "INFORMACAO", "ALERTA", "RASTREIO", "INFORMACAO",
                "ALERTA", "FATAL", "ALERTA", "ALERTA",
                "INFORMACAO", "RASTREIO", "INFORMACAO", "ALERTA", "ERRO"
        };
    }
}
