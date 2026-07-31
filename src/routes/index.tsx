import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Globe, Smartphone, Rocket, ShieldCheck, ArrowRight, MessageCircle,
  BarChart3, Users, Package, Wallet, Handshake, FileText, Wrench, Settings, LineChart,
  ShieldCheck as ShieldIcon, TrendingUp, Zap, Lock,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import mascot from "@/assets/vortis-mascot.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vortis Gestão — Sites, apps e sistema de gestão comercial" },
      { name: "description", content: "Desenvolvemos sites e aplicativos modernos e um sistema de gestão comercial completo para impulsionar o seu negócio." },
      { property: "og:title", content: "Vortis Gestão — Tecnologia que impulsiona resultados" },
      { property: "og:description", content: "Sites, apps e sistema de gestão sob medida para empresas que querem crescer." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vortisgestao.com.br/" },
      { property: "og:image", content: "https://vortisgestao.com.br/og-vortis.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Mascote e logo da Vortis Gestão com a frase Tecnologia que impulsiona resultados" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Vortis Gestão — Tecnologia que impulsiona resultados" },
      { name: "twitter:description", content: "Sites, apps e sistema de gestão sob medida para empresas que querem crescer." },
      { name: "twitter:image", content: "https://vortisgestao.com.br/og-vortis.jpg" },
    ],
    links: [{ rel: "canonical", href: "https://vortisgestao.com.br/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Vortis Gestão",
          url: "https://vortisgestao.com.br/",
          inLanguage: "pt-BR",
philosophy: undefined,
        }),
      },
    ],
  }),

  component: Home,
});

const WHATS = "https://wa.me/5591996316518?text=Ol%C3%A1%20Vortis%2C%20quero%20um%20or%C3%A7amento.";

const pillars = [
  { icon: ShieldIcon, title: "Mais Controle", desc: "em cada processo" },
  { icon: TrendingUp, title: "Mais Eficiência", desc: "no seu negócio" },
  { icon: Lock, title: "Mais Segurança", desc: "para suas informações" },
  { icon: Zap, title: "Mais Crescimento", desc: "para o seu futuro" },
];

const services = [
  { icon: Globe, title: "Sites Profissionais", desc: "Seja encontrado, transmita confiança e conquiste mais clientes." },
  { icon: Smartphone, title: "Aplicativos Personalizados", desc: "Soluções sob medida para otimizar processos e melhorar resultados." },
  { icon: Rocket, title: "Tecnologia e Desempenho", desc: "Projetos modernos, responsivos e com alta performance." },
  { icon: ShieldCheck, title: "Segurança e Suporte", desc: "Soluções seguras e suporte contínuo para o seu crescimento." },
];

const sistemaFeatures = [
  { icon: BarChart3, label: "Dashboard" },
  { icon: Users, label: "Clientes" },
  { icon: Package, label: "Estoque" },
  { icon: Wallet, label: "Financeiro" },
  { icon: Handshake, label: "Fornecedores" },
  { icon: FileText, label: "Notas Fiscais" },
  { icon: Wrench, label: "Ordens de Serviço" },
  { icon: LineChart, label: "Relatórios" },
  { icon: Settings, label: "Configurações" },
];

