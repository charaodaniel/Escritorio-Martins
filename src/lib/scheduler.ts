
// src/lib/scheduler.ts
import { startScheduler } from './cron';

let isInitialized = false;

export function initializeScheduler() {
  if (process.env.NODE_ENV === 'development' && !isInitialized) {
    console.log("🚀 [SCHEDULER] Inicializando o agendador de tarefas...");
    startScheduler();
    isInitialized = true;
  } else if (process.env.NODE_ENV === 'production') {
    // Em produção, a inicialização pode ser diferente (ex: Vercel Cron Jobs)
    // Por enquanto, vamos manter a mesma lógica.
     if (!isInitialized) {
        console.log("🚀 [SCHEDULER] Inicializando o agendador de tarefas em produção...");
        startScheduler();
        isInitialized = true;
     }
  }
}

export function rescheduleScraper() {
    console.log("🔄 [SCHEDULER] Reagendando a automação...");
    startScheduler();
}
