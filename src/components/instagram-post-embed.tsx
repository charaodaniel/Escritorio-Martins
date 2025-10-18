
"use client";

import React, { useEffect, useMemo } from 'react';

type InstagramPostEmbedProps = {
  postUrl: string;
};

const InstagramPostEmbed: React.FC<InstagramPostEmbedProps> = ({ postUrl }) => {
  // O useEffect garante que o script de embed do Instagram seja carregado e executado.
  useEffect(() => {
    const scriptId = 'instagram-embed-script';
    // Evita adicionar o script múltiplas vezes
    if (document.getElementById(scriptId)) {
      // Se o script já existe, apenas pede para ele processar novos embeds
      window.instgrm?.Embeds.process();
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => {
      window.instgrm?.Embeds.process();
    };
    document.body.appendChild(script);
  }, []);

  // useMemo para construir o HTML do embed apenas quando a URL do post mudar.
  const embedHtml = useMemo(() => {
    if (!postUrl) return null;

    // Extrai o código do post da URL, removendo parâmetros de query string.
    const url = new URL(postUrl);
    const postPath = url.pathname;

    const embedCode = `
      <blockquote 
        class="instagram-media" 
        data-instgrm-permalink="https://www.instagram.com${postPath}" 
        data-instgrm-version="14" 
        style="background:#FFF; border:0; border-radius:3px; box-shadow:0 0 1px 0 rgba(0,0,0,0.5),0 1px 10px 0 rgba(0,0,0,0.15); margin: 1px; max-width:540px; min-width:326px; padding:0; width:99.375%; width:-webkit-calc(100% - 2px); width:calc(100% - 2px);">
        <div style="padding:16px;">
          <a href="https://www.instagram.com${postPath}" style="background:#FFFFFF; line-height:0; padding:0 0; text-align:center; text-decoration:none; width:100%;" target="_blank" rel="noopener noreferrer">
          </a>
        </div>
      </blockquote>
    `;
    // Note que não incluímos 'data-instgrm-captioned' para ocultar a legenda.

    return { __html: embedCode };
  }, [postUrl]);

  if (!embedHtml) {
    return null;
  }

  return <div dangerouslySetInnerHTML={embedHtml} />;
};

export default InstagramPostEmbed;
