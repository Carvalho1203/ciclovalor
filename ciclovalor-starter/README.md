# CicloValor · início do projeto

Home de uma plataforma de reciclagem para Vassouras, RJ. Nome e identidade visual são uma proposta inicial, pois a devolutiva não inclui layout de referência ou marca definida.

## Stack

- **Next.js 16 + React + TypeScript**: App Router, uma única Home responsiva, exportação estática.
- **NestJS 11 + TypeScript**: API HTTP independente e executável, com módulo, controller e service para a Home.
- **Contrato compartilhado**: `shared/home-data.ts`, utilizado tanto pela Home quanto pela API.
- CSS próprio, Lucide React e fontes locais DM Sans / Manrope (licenças em `public/fonts`).

## Rodar localmente

Requisitos: Node.js 22 ou superior e npm. A partir desta pasta:

```bash
npm ci
npm run dev:web
```

Abra **http://localhost:4173**. A Home funciona imediatamente com exemplos locais.

Para executar a API, em outro terminal:

```bash
npm run dev:api
```

API em **http://localhost:3001/api/home**. Verificação de saúde em **http://localhost:3001/api/health**.

A versão de Services recebe a URL da API pelo binding privado `CICLOVALOR_API_URL`, lido somente pelo servidor Next.js em tempo de requisição. O navegador não chama a API diretamente. Não configure essa variável manualmente na Vercel. Para prévias estáticas, a Home usa os dados demonstrativos compartilhados.

A API usa `PORT` e `WEB_ORIGINS` do processo. Ela mantém o prefixo `/api`.

## Validar e gerar produção

```bash
npm run typecheck
npm run build
npm run test:api
```

- `out/`: Home exportada, pronta para hospedagem estática.
- `apps/api/dist/`: API compilada. Execute com `npm run start --workspace @ciclovalor/api`.
- O teste de integração sobe a API temporariamente na porta 3099, verifica resposta, contrato de materiais, CORS e ausência de rota de escrita. Rode-o após o build.
- O adaptador em `scripts/dev.mjs` traduz os argumentos do ambiente de pré-visualização para a CLI oficial do Next.js.

## O que está pronto

- Home com identidade visual, imagem de reciclagem aprovada e layout para desktop e celular.
- Navegação por seções na mesma página; nenhuma outra aba funcional foi adicionada.
- Busca de pontos e filtro por material, incluindo estado vazio e limpeza dos filtros.
- Detalhes dos pontos em modal, orientações por material, perguntas frequentes e apresentação da proposta de recompensas.
- Navegação por teclado, diálogos nativos, botão de menu móvel e respeito à preferência de movimento reduzido.
- Metadados, ícone e manifesto web inicial. Não há service worker, cache offline ou promessa de PWA completo.

## Limites desta entrega

Todos os pontos de coleta são **fictícios**, identificados como exemplos. Não há endereço, distância, horário verificado, mapa geográfico ou geolocalização. A ilustração de mapa dos cartões é decorativa. As recompensas são apenas uma explicação da proposta: não existem saldo, vouchers ou resgates reais.

A prévia publicada anteriormente hospeda somente a Home estática. Esta versão prepara **Vercel Services**, com `web` público e `api` interno, e aguarda a confirmação da configuração antes da publicação. Não há banco, cadastro, autenticação, upload de fotos, IA, registro de descartes ou armazenamento de dados pessoais.

## Próximos passos alinhados à devolutiva

1. Validar a Home, a marca e os pontos de coleta reais.
2. Criar PostgreSQL + PostGIS e Prisma quando começar a persistência.
3. Modelar o descarte com material, quantidade/peso, unidade e regra utilizada, garantindo rastreabilidade dos pontos.
4. Vincular cada ponto ao usuário operador; relacionar explicitamente os materiais aceitos por ponto.
5. Derivar o saldo do histórico de descartes e resgates e garantir consistência transacional e idempotência.
6. Implementar autenticação, validação de recebimento e regras de pontuação somente após definição do produto.
7. Se IA for necessária, avaliar uma API pronta pelo NestJS; manter YOLO customizado, filas e otimização de rotas para etapas futuras.

O projeto não assume valores de pontuação, parceiros ou requisitos que não tenham sido definidos.

## Estrutura

```text
app/                 Home, layout, CSS e metadados do Next.js
components/          Componentes interativos
shared/              Contratos e dados demonstrativos compartilhados
apps/api/src/        Aplicação NestJS
public/              Imagem aprovada, ícone, manifesto e fontes locais
scripts/             Teste de integração e adaptador de desenvolvimento
```

## Hospedar na Vercel com Services

Siga `HOSPEDAR-NA-VERCEL.md`. O `vercel.json` prepara `web` e `api`, com apenas a Home pública. O servidor Next.js chama o NestJS por um binding privado. As definições estão prontas para revisão; o deploy depende da confirmação solicitada.

A Home usa a imagem aprovada em `public/images/ciclovalor-reciclagem.png`, preservada integralmente, sem recorte. O cartão e a legenda já fazem parte dela e não recebem sobreposições duplicadas.
