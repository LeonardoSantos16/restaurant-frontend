# Design: add-about-page

## 1. Estrutura da página

Página estática, sem hooks de dados (diferente de Home/Menu). Composta inline em
`pages/About.tsx`, dentro do shell editorial padrão:

```tsx
<div className="mx-auto max-w-3xl space-y-16 px-6 py-12">
```

Ordem vertical, de cima para baixo:

1. Hero (Spotlight de atmosfera + frase de posicionamento + lede).
2. Prosa editorial (2–3 parágrafos de filosofia).
3. Divisória fina + bloco prático (`<dl>`).
4. CTA de reserva.

## 2. Hero (atmosfera)

Segue a estrutura de `components/FeaturedDish.tsx` (coluna centrada), reusando o
elemento-assinatura:

```tsx
<section className="flex flex-col items-center gap-6 text-center">
  <Spotlight
    src={sala}
    alt="Sala de jantar em luz âmbar, mesas espaçadas"
    size="hero"
  />
  <div className="space-y-2">
    <h1 className="text-display-xl font-display text-balance">
      Uma sala de luz âmbar, uma refeição sem pressa.
    </h1>
    <p className="text-body-md font-body text-stone max-w-md text-pretty">
      Cozinha contemporânea no centro da cidade. Ingredientes da estação, espaço
      generoso, atenção que não se apressa.
    </p>
  </div>
</section>
```

- O `<h1>` **é** a frase de posicionamento — nunca a palavra "Sobre" (respeita
  "No 'Our Story' headers"). É o único `h1` da página.
- A foto é de **ambiente/sala**, não de prato — aqui o objetivo é atmosfera. Como
  o texto fica **abaixo** da foto (não sobreposto), não é necessário o scrim
  `basalt` que o `DESIGN.md` exige para texto sobre spotlight.
- `Spotlight` já aplica `animate-spotlight-in` com fallback de
  `prefers-reduced-motion` — é o único momento de motion da página.

## 3. Prosa editorial (filosofia)

- 2 a 3 `<p>` em `text-body-lg font-body` com `text-pretty`, largura confortável
  dentro do `max-w-3xl`. **Sem** `<h2>` rotulado do tipo "Nossa História".
- Conteúdo ancorado no `PRODUCT.md` (ingredient-forward, espaço e atenção
  generosos, calor sem rusticidade, moldura e não galeria), na voz medida da
  marca. Copy sugerida (placeholder a refinar):
  - _"Âmbar nasceu de uma ideia simples: um bom jantar pede tempo. Trabalhamos
    com o que a estação oferece e servimos cada prato quando ele está pronto — o
    menu muda com os ingredientes, não com o calendário."_
  - _"A sala foi desenhada para a conversa. Luz baixa e quente, distância
    confortável entre as mesas, o ritmo de uma refeição inteira sem interrupção.
    A cozinha é o protagonista; o resto é moldura."_

## 4. Bloco prático (informações)

- Precedido por uma divisória fina: `border-t border-stone/20`.
- Lista de definição semântica (`<dl>`), pares `<dt>`/`<dd>`. Rótulos (`<dt>`) em
  `text-stone font-body`; valores (`<dd>`) em `text-ivory`, com as **partes
  numéricas em `font-mono`** (horário e telefone) — mono é reservado a números.
- Placeholders:
  - Horários — `Terça a sábado, 19h–23h`
  - Endereço — `Rua Exemplo, 000 · Bairro, Cidade`
  - Reservas — `(11) 0000-0000 · reservas@ambar.com.br`

## 5. CTA de reserva

- Um `Link` do `react-router` (`to="/reservas"`) com o estilo dos links `brass`
  já usados em `FeaturedDish` ("Reservar uma mesa" + seta). Fica ao final da
  página, isolado do bloco prático por espaçamento.
- É o único elemento `brass` da página, respeitando o limite de ≤1–2 acentos por
  viewport. `wine` não é usado.

## 6. Decisões de cor, tipografia e layout (DESIGN.md)

- Cores: apenas `basalt`/`ivory`/`brass`/`stone` (`wine` não usado). `brass` só no
  CTA (e no `:hover` dos links). Sem gradientes, sem hue fora da tabela.
- Tipografia: `font-display` (Fraunces) no `h1`; `font-body` (Work Sans) na prosa,
  lede e rótulos; `font-mono` (IBM Plex Mono) apenas nas partes numéricas do bloco
  prático.
- Layout editorial: sem cards com sombra, sem grid boxed; separação por espaço
  negativo (`space-y-16`) e uma divisória fina `stone/20`.
- Spotlight: exatamente **um** por página (o hero), conforme a regra do
  design system.

## 7. Motion, impressão e acessibilidade

- Motion: só o fade+scale do `Spotlight`; `prefers-reduced-motion` já coberto pelo
  CSS global (`spotlight-in-reduced` mantém o fade e remove o scale). Sem
  scroll-reveal por elemento.
- Impressão: já tratada pelo `@media print` global em `styles/globals.css`
  (fundo claro, texto basalt, remove a margem da sidebar) — nenhuma regra nova.
- A11y: `<h1>` único; `<dl>` semântico para as informações; anel de foco `brass`
  global no CTA; `alt` da foto escrito na voz da marca (não "foto do
  restaurante"). Alvo WCAG AA.

## 8. Testes

- Smoke test de render no padrão de `pages/MenuItemDetail.test.tsx`: a página
  monta, exibe a frase de posicionamento (não a palavra "Sobre" como header
  genérico), o bloco prático e um link para `/reservas`.

## 9. Responsividade (nota, não implementação completa)

Desktop é o alvo principal, como nas changes anteriores. O `max-w-3xl` centrado e
a coluna única já degradam de forma razoável em telas estreitas; ajuste fino de
mobile fica registrado como trabalho futuro, não bloqueante.
