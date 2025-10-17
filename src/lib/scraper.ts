
import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { loadContent } from './content-loader';
import type { ContentData } from './content-loader';

const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/vieiraemartinsadv/';
const CONTENT_FILE_PATH = path.join(process.cwd(), 'src', 'data', 'content.json');

function createEmbedCode(postUrl: string): string {
    const permalink = postUrl.endsWith('/') ? postUrl : `${postUrl}/`;
    return `<blockquote class="instagram-media" data-instgrm-permalink="${permalink}" data-instgrm-version="14"></blockquote>`;
}

export async function runScraper() {
  console.log('🚀 [SCRAPER] Iniciando a busca por novas publicações do Instagram...');
  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true, // Use 'new' para o novo modo headless
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    await page.goto(INSTAGRAM_PROFILE_URL, { waitUntil: 'networkidle2' });

    console.log('✅ [SCRAPER] Página do perfil carregada.');

    // Aguarda os links das publicações serem carregados
    await page.waitForSelector('a[href^="/p/"]');

    const postLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href^="/p/"]'));
        // Pega os 12 posts mais recentes para não sobrecarregar
        return links.slice(0, 12).map(link => (link as HTMLAnchorElement).href);
    });

    if (postLinks.length === 0) {
      console.log('⚠️ [SCRAPER] Nenhum link de publicação encontrado.');
      return { message: 'Nenhuma publicação encontrada no perfil.' };
    }
    
    console.log(`🔍 [SCRAPER] Encontrados ${postLinks.length} links de publicações.`);

    const content = loadContent();
    const existingPermalinks = new Set(
      content.testimonials.instagram.posts.map(post => {
        const match = post.embedCode.match(/data-instgrm-permalink="([^"]+)"/);
        return match ? match[1] : null;
      }).filter(Boolean)
    );
    
    console.log(`🔎 [SCRAPER] ${existingPermalinks.size} publicações já existem. Verificando por novas...`);

    const newPosts = postLinks
      .map(link => ({
          permalink: link,
          embedCode: createEmbedCode(link)
      }))
      .filter(post => !existingPermalinks.has(post.permalink));

    if (newPosts.length === 0) {
      console.log('✅ [SCRAPER] Nenhuma nova publicação encontrada. Tudo atualizado!');
      return { message: 'Nenhuma nova publicação encontrada. O site já está atualizado.' };
    }

    console.log(`✨ [SCRAPER] Adicionando ${newPosts.length} novas publicações.`);
    
    const updatedPosts = [
        ...newPosts.map(p => ({ embedCode: p.embedCode })), 
        ...content.testimonials.instagram.posts
    ];
    
    const newContent: ContentData = {
        ...content,
        testimonials: {
            ...content.testimonials,
            instagram: {
                ...content.testimonials.instagram,
                posts: updatedPosts,
            },
        },
    };

    await fs.writeFile(CONTENT_FILE_PATH, JSON.stringify(newContent, null, 2), 'utf-8');

    console.log('💾 [SCRAPER] Arquivo content.json atualizado com sucesso!');
    return { message: `${newPosts.length} nova(s) publicação(ões) adicionada(s) com sucesso!` };

  } catch (error: any) {
    console.error('❌ [SCRAPER] Ocorreu um erro durante a execução:', error);
    throw new Error(`Falha ao buscar publicações: ${error.message}`);
  } finally {
    if (browser) {
      await browser.close();
      console.log('✅ [SCRAPER] Navegador fechado.');
    }
  }
}
