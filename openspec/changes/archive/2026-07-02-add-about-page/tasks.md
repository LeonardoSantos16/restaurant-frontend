# Tasks: add-about-page

## 1. Asset de atmosfera

- [x] 1.1 Garantir uma imagem de ambiente/sala para o hero (asset em `public/` ou
      `src/assets/`); usar placeholder existente se não houver foto real ainda
      → criado `public/placeholder-room.svg` (mesmo estilo do `placeholder-dish.svg`)

## 2. Página Sobre

- [x] 2.1 Reescrever `pages/About.tsx` com o shell padrão
      (`mx-auto max-w-3xl space-y-16 px-6 py-12`), sem hooks de dados
- [x] 2.2 Hero: `<Spotlight size="hero">` (foto de ambiente, `alt` em voz de
      marca) + frase de posicionamento como `<h1>` (`text-display-xl font-display`,
      não a palavra "Sobre") + lede curto em `stone`, no padrão `FeaturedDish`
- [x] 2.3 Prosa: 2–3 `<p>` (`text-body-lg font-body text-pretty`) de filosofia,
      sem `<h2>` rotulado ("Nossa História")
- [x] 2.4 Bloco prático: `border-t border-stone/20` + `<dl>` com horários,
      endereço e contato (rótulos `stone`; partes numéricas em `font-mono`),
      valores placeholder
- [x] 2.5 CTA: `<Link to="/reservas">` estilo link `brass` de `FeaturedDish`
      ("Reservar uma mesa"), único acento brass da página

## 3. Testes

- [x] 3.1 `About.test.tsx` (padrão `MenuItemDetail.test.tsx`): a página monta,
      exibe a frase de posicionamento e um link para `/reservas`

## 4. Validação final

- [x] 4.1 `/sobre` mostra hero com spotlight, prosa sem header rotulado, bloco
      prático (mono nos números) e CTA de reserva
- [x] 4.2 Só tokens do design system (brass apenas no CTA; wine não usado); um
      único spotlight; foco brass no CTA; `prefers-reduced-motion` mantém só o fade
- [x] 4.3 `npm run lint` e `npm run test` passam
