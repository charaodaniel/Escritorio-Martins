// Este arquivo configura e inicia a tarefa agendada (cron job).
// Ele é importado no layout principal (src/app/layout.tsx) para garantir que seja executado
// quando a aplicação iniciar no servidor. Isso só funciona em ambientes Node.js (não no Vercel Edge, por exemplo).

import cron from 'node-cron';
import { runScraper } from './scraper';

// Agenda a execução para 9h e 21h todos os dias.
// Formato Cron: 'minuto hora dia-do-mês mês dia-da-semana'
// '0 9,21 * * *' significa: minuto 0, nas horas 9 e 21, todos os dias, todos os meses, todos os dias da semana.
cron.schedule("0 9,21 * * *", () => {
  console.log("🔁 [CRON] Executando a automação agendada do Instagram...");
  
  runScraper().catch(error => {
    console.error("❌ [CRON] Erro ao executar a automação agendada:", error);
  });
});

console.log("✅ [CRON] Agendador de tarefas para o Instagram foi iniciado.");
