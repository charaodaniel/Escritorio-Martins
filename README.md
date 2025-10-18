# Site Institucional - Vieira & Martins Advogados

Este é o projeto do site institucional para o escritório **Vieira & Martins Advogados**, um projeto full-stack desenvolvido com o auxílio do Firebase Studio.

O objetivo do site é apresentar o escritório, suas áreas de atuação, equipe e diferenciais, além de facilitar o contato com novos clientes através de um design moderno e responsivo. O projeto inclui um painel administrativo completo para gerenciamento de todo o conteúdo do site sem a necessidade de um banco de dados externo.

## ✨ Tecnologias Utilizadas

- **Next.js**: Framework React para renderização no servidor (SSR) e funcionalidades de back-end.
- **React**: Biblioteca para construção de interfaces de usuário dinâmicas.
- **TypeScript**: Para um código mais robusto e com tipagem estática.
- **Tailwind CSS**: Framework CSS utility-first para estilização rápida e responsiva.
- **ShadCN/UI**: Coleção de componentes de UI reutilizáveis e acessíveis.
- **Lucide React**: Biblioteca de ícones.

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

O site estará disponível em `http://localhost:9002`. O painel administrativo pode ser acessado em `http://localhost:9002/admin`.

Em modo de desenvolvimento, todas as alterações salvas no painel (conteúdo, usuários, imagens) são gravadas diretamente nos arquivos locais do projeto (`src/data/` e `public/`).

## 🔐 Painel de Edição e Autenticação

O projeto possui um painel administrativo (`/admin`) para gerenciar o conteúdo do site. O acesso é protegido por autenticação básica.

- **Credenciais de Acesso:** As credenciais (usuário e senha) são gerenciadas no arquivo `src/data/users.json`. Você pode adicionar, editar ou remover usuários diretamente nesse arquivo ou através do próprio painel administrativo.

## ⚙️ Deploy e Configuração para Produção (Vercel)

Quando o projeto é hospedado em um serviço como a Vercel, o painel administrativo pode ser configurado para salvar as alterações diretamente no seu repositório do GitHub. Isso aciona um novo deploy automaticamente, atualizando o site em produção.

Para habilitar essa funcionalidade, configure as seguintes variáveis de ambiente na Vercel:

1.  **`GITHUB_REPO`**
    -   **Descrição:** O caminho completo do seu repositório no GitHub.
    -   **Formato:** `seu-usuario/nome-do-repositorio`
    -   **Exemplo:** `vieira-martins-adv/site-institucional`

2.  **`GITHUB_TOKEN`**
    -   **Descrição:** Um *Personal Access Token (Fine-grained)* do GitHub. Este token precisa de permissão de **leitura e escrita no conteúdo (`Contents: Read and Write`)** do repositório do projeto.
    -   **Como Criar:**
        1.  Vá para [GitHub > Settings > Developer Settings > Personal access tokens > Fine-grained tokens](https://github.com/settings/tokens?type=beta).
        2.  Clique em **Generate new token**.
        3.  Dê um nome ao token, selecione o repositório do projeto e, em "Repository permissions", conceda a permissão **Contents** como **Read and Write**.
        4.  Gere o token, copie o valor e cole-o na variável de ambiente na Vercel.

Com essas variáveis configuradas, qualquer alteração salva no painel em produção resultará em um commit no repositório, e a Vercel reconstruirá o site com o conteúdo atualizado.

---

*Este projeto foi prototipado e desenvolvido com o auxílio do **Firebase Studio**.*