function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-accent/20 blur-3xl" aria-hidden />
        <div className="absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full bg-primary/10 blur-3xl" aria-hidden />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:py-24 lg:px-8">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Vortis Gestão
            </span>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              SITES E APPS QUE{" "}
              <span className="text-primary">IMPULSIONAM</span> O SEU{" "}
              <span className="text-primary">NEGÓCIO!</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg">
              Desenvolvemos sites e aplicativos <span className="text-accent-glow">modernos</span>,{" "}
              <span className="text-accent-glow">rápidos</span> e{" "}
              <span className="text-accent-glow">personalizados</span> para transformar ideias em soluções digitais de sucesso.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={WHATS}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-orange transition hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" /> Fale com a gente
              </a>
              <Link
                to="/servicos"
                className="inline-flex items-center gap-2 rounded-md border border-accent/60 bg-accent/10 px-6 py-3 text-sm font-semibold text-foreground transition hover:bg-accent/20"
              >
                Nossos serviços <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute inset-0 -z-10 mx-auto h-80 w-80 rounded-full bg-accent/30 blur-3xl" aria-hidden />
            <img
              src={mascot}
              alt="Mascote Vortis"
              width={1024}
              height={1280}
              className="relative w-64 max-w-full drop-shadow-[0_20px_60px_rgba(59,130,246,0.35)] sm:w-80 lg:w-[420px]"
            />
          </div>
        </div>
      </section>

      {/* PILLARS STRIP */}
      <section className="border-y border-border/60 bg-surface/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
          {pillars.map((p) => (
            <div key={p.title} className="flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-accent/40 bg-accent/10 text-accent">
                <p.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <div className="font-display text-sm font-bold uppercase tracking-wide">{p.title}</div>
                <div className="text-xs text-muted-foreground">{p.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <Section id="servicos">
        <SectionHeading
          eyebrow="O que fazemos"
          title={<>Tecnologia que <span className="text-primary">conecta</span>.<br />Soluções que <span className="text-accent">transformam</span>.</>}
          description="Do primeiro clique ao resultado final. Entregamos experiências digitais completas."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => (
            <div
              key={s.title}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition hover:-translate-y-1 hover:border-accent/60 hover:shadow-glow"
            >
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* SISTEMA DE GESTÃO */}
      <section className="relative border-y border-border/60 bg-surface/30">
        <Section className="!py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-block rounded-full border border-primary/50 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                Nosso Sistema
              </span>
              <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
                Sistema de <span className="text-primary">Gestão Comercial</span>
              </h2>
              <p className="mt-4 text-muted-foreground">
                A solução completa para gerenciar sua empresa com mais controle, eficiência e resultados. Tudo em um só lugar, 100% online.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-3">
                {sistemaFeatures.map((f) => (
                  <div key={f.label} className="flex flex-col items-center gap-2 rounded-lg border border-border bg-background/60 p-3 text-center">
                    <f.icon className="h-5 w-5 text-accent" />
                    <span className="text-xs font-medium">{f.label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  to="/servicos"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-orange hover:opacity-90"
                >
                  Conhecer o sistema <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 -z-10 rounded-3xl bg-accent/20 blur-3xl" aria-hidden />
              <div className="rounded-2xl border border-accent/30 bg-background/80 p-4 shadow-glow backdrop-blur">
                <div className="mb-3 flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                  <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                  <div className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
                  <div className="ml-2 text-xs text-muted-foreground">Dashboard · Vortis</div>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[
                    { label: "Vendas", value: "R$ 125.430", diff: "+12,5%" },
                    { label: "Recebimentos", value: "R$ 85.250", diff: "+8,7%" },
                    { label: "Despesas", value: "R$ 32.160", diff: "-4,3%" },
                    { label: "Pedidos", value: "156", diff: "+15,3%" },
                  ].map((k) => (
                    <div key={k.label} className="rounded-lg border border-border bg-surface p-3">
                      <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{k.label}</div>
                      <div className="mt-1 font-display text-base font-bold">{k.value}</div>
                      <div className="text-[10px] text-accent">{k.diff}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-border bg-surface p-4">
                    <div className="text-xs text-muted-foreground">Vendas x Mês</div>
                    <div className="mt-3 flex h-24 items-end gap-1">
                      {[30, 45, 38, 60, 55, 72, 48, 66, 80, 58, 90, 74].map((h, i) => (
                        <div key={i} className="flex-1 rounded-sm bg-gradient-to-t from-accent/40 to-accent" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                  </div>
                  <div className="rounded-lg border border-border bg-surface p-4">
                    <div className="text-xs text-muted-foreground">Categorias</div>
                    <div className="mt-4 grid place-items-center">
                      <div
                        className="h-24 w-24 rounded-full"
                        style={{
                          background:
                            "conic-gradient(var(--accent) 0 45%, var(--primary) 45% 70%, oklch(0.6 0.18 300) 70% 88%, oklch(0.7 0.14 200) 88% 100%)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>
      </section>

      {/* PLANO À REALIDADE */}
      <Section>
        <div className="bracket-frame relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-surface via-background to-surface p-10 text-center sm:p-14">
          <Rocket className="mx-auto h-10 w-10 text-accent" />
          <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
            DO PLANO À REALIDADE, <span className="text-primary">NÓS DESENVOLVEMOS!</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Mais visibilidade, mais conexão, mais resultados para o seu negócio.
          </p>
          <a
            href={WHATS}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-orange hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" /> Começar meu projeto
          </a>
        </div>
      </Section>

      {/* CTA FINAL */}
      <Section className="!pt-0">
        <div className="rounded-3xl border border-border bg-surface/50 p-10 text-center">
          <h3 className="font-display text-2xl font-bold sm:text-3xl">
            VAMOS TRANSFORMAR SUA IDEIA EM <span className="text-primary">RESULTADOS REAIS?</span>
          </h3>
          <p className="mt-3 text-sm uppercase tracking-widest text-accent">— Fale com a gente —</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-6 text-sm">
            <a href="https://wa.me/5591996316518" className="rounded-md border border-border bg-background px-4 py-2 hover:border-accent">(91) 99631-6518</a>
            <a href="https://wa.me/5591996127952" className="rounded-md border border-border bg-background px-4 py-2 hover:border-accent">(91) 99612-7952</a>
            <a href="https://instagram.com/vortis.gestao" target="_blank" rel="noreferrer" className="rounded-md border border-border bg-background px-4 py-2 hover:border-accent">@vortis.gestao</a>
          </div>
        </div>
      </Section>
    </>
  );
}
