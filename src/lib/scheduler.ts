
import cron, { ScheduledTask } from 'node-cron';
import { runScraper } from './scraper';
import { loadContent } from './content-loader';

let tasks: ScheduledTask[] = [];

// Função para converter HH:MM em uma expressão cron
function timeToCron(time: string): string {
    const [hour, minute] = time.split(':');
    return `${minute} ${hour} * * *`;
}

// Inicia as tarefas com base no content.json
export function startScheduler() {
    console.log("🔄 Iniciando o agendador de tarefas...");
    const content = loadContent();
    const scraperConfig = content.scraper;

    // Para todas as tarefas existentes antes de criar novas
    stopScheduler();

    if (!scraperConfig.enabled || !scraperConfig.schedules) {
        console.log("🟡 Automação agendada está desativada. Nenhuma tarefa foi criada.");
        return;
    }

    scraperConfig.schedules.forEach(schedule => {
        if (cron.validate(timeToCron(schedule.time))) {
            const task = cron.schedule(timeToCron(schedule.time), () => {
                console.log(`🔁 [CRON] Executando a automação agendada para as ${schedule.time}...`);
                runScraper().catch(error => {
                    console.error(`❌ [CRON] Erro ao executar a automação agendada das ${schedule.time}:`, error);
                });
            });
            tasks.push(task);
            console.log(`✅ [CRON] Tarefa agendada para as ${schedule.time} todos os dias.`);
        } else {
            console.error(`❌ [CRON] Formato de hora inválido encontrado: ${schedule.time}. A tarefa não foi agendada.`);
        }
    });

    if(tasks.length === 0) {
        console.log("ℹ️ Nenhuma tarefa válida foi agendada.");
    }
}

// Para todas as tarefas agendadas
export function stopScheduler() {
    if (tasks.length > 0) {
        console.log(`🛑 Parando ${tasks.length} tarefa(s) agendada(s)...`);
        tasks.forEach(task => task.stop());
        tasks = []; // Limpa o array de tarefas
    }
}

// Reinicia o agendador (usado após salvar o conteúdo)
export async function rescheduleScraper() {
    console.log("🗓️ Reagendando tarefas da automação...");
    startScheduler();
}

// Inicia o agendador quando o módulo é carregado pela primeira vez
startScheduler();

    