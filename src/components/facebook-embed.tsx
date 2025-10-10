
"use client";

import Script from "next/script";
import React, { useEffect } from 'react';

type FacebookEmbedProps = {
  permalink: string;
};

export default function FacebookEmbed({ permalink }: FacebookEmbedProps) {

  useEffect(() => {
    // A API do Facebook (window.FB) pode não estar disponível imediatamente.
    // Esta função será chamada quando o SDK terminar de carregar.
    if (window.FB) {
      window.FB.XFBML.parse();
    }
  }, [permalink]);
  
  // Define a função `window.fbAsyncInit` que será executada após o carregamento do SDK
  useEffect(() => {
    window.fbAsyncInit = function() {
      window.FB.init({
        xfbml: true,
        version: 'v20.0'
      });
    };
  }, []);

  return (
    <>
      <div id="fb-root"></div>
      <Script
        async
        defer
        crossOrigin="anonymous"
        src="https://connect.facebook.net/pt_BR/sdk.js#xfbml=1&version=v20.0"
        nonce="Ie3j5a2p"
        onLoad={() => {
            // Garante que o parse seja chamado após o script carregar
             if (window.FB) {
                window.FB.XFBML.parse();
            }
        }}
      />
      <div
        className="fb-post"
        data-href={permalink}
        data-width="500"
        data-show-text="true"
      >
         <blockquote
            cite={permalink}
            className="fb-xfbml-parse-ignore"
         >
            <p>Carregando publicação do Facebook...</p>
         </blockquote>
      </div>
    </>
  );
}

declare global {
  interface Window {
    FB?: any;
    fbAsyncInit?: () => void;
  }
}
