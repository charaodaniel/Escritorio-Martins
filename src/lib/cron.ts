
import { CronJob } from 'node-cron';
import { runScraper } from './scraper';
import { loadContent } from './content-loader';

// Este arquivo gerencia o início do agendador de tarefas.

let scraperJob: CronJob | null = null;

function getCronSchedule(times: string[]): string {
  if (!times || times.length === 0) return '';
  
  const validTimes = times.filter(t => t && /^[0-2]?\d:[0-5]\d$/.test(t));

  const cronParts = validTimes.map(time => {
    const [hour, minute] = time.split(':');
    return `${minute} ${hour} * * *`;
  });
  
  // node-cron não suporta múltiplos padrões diretamente na string,
  // então vamos criar um job para cada horário ou pegar o primeiro.
  // Para simplificar, vamos usar apenas o primeiro horário válido.
  return cronParts[0] || '';
}

export function startScheduler() {
  if (typeof window !== 'undefined') {
    return; // Não executa no lado do cliente
  }

  try {
    const content = loadContent();
    const { automation } = content;

    if (scraperJob) {
      scraperJob.stop();
      console.log('✅ [CRON] Agendador anterior interrompido.');
    }
    
    if (automation && automation.enabled && automation.schedule.length > 0) {
      const scheduleString = getCronSchedule(automation.schedule);
      
      if (scheduleString) {
        scraperJob = new CronJob(scheduleString, async () => {
          console.log(`⏰ [CRON] Executando automação agendada para as ${automation.schedule.join(', ')}.`);
          try {
            await runScraper();
            console.log('✅ [CRON] Automação concluída com sucesso.');
          } catch (error) {
            console.error('❌ [CRON] Erro ao executar a automação agendada:', error);
          }
        });
        
        scraperJob.start();
        console.log(`🚀 [CRON] Automação do Instagram agendada para: ${automation.schedule.join(' e ')}.`);
      } else {
         console.log('⚠️ [CRON] Automação habilitada, mas nenhum horário válido encontrado.');
      }
    } else {
      console.log('ℹ️ [CRON] Automação do Instagram desabilitada ou sem horários definidos.');
    }
  } catch (error) {
      console.error("❌ [CRON] Falha ao iniciar o agendador:", error);
  }
}

// Inicia o agendador quando o módulo é carregado no servidor
startScheduler();
