public class Log {

    public static void main(String[] args) {
        // logs que irão aparecer no terminal
        log("Sistema de análises de quedas de energia iniciado com sucesso.");
        log("Queda de energia detectada na região Oeste. Empresa responsável: 'x'.");
        log("Tempo de blackout: 2 horas. Equipe técnica notificada.");
        log("Energia restaurada na Zona Oeste. Empresa responsável: 'x'.");
    }

    public static void log(String message) {

        System.out.println(message);
    }
}

// ideia: Fazer looping pra ficar aparecendo logs "ao vivo", usar um 'Math Random', e talvez uma
// lista para guardar várias frases...