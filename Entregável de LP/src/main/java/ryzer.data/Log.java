import java.time.LocalDateTime; // Importa a classe LocalDateTime para trabalhar com data e hora
import java.time.format.DateTimeFormatter; // Importa a classe DateTimeFormatter para formatar data e hora

public class Log {

    // Lista de frases para os logs
    private static final String[] FRASES = {
            "Sistema de análises de quedas de energia iniciado com sucesso.",
            "Queda de energia detectada na região Oeste. Empresa responsável: 'x'.",
            "Tempo de blackout: 2 horas. Equipe técnica notificada.",
            "Energia restaurada na Zona Oeste. Empresa responsável: 'x'.",
            "Alerta: Queda de energia prolongada na região Nordeste.",
            "Erro crítico: Falha no sistema de monitoramento.",
            "Aviso: Tensão instável detectada na região Sul."
    };

    // Labels em português para categorizar os logs
    private static final String[] LABELS = {"INFORMACAO", "ALERTA", "ERRO", "RASTREIO", "DEPURACAO", "FATAL", "INFORMACAO"};


    //fiz o for pra percorrer o array frases , e para cada indice
    // do array frases corresponde ao mesmo indice do array labels (é como se fosse uma etiqueta/categoria)
    public static void main(String[] args) {
        // Loop para gerar os logs
        for (int indiceLog = 0; indiceLog < FRASES.length; indiceLog++) {
            // Pega o label correspondente ao índice atual
            String label = LABELS[indiceLog];

            // Gera o log com o label e a frase correspondentes
            log(label, FRASES[indiceLog]);
        }
    }

    // esse método é para criar e exibir um log formatado (hora data e label como prof falou)
    public static void log(String label, String message) {
        // Pega a data e hora atuais
        LocalDateTime now = LocalDateTime.now();

        // Cria um "formatador" para exibir a data e hora no padrão "dd/MM/yyyy HH:mm:ss"
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

        // Formata a data e hora atuais usando o formatador!!!!
        String formattedDateTime = now.format(formatter);

        // Exibe o log no console com data e hora formatadas, label, mensagem do log
        System.out.println("[" + formattedDateTime + "] [" + label + "] " + message);
    }
}