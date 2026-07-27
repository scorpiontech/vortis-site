
# Website Vortis Gestão

Site institucional responsivo em português, com estética tecnológica dark (azul profundo + acentos laranja), inspirado nos materiais de marca enviados (logo, mascote robô, banners).

## Identidade visual

- **Paleta**: fundo azul-marinho profundo (#0A1533 / #0F1B3D), superfícies em navy translúcido, texto branco/cinza claro, acentos azul elétrico (#3B82F6 / #1E90FF) e laranja vibrante (#F97316) para CTAs e destaques de palavras-chave.
- **Tipografia**: headings em Space Grotesk (peso 700/900, bem impactante como nos banners); corpo em Inter.
- **Elementos**: grids sutis, brilhos/glows azuis, cantos com molduras em colchetes ([ ]) como no banner "Tecnologia que impulsiona resultados", cards com borda fina e leve glassmorphism.
- **Logo e mascote**: uso do logo Vortis Gestão no header/footer e do mascote robô no hero e seção "Quem Somos".

## Estrutura (single-page com âncoras + rotas separadas para SEO)

Rotas TanStack:
- `/` — Home
- `/sobre` — Quem Somos + Nossos Pilares
- `/servicos` — Sites & Apps + Sistema de Gestão Comercial
- `/contato` — Formulário + canais

Header fixo com logo + navegação (Início, Sobre, Serviços, Contato) + botão laranja "Fale Conosco". Footer com logo, contatos e Instagram.

### Home (`/`)
1. **Hero**: título "SITES E APPS QUE IMPULSIONAM O SEU NEGÓCIO!" (com "IMPULSIONAM" e "NEGÓCIO" em laranja), subtítulo, CTAs "Fale com a gente" (laranja) e "Nossos serviços". Mascote robô à direita com glow azul.
2. **Faixa de pilares** (4 ícones): Mais Controle · Mais Eficiência · Mais Segurança · Mais Crescimento.
3. **Serviços resumidos** (4 cards): Sites Profissionais, Aplicativos Personalizados, Tecnologia e Desempenho, Segurança e Suporte.
4. **Destaque Sistema de Gestão Comercial**: card grande com mockup ilustrativo + lista curta de funcionalidades + CTA "Conhecer o sistema".
5. **Bloco "Do plano à realidade, nós desenvolvemos"** com CTA.
6. **CTA final**: "Vamos transformar sua ideia em resultados reais?" com telefones e Instagram.

### Sobre (`/sobre`)
- Seção "Quem Somos" (texto do img3) com mascote à esquerda em fundo escuro.
- Seção "Nossos Pilares" (5 pilares do img5): Inovação, Segurança, Eficiência, Controle, Produtividade — em cards verticais com ícone de sparkle.
- Faixa de valores/números (opcional, genérico: projetos entregues, clientes, anos).

### Serviços (`/servicos`)
- **Sites & Aplicativos**: 4 blocos detalhados (Sites Profissionais, Apps Personalizados, Tecnologia & Desempenho, Segurança & Suporte).
- **Sistema de Gestão Comercial**: apresentação da solução com todas as 9 funcionalidades do img2 (Dashboard, Clientes, Estoque, Financeiro, Fornecedores, Notas Fiscais, Ordens de Serviço, Relatórios, Configurações) em grid; abaixo, 4 diferenciais (100% Online, Seguro e Confiável, Fácil de Usar, Suporte Especializado).
- CTA final "Fale com a gente".

### Contato (`/contato`)
- Formulário (Nome, WhatsApp, Email, Mensagem) — apenas frontend, abrindo WhatsApp com mensagem pré-preenchida no submit (sem backend).
- Cards de contato: WhatsApp (91) 99631-6518 e (91) 99612-7952, Instagram @vortis.gestao.
- Ícones grandes clicáveis (WhatsApp / Instagram / Email).

## Responsividade & qualidade

- Mobile-first, grids que colapsam para 1 coluna, header com menu hambúrguer.
- Uso de `grid-cols-[minmax(0,1fr)_auto]` + `min-w-0` + `truncate` em linhas com texto + widget.
- Animações sutis (fade/slide-up on scroll) sem exagero.
- SEO: `head()` único por rota com title/description/OG específicos em português.

## Assets

- Logo enviado (`logo.jpeg`) usado no header/footer.
- Mascote: recortar do banner `img4.jpeg` (ou gerar PNG transparente do robô) para hero e página Sobre.
- Ambos convertidos via `lovable-assets` para CDN.

## Detalhes técnicos

- TanStack Start + Tailwind v4.
- Tokens de cor semânticos definidos em `src/styles.css` (`--background`, `--primary` laranja, `--accent` azul elétrico, superfícies navy) em `:root` — sem hardcode de cores nos componentes.
- Fontes carregadas via `<link>` em `__root.tsx` (Google Fonts: Space Grotesk + Inter).
- Componentes shadcn existentes (Button, Card) reaproveitados; variantes ajustadas via tokens.
- Sem backend / sem Lovable Cloud nesta fase (formulário abre WhatsApp).

## Escopo fora desta entrega

- Backend real de formulário / envio de e-mail.
- Área logada / demo real do sistema de gestão.
- Blog, i18n, integrações de analytics.

Podemos adicionar depois se desejar.
