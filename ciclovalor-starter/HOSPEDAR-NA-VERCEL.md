# CicloValor — proposta para Vercel Services

**Configuração preparada para confirmação. Não foi publicada na Vercel.**

A imagem e a Home aprovadas permanecem iguais. Esta versão adapta a comunicação entre Next.js e NestJS para Vercel Services.

## Estrutura e Root Directory

O `vercel.json` fica **dentro de `ciclovalor-starter`**, ao lado de `package.json`.

Na tela que você enviou, o repositório contém essa pasta. Selecione **Root Directory: `ciclovalor-starter`**, e não `./`. Se enviar diretamente os arquivos dessa pasta à raiz do GitHub, selecione `./`.

O caminho `root` de cada serviço é relativo ao diretório do `vercel.json`:

| Serviço proposto | Root | Framework | Entrada pública |
| --- | --- | --- | --- |
| `web` | `.` | Next.js | `/` e os caminhos atendidos pelo Next.js |
| `api` | `apps/api` | NestJS | Nenhuma; interno |

## Comunicação

- O navegador acessa a Home do serviço `web`.
- Durante a requisição, o servidor Next.js chama `/api/home` no NestJS pelo binding `CICLOVALOR_API_URL`.
- O código usa a URL gerada pela Vercel, sem hostname de produção fixo.
- O binding só é usado em Functions, em tempo de execução. Não é consultado no build nem em middleware.
- Não existe rewrite público para a API. Uma chamada pública a `/api/home` chega ao Next.js e recebe 404.
- O prefixo interno `/api` continua definido pelo NestJS; o servidor Next.js inclui esse prefixo na chamada.
- Não configure `CICLOVALOR_API_URL` manualmente na Vercel e remova a configuração antiga `NEXT_PUBLIC_API_URL`, caso tenha criado essa variável.

## Conferir antes de publicar

Confirme os nomes `web` e `api`, a exposição pública apenas de `web` na raiz e a chamada interna `web → api`. O nome do projeto no painel pode ser `ciclovalor`, se disponível; ele é independente dos nomes dos serviços.

Após confirmar, envie estes arquivos ao GitHub, substituindo os anteriores, escolha a Root Directory correta, mantenha **Application Preset: Services** e confira a configuração detectada. Não use mais o preset `Other` ou `outputDirectory: out` para este deployment com serviços.

Ative a inclusão de arquivos externos à Root Directory nas configurações de build, caso a Vercel apresente essa opção: a API utiliza `shared/home-data.ts`, compartilhado no monorepo.

## Testar

Requisitos: Node.js 22+, npm e uma versão atual da Vercel CLI com suporte a Services.

```bash
npm ci
npm run build:api
npm run build:services
npm run test:services
npm run test:api
```

O build de Services funciona sem uma URL de binding. A Home é renderizada por requisição. O teste de integração sobe a API e o Next.js temporariamente, simula a URL injetada pelo binding e verifica a chamada real e a ausência de acesso público à API.

Para testar o roteamento e a injeção reais da CLI:

```bash
npx vercel dev -L
```

O `-L` executa localmente sem autenticar com a nuvem. Não coloque uma URL manual no binding durante esse teste.

Sem `VERCEL=1` e sem binding, `npm run build:web` mantém a exportação estática com dados demonstrativos, para prévias independentes. Na Vercel, o build usa o modo servidor e não a pasta `out`.

## Limites

Os dados ainda são demonstrativos. Esta configuração não cria banco, autenticação, upload ou regras reais de recompensa. O build e os testes locais não comprovam um deployment da Vercel. O ambiente Vercel Services usa sua própria injeção de binding e deve ser validado após o deploy.

## Documentação

- https://vercel.com/docs/services
- https://vercel.com/docs/services/bindings
- https://vercel.com/docs/services/config-reference
- https://nextjs.org/docs/app/api-reference/functions/connection

## Validação realizada nesta revisão

- Build NestJS: passou.
- Build Next.js de Services sem binding disponível: passou, Home dinâmica.
- Build estático de prévia: passou.
- Testes de integração de binding simulado e API: passaram.
- `vercel dev -L` com Vercel CLI 65.0.0: Home HTTP 200, imagem aprovada HTTP 200, rota pública `/api/home/` HTTP 404. A Home consultou a API usando o binding injetado pela CLI.
- Deployment na nuvem: ainda não realizado, aguardando confirmação.

## Instalação conjunta no build da Vercel

Os dois serviços usam `npm ci --workspaces --include-workspace-root --include=dev`. O frontend e a API compartilham a árvore de dependências do monorepo. Instalar apenas a API depois do build do Next.js remove as dependências exclusivas do frontend e invalida os caminhos coletados para o empacotamento.

O build da API seleciona explicitamente `@ciclovalor/api`. O compilador TypeScript e os tipos de Node também estão declarados no próprio pacote da API.

A sequência completa foi reproduzida em uma cópia limpa: instalar tudo, compilar o frontend, instalar a API e verificar os arquivos referenciados pelo build. A instalação antiga deixava 737 referências ausentes, incluindo `@swc/helpers`; com a instalação conjunta, todas as 744 referências permaneceram presentes. O build da API e os testes HTTP e de integração passaram depois dessa sequência.

Para aplicar essa correção ao repositório já atualizado, substitua apenas o `vercel.json`, confirme um novo commit e acompanhe o deployment desse commit. Nomes dos serviços, binding e rotas públicas permanecem iguais. A validação local não substitui a confirmação do deployment na nuvem.
