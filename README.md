# Site Institucional - Martins Advogados

Este é o projeto do site institucional para o escritório **Martins Advogados**, desenvolvido com o auxílio do Firebase Studio.

O objetivo deste site é apresentar o escritório, suas áreas de atuação, seus diferenciais e facilitar o contato de novos clientes.

## ✨ Tecnologias Utilizadas

O projeto foi construído utilizando um conjunto de tecnologias modernas para garantir performance, escalabilidade e uma ótima experiência de desenvolvimento:

- **Next.js**: Framework React para renderização no lado do servidor (SSR) e geração de sites estáticos.
- **React**: Biblioteca para construção de interfaces de usuário.
- **TypeScript**: Superset do JavaScript que adiciona tipagem estática.
- **Tailwind CSS**: Framework CSS utility-first para estilização rápida e responsiva.
- **ShadCN/UI**: Coleção de componentes de UI reutilizáveis.
- **Genkit by Firebase**: Para futuras integrações de funcionalidades com IA generativa.
- **Lucide React**: Para ícones.

## 🚀 Executando o Projeto Localmente

Para iniciar o ambiente de desenvolvimento, siga os passos abaixo:

1.  **Instale as dependências:**
    ```bash
    npm install
    ```

2.  **Inicie o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

Após executar o comando, o site estará disponível em `http://localhost:9002` (ou outra porta, se configurada).

## ⚙️ Configuração para Produção (Vercel)

Para que o painel de edição (`/admin`) possa salvar as alterações no seu repositório do GitHub quando o site estiver em produção (hospedado na Vercel ou similar), você precisa configurar as seguintes variáveis de ambiente:

1.  **`GITHUB_REPO`**
    -   **Descrição:** O caminho completo do seu repositório no GitHub.
    -   **Formato:** `seu-usuario/nome-do-repositorio`
    -   **Exemplo:** `martins-adv/site-institucional`

2.  **`GITHUB_TOKEN`**
    -   **Descrição:** Um *Personal Access Token (Fine-grained)* do GitHub com permissão de leitura e escrita no conteúdo (`Contents: Read and Write`) do seu repositório.
    -   **Como Criar:**
        1.  Vá para [GitHub > Settings > Developer Settings > Personal access tokens > Fine-grained tokens](https://github.com/settings/tokens?type=beta).
        2.  Clique em **Generate new token**.
        3.  Dê um nome ao token, selecione o repositório do projeto e conceda a permissão **Contents** como **Read and Write**.
        4.  Gere o token, copie-o e cole o valor na variável de ambiente na Vercel.

O login e senha para o painel são gerenciados pelo arquivo `src/data/users.json` e não necessitam de variáveis de ambiente.

---

*Este projeto foi prototipado e desenvolvido com o auxílio do **Firebase Studio**.*
