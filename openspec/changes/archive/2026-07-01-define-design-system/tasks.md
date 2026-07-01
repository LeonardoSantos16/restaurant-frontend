# Tasks: define-design-system

## 1. Setup de fontes

- [x] 1.1 Adicionar Fraunces, Work Sans e IBM Plex Mono (via `@fontsource/*` ou
      `next/font` / `@font-face` local — evitar Google Fonts CDN direto por
      performance/privacidade)
- [x] 1.2 Definir `font-display: swap` para evitar FOIT

## 2. Tailwind

- [x] 2.1 Adicionar tokens de cor (`basalt`, `ivory`, `brass`, `wine`, `stone`) em
      `tailwind.config.js`
- [x] 2.2 Adicionar `fontFamily` (display/body/mono) e `fontSize` customizados
- [x] 2.3 Configurar `darkMode` se aplicável (o tema já é dark-first; avaliar se
      haverá variante light)

## 3. Camada base CSS

- [x] 3.1 Criar `globals.css` com `@layer base` definindo `body { @apply bg-basalt
  text-ivory font-body }`
- [x] 3.2 Definir estilo de foco visível global (`outline` em `brass`)
- [x] 3.3 Adicionar media query `prefers-reduced-motion` desabilitando transforms de
      escala globalmente

## 4. Componente de validação (sanity check)

- [x] 4.1 Criar página/rota temporária `/design-tokens` (não faz parte do produto
      final) exibindo: paleta com hex, amostras de tipografia em cada tamanho, e um
      exemplo do spotlight circular com foto placeholder
- [x] 4.2 Validar contraste com ferramenta automatizada (ex: axe, Lighthouse) a
      partir dessa página
- [x] 4.3 Remover/excluir a rota de validação antes do `archive` final, ou marcar
      como dev-only

## 5. Testes (Vitest)

- [x] 5.1 Teste de snapshot/contraste para garantir que os tokens de cor não sejam
      alterados acidentalmente em PRs futuras
- [x] 5.2 Teste verificando que o componente de spotlight aceita prop para
      desabilitar animação (suporte a reduced motion)

## 6. Documentação para o agente

- [x] 6.1 Atualizar `CLAUDE.md` na raiz do projeto referenciando este arquivo
      (`openspec/specs/design-system/spec.md` após archive) como fonte de verdade de
      estilo, com a regra: "nunca introduzir cor fora dos 5 tokens definidos"
