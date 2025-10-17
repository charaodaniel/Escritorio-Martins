
import puppeteer from 'puppeteer';
import fs from 'fs/promises';
import path from 'path';
import { loadContent, ContentData } from './content-loader';

const INSTAGRAM_PROFILE_URL = 'https://www.instagram.com/vieiraemartinsadv/';
const MAX_POSTS = 12;

// Função para gerar o código de incorporação a partir de uma URL de post
const getEmbedCode = (postUrl: string): string => {
    // Garante que a URL não tenha parâmetros de rastreamento antes de criar o permalink
    const cleanUrl = new URL(postUrl);
    cleanUrl.search = ''; // Remove query params
    const permalink = `${cleanUrl.toString()}?utm_source=ig_embed&amp;utm_campaign=loading`;

    return `<blockquote class="instagram-media" data-instgrm-permalink="${permalink}" data-instgrm-version="14" style=" background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);"><div style="padding:16px;"><a href="${permalink}" style=" background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank"></div></blockquote>`;
};

// Função para extrair o permalink de um embedCode
const getPermalinkFromEmbed = (embedCode: string): string | null => {
    const match = embedCode.match(/data-instgrm-permalink="([^"]+)"/);
    if (!match) return null;
    const url = new URL(match[1]);
    url.search = ''; // Limpa os parâmetros de busca para uma comparação mais limpa
    return url.toString();
};


export async function runScraper() {
  console.log('🚀 Iniciando scraper do Instagram...');
  let browser;

  try {
    browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    
    const page = await browser.newPage();
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    console.log(`Navegando para ${INSTAGRAM_PROFILE_URL}...`);
    await page.goto(INSTAGRAM_PROFILE_URL, { waitUntil: 'networkidle2' });

    console.log('Página carregada. Coletando links das publicações...');

    const postLinks = await page.evaluate((max) => {
        const links = Array.from(document.querySelectorAll('a[href^="/p/"]'));
        const uniqueLinks = new Set(links.map(a => (a as HTMLAnchorElement).href));
        return Array.from(uniqueLinks).slice(0, max);
    }, MAX_POSTS);

    if (postLinks.length === 0) {
      console.warn('⚠️ Nenhum link de publicação encontrado. O Instagram pode ter mudado sua estrutura de página.');
      return;
    }

    console.log(`✅ ${postLinks.length} links de publicações recentes encontrados.`);

    const contentFilePath = path.join(process.cwd(), 'src', 'data', 'content.json');
    const currentContent = loadContent();
    
    const existingPermalinks = new Set(
        currentContent.testimonials.instagram.posts.map(p => getPermalinkFromEmbed(p.embedCode)).filter(Boolean)
    );

    const newPosts = postLinks
      .map(link => {
          const cleanUrl = new URL(link);
          cleanUrl.search = '';
          return { permalink: cleanUrl.toString(), embedCode: getEmbedCode(link) };
      })
      .filter(post => !existingPermalinks.has(post.permalink));

    if (newPosts.length === 0) {
        console.log('✅ Nenhuma nova publicação para adicionar. O conteúdo já está atualizado.');
        return;
    }

    console.log(`✨ Adicionando ${newPosts.length} novas publicações.`);
    
    const updatedPosts = [
        ...newPosts.map(p => ({ embedCode: p.embedCode })),
        ...currentContent.testimonials.instagram.posts
    ];
    
    const updatedContent: ContentData = {
      ...currentContent,
      testimonials: {
        ...currentContent.testimonials,
        instagram: {
          ...currentContent.testimonials.instagram,
          enabled: true,
          posts: updatedPosts,
        },
      },
    };

    await fs.writeFile(contentFilePath, JSON.stringify(updatedContent, null, 2), 'utf-8');
    
    console.log('✅ Arquivo content.json atualizado com sucesso com as novas publicações.');

  } catch (error) {
    console.error('❌ Erro durante a execução do scraper:', error);
    throw new Error('Falha ao extrair publicações do Instagram.');
  } finally {
    if (browser) {
      await browser.close();
      console.log('🔒 Navegador fechado.');
    }
  }
}

    