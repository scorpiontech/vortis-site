import { createFileRoute } from "@tanstack/react-router";
import {
  Globe, Smartphone, Rocket, ShieldCheck, Cloud, Lock, MousePointerClick, Headphones,
  BarChart3, Users, Package, Wallet, Handshake, FileText, Wrench, Settings, LineChart,
  MessageCircle,
} from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";

export const Route = createFileRoute("/servicos")({
  head: () => ({
    meta: [
      { title: "Serviços — Vortis Gestão" },
      { name: "description", content: "Sites, aplicativos personalizados e sistema de gestão comercial completo para empresas." },
      { property: "og:title", content: "Serviços da Vortis Gestão" },
      { property: "og:description", content: "Sites, apps e sistema de gestão comercial completo." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/servicos" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/servicos" }],
  }),
  component: Servicos,
});

const WHATS = "https://wa.me/5591996316518?text=Ol%C3%A1%20Vortis%2C%20quero%20contratar%20um%20servi%C3%A7o.";

const desenvolvimento = [
  { icon: Globe, title: "Sites Profissionais", desc: "Seja encontrado, transmita confiança e conquiste mais clientes com sites rápidos, responsivos e otimizados para SEO." },
  { icon: Smartphone, title: "Aplicativos Personalizados", desc: "Soluções sob medida para otimizar processos, engajar clientes e melhorar resultados." },
  { icon: Rocket, title: "Tecnologia e Desempenho", desc: "Projetos modernos com alta performance, escaláveis e prontos para crescer com o seu negócio." },
  { icon: ShieldCheck, title: "Segurança e Suporte", desc: "Soluções seguras, backups e suporte contínuo para você focar no que importa." },
];

const funcionalidades = [
  { icon: BarChart3, title: "Dashboard", desc: "Visão completa do seu negócio em tempo real." },
  { icon: Users, title: "Clientes", desc: "Cadastre, acompanhe e gerencie seus clientes com facilidade." },
  { icon: Package, title: "Estoque", desc: "Controle de produtos, entradas, saídas e movimentações." },
  { icon: Wallet, title: "Financeiro", desc: "Contas a pagar e receber, fluxo de caixa e conciliações." },
  { icon: Handshake, title: "Fornecedores", desc: "Gestão completa de fornecedores e compras." },
  { icon: FileText, title: "Notas Fiscais", desc: "Emissão de NF-e, NFS-e e controle fiscal completo." },
  { icon: Wrench, title: "Ordens de Serviço", desc: "Abertura, acompanhamento e controle de serviços." },
  { icon: LineChart, title: "Relatórios", desc: "Relatórios inteligentes para decisões estratégicas." },
  { icon: Settings, title: "Configurações", desc: "Personalize o sistema de acordo com sua necessidade." },
];

const diferenciais = [
  { icon: Cloud, title: "100% Online", desc: "Acesse de qualquer lugar, a qualquer hora." },
  { icon: Lock, title: "Seguro e Confiável", desc: "Seus dados protegidos com tecnologia de ponta." },
  { icon: MousePointerClick, title: "Fácil de Usar", desc: "Interface intuitiva e simples para o dia a dia." },
  { icon: Headphones, title: "Suporte Especializado", desc: "Equipe pronta para te atender sempre." },
];

function Servicos() {
  return (
    <>
      {/* HERO */}
      <section className="relative border-b border-border/60">
        <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
            Serviços
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Soluções digitais que <span className="text-primary">impulsionam</span> resultados.
          </h1>
          <p className="mt-5 max-w-2xl text-muted-foreground">
            Desenvolvimento sob medida e um sistema de gestão comercial completo — tudo pensado para o seu crescimento.
          </p>
        </div>
      </section>

      {/* DESENVOLVIMENTO */}
      <Section>
        <SectionHeading
          eyebrow="Sites & Aplicativos"
          title={<>Presença digital que <span className="text-accent">converte</span></>}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {desenvolvimento.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card p-8 transition hover:border-accent/60 hover:shadow-glow">
              <div className="mb-4 grid h-12 w-12 place-items-center rounded-xl bg-accent/15 text-accent">
                <s.icon className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* SISTEMA DE GESTÃO */}
      <section className="border-y border-border/60 bg-surface/30">
        <Section>
          <SectionHeading
            eyebrow="Sistema de Gestão"
            title={<>Sistema de Gestão <span className="text-primary">Comercial</span></>}
            description="A solução completa para gerenciar sua empresa com mais controle, eficiência e resultados."
          />
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {funcionalidades.map((f) => (
              <div key={f.title} className="rounded-2xl border border-border bg-background/70 p-6 transition hover:border-primary/50">
                <div className="mb-3 grid h-11 w-11 place-items-center rounded-lg border border-primary/40 bg-primary/10 text-primary">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-bold uppercase tracking-wide">{f.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-3xl border border-accent/30 bg-background/70 p-8 sm:p-10">
            <h3 className="font-display text-2xl font-bold sm:text-3xl">
              Mais organização. Mais controle. <span className="text-primary">Mais crescimento</span> para o seu negócio!
            </h3>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {diferenciais.map((d) => (
                <div key={d.title} className="flex gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent">
                    <d.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display text-sm font-bold uppercase tracking-wide">{d.title}</div>
                    <div className="mt-1 text-xs text-muted-foreground">{d.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </section>

      {/* CTA */}
      <Section>
        <div className="rounded-3xl border border-border bg-gradient-to-br from-surface to-background p-10 text-center sm:p-14">
          <h3 className="font-display text-3xl font-bold sm:text-4xl">
            Vamos transformar sua ideia em <span className="text-primary">resultados reais?</span>
          </h3>
          <a
            href={WHATS}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-orange hover:opacity-90"
          >
            <MessageCircle className="h-4 w-4" /> Fale com a gente
          </a>
        </div>
      </Section>
    </>
  );
}
