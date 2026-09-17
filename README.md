# Larissa Hub - portfólio editorial interativo

Aplicação Angular criada para apresentar o trabalho de uma autora em uma experiência editorial responsiva. Além das páginas institucionais, o projeto inclui publicação e leitura de histórias, editor de conteúdo rico, upload de imagens e uma área administrativa protegida por Firebase Authentication.

## O que este projeto demonstra

- Angular com componentes standalone, Signals, rotas e serviços tipados.
- Integração com uma API REST em Java/Spring Boot.
- Autenticação Firebase e envio de JWT Bearer para operações administrativas.
- Upload de imagens no Firebase Storage com validação de tipo, tamanho e caminho.
- Conteúdo editorial dinâmico com tratamento contra XSS no frontend e no backend.
- Interface responsiva, páginas temáticas e recursos interativos desenvolvidos sob medida.

## Arquitetura

```text
Angular/Vercel
  |-- leitura pública ----------> Spring Boot/Render ----------> MongoDB
  |-- login do autor -----------> Firebase Authentication
  |-- JWT em escrita -----------> validação Firebase Admin + RBAC
  `-- upload de imagens --------> Firebase Storage + regras de segurança
```

O backend relacionado está em [portfolio-backend](https://github.com/NaoNerfaMeuQ/portfolio-backend).

## Segurança

- A configuração web do Firebase é pública por definição; ela não substitui regras de segurança.
- Escritas na API exigem token Firebase válido e allowlist ou custom claim `admin`.
- As regras em `storage.rules` limitam escrita a administradores, imagens permitidas e 5 MB.
- O backend sanitiza o HTML antes de persistir e o Angular o sanitiza novamente ao renderizar.
- Credenciais privadas e arquivos locais de ambiente são ignorados pelo Git.

Antes de publicar, restrinja a chave Firebase aos domínios usados e implante `storage.rules` no projeto correto. Consulte `SEGURANCA.md`.

## Execução local

### Pré-requisitos

- Node.js compatível com Angular 22
- npm 11+
- API `portfolio-backend` disponível em `http://localhost:8080`

```bash
npm ci
npm start
```

A aplicação ficará disponível em `http://localhost:4200`.

## Qualidade

```bash
npm test -- --watch=false
npm run build
```

## Configuração

- `src/environments/environment.ts`: desenvolvimento local.
- `src/environments/environment.prod.ts`: URL da API publicada.
- `storage.rules`: política de acesso e validação de uploads.

Não adicione service accounts, senhas ou tokens ao repositório. A chave web Firebase presente no frontend deve continuar protegida por restrições de domínio e pelas regras do Firebase.
