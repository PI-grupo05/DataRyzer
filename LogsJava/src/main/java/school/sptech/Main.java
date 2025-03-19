package school.sptech;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Date;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        /*Scanner scanner = new Scanner (System.in);*/

        // importa os métodos da classe Frases
        String [] mensagens = Frases.pegarMensagens();
        String [] labels = Frases.pegarLabels();
        String[] cores = Frases.pegarCores();

        // Cria um "formatador" para exibir a data e hora no padrão "dd/MM/yyyy HH:mm:ss"
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");

        Integer i =0;



        while (true){
            // Pega a data e hora atuais
            LocalDateTime now = LocalDateTime.now();
            String formattedDateTime = now.format(formatter);
            // Formata a data e hora atuais usando o formatador!!!!
           // String dataFormatada = LocalDateTime.now().format(formatter);
            String label = labels[i]; //index para percorrer o array
            String mensagem = mensagens[i];

            System.out.println("[" + formattedDateTime + "] " + cores[i] + "[" + label + "]" + "\u001B[0m " + mensagem);

            i = (i + 1) % mensagens.length;
            // percorre a lista e a reseta

            // pega horário atual do sistema em milissegundos.
            Long start = System.currentTimeMillis();
            //Long tipo whapper, tipo de dado que armazena valores inteiros grandes

            // Aguardar 5 segundos antes de imprimir a próxima mensagem
            Thread.sleep(5000);

        }

    }

}

