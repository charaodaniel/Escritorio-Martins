# 🧩 Painel de Edição de Conteúdo sem Banco de Dados (Next.js + GitHub API)

## 🎯 Objetivo

Criar um **painel administrativo simples** que permita editar o conteúdo (textos, imagens, descrições, etc.) de uma **landing page em Next.js**, **sem uso de banco de dados**, armazenando tudo diretamente em um arquivo JSON dentro do repositório GitHub.

As alterações feitas pelo painel são enviadas via **GitHub API**, usando um **token de acesso (PAT)**, que realiza commits automáticos no repositório.  
A cada commit, a **Vercel detecta a atualização** e reconstrói o site com o conteúdo mais recente.

---

## ⚙️ Tecnologias Utilizadas

- **Next.js** – Framework React para renderização estática e rotas API.  
- **Tailwind CSS** – Para o layout do painel administrativo.  
- **GitHub REST API** – Para atualizar o conteúdo diretamente no repositório.  
- **Vercel** – Hospedagem e rebuild automático ao detectar commits.  
- **JSON** – Armazenamento de dados simples e direto no projeto.

---

## 🧠 Conceito Principal

O site utiliza um arquivo `data/content.json` para armazenar os textos e imagens que aparecem na landing page.  
Em vez de um banco de dados, este arquivo é **editável pelo cliente** através de um painel protegido por senha.

O fluxo é o seguinte:

1. O cliente acessa `/admin` e edita os campos desejados.  
2. Ao clicar em **Salvar**, o painel envia os dados via `POST` para `/api/save-content`.  
3. Essa API converte os dados para Base64 e faz uma **requisição PUT** para a **GitHub API**, substituindo o conteúdo do arquivo `content.json`.  
4. O GitHub cria automaticamente um **commit** com a mensagem “Atualizado via painel administrativo”.  
5. A Vercel detecta o commit e reconstrói o site, exibindo o novo conteúdo.

---

## 🗂️ Estrutura do Projeto

```
/data
└── content.json
/pages
├── index.js         # Página principal (renderiza o conteúdo)
├── admin.js         # Painel de edição
└── api/
└── save-content.js  # Rota API para atualizar o JSON via GitHub API

```

---

## 🔐 Autenticação

A página `/admin` é protegida por **autenticação básica**.  
As credenciais são definidas em variáveis de ambiente (`.env` ou Vercel):

```env
ADMIN_USER=admin
ADMIN_PASS=1234
```

Um middleware impede o acesso não autorizado:

```js
// /middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const auth = req.headers.get('authorization');
  const expected = 'Basic ' + Buffer.from(`${process.env.ADMIN_USER}:${process.env.ADMIN_PASS}`).toString('base64');
  
  if (auth === expected) return NextResponse.next();
  return new NextResponse('Auth required', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm="Admin Area"' }
  });
}

export const config = { matcher: '/admin' };
```

---

## 🔑 GitHub Token (PAT)

O painel usa um **Personal Access Token (Fine-grained)** para autenticar a API.

### Como criar:

1. Vá em [GitHub → Settings → Developer Settings → Personal Access Tokens → Fine-grained Tokens](https://github.com/settings/tokens).
2. Clique em **Generate new token**.
3. Selecione:

   * **Resource owner:** seu usuário.
   * **Repository access:** escolha o repositório do projeto.
   * **Permissions:**

     * **Contents:** Read and Write.
     * **Metadata:** Read-only.
4. Defina a expiração (ou escolha “No expiration”).
5. Gere o token e **adicione na Vercel** como variável de ambiente:

   ```
   GITHUB_TOKEN=seu_token_aqui
   ```

---

## 🧰 API de Salvamento (`/pages/api/save-content.js`)

```js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const repo = 'usuario/nome-do-repositorio';
  const filePath = 'data/content.json';
  const githubToken = process.env.GITHUB_TOKEN;

  // Obtém o arquivo atual no GitHub
  const currentFile = await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
    headers: { Authorization: `token ${githubToken}` }
  }).then(r => r.json());

  // Codifica o novo conteúdo
  const newContent = Buffer.from(JSON.stringify(req.body, null, 2)).toString('base64');

  // Envia a atualização
  await fetch(`https://api.github.com/repos/${repo}/contents/${filePath}`, {
    method: 'PUT',
    headers: {
      Authorization: `token ${githubToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: 'Atualizado via painel administrativo',
      content: newContent,
      sha: currentFile.sha
    })
  });

  res.status(200).json({ message: 'Conteúdo atualizado com sucesso!' });
}
```

---

## 🧭 Fluxo de Atualização

1. O cliente edita e clica em **Salvar**.
2. A API faz o commit no GitHub.
3. A Vercel detecta o commit.
4. O site é reconstruído com o novo conteúdo.
5. O visitante já vê as alterações no ar em poucos segundos.

---

## 🚀 Benefícios da Solução

* 🔋 **Sem banco de dados** → mais leve, fácil de manter.
* 🔒 **Seguro** → acesso controlado por token e autenticação básica.
* 💾 **Versionado** → cada edição gera um commit histórico no GitHub.
* ⚡ **Deploy automático** → Vercel reconstrói o site automaticamente.
* 🧱 **Fácil de adaptar** → o JSON pode ter qualquer estrutura de conteúdo.

---

## 📚 Exemplo de Arquivo `content.json`

```json
{
  "titulo": "Bem-vindo ao Escritório Vieira & Martins",
  "subtitulo": "Excelência em advocacia desde 1995.",
  "descricao": "Nosso escritório oferece serviços jurídicos personalizados, com foco em resultados.",
  "imagemBanner": "/images/banner.jpg"
}
```

---

## 🧩 Conclusão

Essa abordagem cria um **painel de edição funcional, seguro e sem banco**, ideal para landing pages, portfólios e sites institucionais que precisam ser facilmente atualizados pelo cliente, mantendo o projeto **simples, leve e 100% integrado ao fluxo GitHub + Vercel**.

---

✍️ **Autor:** Daniel Charao Machado
📅 **Projeto:** Painel de edição sem banco (Next.js + GitHub API)
