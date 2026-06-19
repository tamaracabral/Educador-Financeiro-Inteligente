# Planej.ai — Educador Financeiro Inteligente

Aplicação web para criar simulações financeiras pessoais, avaliar metas e receber orientações geradas por inteligência artificial em uma linguagem simples e educativa.

O usuário informa renda, despesas, dívidas e uma meta financeira. A aplicação calcula o valor mensal disponível, apresenta um diagnóstico personalizado e permite conversar com um Educador Financeiro virtual sobre os próximos passos.

## Funcionalidades

- Formulário guiado para criação de uma simulação financeira.
- Máscara de moeda brasileira nos campos de valores.
- Cálculo do saldo mensal após despesas e dívidas.
- Página de resultado com resumo da meta, prazo e orçamento.
- Diagnóstico financeiro personalizado gerado pelo Gemini.
- Chat contextual com o Educador Financeiro.
- Persistência das perguntas e respostas do chat.
- Histórico de simulações com acesso aos resultados anteriores.
- Tema claro e escuro.
- Layout responsivo para dispositivos móveis e desktop.
- Estados de carregamento, erro e nova tentativa nas interações com IA.

## Tecnologias

- React 19
- TypeScript 6
- Vite 8
- React Router 7
- Tailwind CSS 4
- Gemini API
- Lucide React
- React Loading Skeleton
- ESLint e Prettier
- `localStorage` para persistência no navegador

## Pré-requisitos

- Node.js compatível com o Vite 8.
- Corepack habilitado ou pnpm instalado.
- Uma chave de API do Gemini para utilizar o diagnóstico e o chat.

O projeto fixa o gerenciador `pnpm@11.7.0` no `package.json`.

## Instalação

Clone o repositório e entre na pasta do projeto:

```bash
git clone <url-do-repositorio>
cd Educador-Financeiro-Inteligente
```

Habilite o Corepack e instale as dependências:

```bash
corepack enable
corepack pnpm install
```

## Configuração da inteligência artificial

Crie um arquivo `.env.local` na raiz do projeto:

```env
VITE_GEMINI_API_KEY=sua_chave_do_gemini
```

O arquivo `.env.local` está ignorado pelo Git e não deve ser versionado.

> Atenção: variáveis iniciadas com `VITE_` são incluídas no código entregue ao navegador. Essa abordagem é adequada apenas para desenvolvimento e demonstração. Em produção, as chamadas ao Gemini devem passar por um backend para proteger a chave, aplicar limites de uso e validar as requisições.

## Executando o projeto

Inicie o servidor de desenvolvimento:

```bash
corepack pnpm dev
```

O Vite mostrará o endereço local no terminal, normalmente `http://localhost:5173`.

## Fluxo da aplicação

1. O usuário acessa a página inicial e preenche as etapas da simulação.
2. A aplicação salva os dados no navegador e gera um identificador único.
3. O usuário é encaminhado para `/resultado/:id`.
4. A página calcula o cenário financeiro e solicita o diagnóstico à IA.
5. Depois do diagnóstico, o usuário pode conversar com o Educador Financeiro.
6. A simulação e a conversa podem ser reabertas pela página de histórico.

## Rotas

| Rota             | Descrição                                    |
| ---------------- | -------------------------------------------- |
| `/`              | Formulário para criar uma nova simulação.    |
| `/resultado/:id` | Resultado, diagnóstico e conversa com a IA.  |
| `/historico`     | Lista das simulações salvas neste navegador. |

## Persistência dos dados

Atualmente os dados ficam no `localStorage` do navegador:

| Chave                          | Conteúdo                            |
| ------------------------------ | ----------------------------------- |
| `simulation-data`              | Simulações financeiras salvas.      |
| `financial-educator-chat:<id>` | Conversa vinculada a uma simulação. |
| `theme`                        | Tema claro ou escuro selecionado.   |

Isso significa que:

- os dados ficam disponíveis apenas no navegador e dispositivo utilizados;
- limpar os dados do site remove simulações e conversas;
- não existe sincronização entre dispositivos;
- o histórico atual não utiliza banco de dados ou autenticação.

## Estrutura principal

```text
src/
├── components/   # Componentes compartilhados e recursos da simulação
├── contex/       # Contexto e provider de tema
├── data/         # Etapas, tipos e prompts enviados à IA
├── hooks/        # Estado, armazenamento, diagnóstico e chat
├── pages/        # Páginas de formulário, resultado e histórico
├── service/      # Integração com a API do Gemini
├── storage/      # Persistência do histórico de conversa
├── styles/       # Tema e variáveis visuais
└── utils/        # Formatação monetária e cálculos financeiros
```

Arquivos importantes:

- `src/data/Simulation.ts`: etapas e tipos da simulação.
- `src/hooks/useSimulationStorage.tsx`: persistência das simulações.
- `src/service/aiService.ts`: comunicação com o Gemini.
- `src/data/aiPrompt.ts`: instruções para o diagnóstico financeiro.
- `src/data/financialEducatorPrompt.ts`: contexto do chat educativo.
- `src/storage/financialEducatorChatStorage.ts`: histórico das conversas.
- `src/router.tsx`: configuração das rotas.

## Scripts disponíveis

| Comando                      | Descrição                                         |
| ---------------------------- | ------------------------------------------------- |
| `corepack pnpm dev`          | Inicia o servidor de desenvolvimento.             |
| `corepack pnpm build`        | Verifica o TypeScript e cria o build de produção. |
| `corepack pnpm preview`      | Executa localmente o build de produção.           |
| `corepack pnpm lint`         | Analisa o código com ESLint.                      |
| `corepack pnpm format`       | Formata os arquivos com Prettier.                 |
| `corepack pnpm format:check` | Verifica a formatação sem alterar arquivos.       |

## Validação antes de contribuir

Antes de enviar alterações, execute:

```bash
corepack pnpm lint
corepack pnpm format:check
corepack pnpm build
```

## Solução de problemas

### A IA não gera o diagnóstico

- Confirme se `.env.local` existe na raiz.
- Verifique se `VITE_GEMINI_API_KEY` possui uma chave válida.
- Reinicie o servidor após alterar variáveis de ambiente.
- Consulte o console e a aba de rede do navegador para verificar a resposta da API.

### O histórico está vazio

O histórico é local. Confirme que a simulação foi criada no mesmo navegador e que os dados do site não foram apagados.

### Imports aparecem com erro no editor

O projeto diferencia maiúsculas e minúsculas nos caminhos. Use, por exemplo, `@/data/Simulation`, respeitando o nome real do arquivo. Se o código compilar e o editor continuar mostrando um diagnóstico antigo, reinicie o servidor TypeScript do editor.

## Aviso

As respostas da inteligência artificial têm finalidade educativa e podem conter imprecisões. A aplicação não substitui orientação individual de um profissional qualificado e não deve ser usada como única base para decisões financeiras relevantes.
