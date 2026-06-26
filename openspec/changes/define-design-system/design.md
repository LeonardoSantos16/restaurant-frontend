# Design: define-design-system

## 1. Cor

| Token    | Hex       | Uso                                                           |
| -------- | --------- | ------------------------------------------------------------- |
| `basalt` | `#15140F` | Fundo principal (preto com leve viés oliva, não neutro frio)  |
| `ivory`  | `#F1ECDD` | Texto principal sobre fundo escuro                            |
| `brass`  | `#C49A4A` | Accent único — CTAs, preços, hover, links ativos              |
| `wine`   | `#5B2430` | Accent secundário raro — "esgotado", destaque do chef, badges |
| `stone`  | `#8A8577` | Texto secundário, divisores, metadados (horário, categoria)   |

Regras de uso:

- `brass` aparece no máximo em 1-2 elementos por viewport. Não usar como cor de fundo
  de seção inteira.
- `wine` é exceção, não padrão — reservado para no máximo um destaque por página.
- Contraste mínimo: `ivory` sobre `basalt` ≈ 14.8:1 (AAA). `brass` sobre `basalt`
  ≈ 6.2:1 (AA para texto grande/UI; não usar `brass` para parágrafos longos).

## 2. Tipografia

| Papel      | Fonte         | Peso(s)                                                   | Uso                                   |
| ---------- | ------------- | --------------------------------------------------------- | ------------------------------------- |
| Display    | Fraunces      | 400, 600 (italic opcional para nome de prato em destaque) | Nome de prato, títulos de seção, hero |
| Corpo      | Work Sans     | 400, 500                                                  | Descrições, navegação, formulários    |
| Utilitária | IBM Plex Mono | 400                                                       | Preços, horários, números             |

Escala de tamanho (rem, base 16px):

```
display-xl   3.5   (hero, nome do prato em destaque)
display-lg   2.25  (títulos de seção: "Entradas", "Principais")
body-lg      1.125 (descrição de prato)
body-md      1     (texto padrão)
body-sm      0.875 (metadados, legendas)
mono-md      1     (preços em listagem)
```

Tracking: display usa `-0.01em` (levemente condensado). Corpo e mono usam tracking
padrão (`0`).

Padrão "dot leader" para itens de cardápio (nome ...... preço), usando `mono-md`
apenas no preço:

```
Burrata .................................... R$ 42
```

## 3. Layout

Princípio: **editorial, não SaaS-card**. Nada de cards com sombra/border-radius
grande — a separação visual vem de espaço negativo e divisores finos.

- Container central, largura máxima ~720px para listagens de cardápio (leitura tipo
  menu impresso); seções de hero podem ocupar full-bleed.
- Divisor entre categorias: linha de 1px em `stone` a 20% de opacidade, com label da
  categoria sobreposta (ex: "— Entradas —").
- Espaçamento vertical generoso entre itens (mín. 24px) — é isso que substitui a
  "caixa" do card.
- Grid de 12 colunas padrão para páginas que precisarem (ex: reservas), mas o
  cardápio em si é lista vertical, não grade.

Wireframe de referência (cardápio):

```
┌──────────────────────────────────────┐
│              [logo]                  │
│                                       │
│         ╭─────────────╮              │
│        ╱   foto prato   ╲   ← spotlight circular
│       │   vinheta escura  │     (ver seção 4)
│        ╲   nas bordas    ╱
│         ╰─────────────╯              │
│                                       │
│     Nome do Prato Assinatura         │
│     descrição curta em `stone`       │
│                                       │
│  ─── Entradas ─────────────────────  │
│  Burrata .......................R$ 42│
│  Tartar de atum .................R$ 58│
│  ─── Principais ───────────────────  │
│  ...                                  │
└──────────────────────────────────────┘
```

## 4. Elemento-assinatura: spotlight circular

- Foto do prato em recorte circular (não quadrado/retangular).
- Vinheta radial escura nas bordas do círculo, fundindo com `basalt` ao redor —
  sem borda dura, sem sombra projetada tipo card.
- Diâmetro: ~280px no hero, ~120px em itens "em destaque" dentro da listagem.
- Uso restrito: hero da página + no máximo 1 item em destaque por categoria. Itens
  comuns da listagem **não** levam foto — só nome, descrição curta e preço. Isso
  evita que o recurso vire papel de parede repetitivo (risco identificado na
  autocrítica do plano).

## 5. Motion

- Hero: fade-in + leve scale-up (0.97 → 1) no spotlight circular ao carregar a
  página. Duração ~600ms, easing `ease-out`. Único momento orquestrado da página.
- Hover em item de cardápio: `stone` → `ivory` na cor do texto, sem outro efeito.
- Sem scroll-reveal repetido em cada item de lista — overdose de animação é sinal de
  design genérico/IA.
- Respeitar `prefers-reduced-motion: reduce` desativando o scale e mantendo só fade.

## 6. Acessibilidade

- Foco visível em todos os elementos interativos: outline 2px em `brass`, offset 2px.
- Contraste validado conforme tabela da seção 1.
- Texto nunca exclusivamente sobre a foto do spotlight sem overlay/scrim — usar
  gradiente `basalt` a 60% opacidade na base da imagem quando houver texto sobreposto.

## 7. Tailwind config (tokens)

```js
// tailwind.config.js (trecho)
module.exports = {
  theme: {
    extend: {
      colors: {
        basalt: '#15140F',
        ivory: '#F1ECDD',
        brass: '#C49A4A',
        wine: '#5B2430',
        stone: '#8A8577',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        body: ['"Work Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      fontSize: {
        'display-xl': ['3.5rem', { letterSpacing: '-0.01em' }],
        'display-lg': ['2.25rem', { letterSpacing: '-0.01em' }],
        'body-lg': '1.125rem',
        'body-md': '1rem',
        'body-sm': '0.875rem',
      },
    },
  },
};
```
