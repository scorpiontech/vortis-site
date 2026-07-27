import { createFileRoute } from "@tanstack/react-router";
import { Sparkles, ShieldCheck, Rocket, Gauge, TrendingUp } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import mascot from "@/assets/vortis-mascot.png";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre a Vortis Gestão — Quem somos e nossos pilares" },
      { name: "description", content: "Conheça a Vortis Gestão: tecnologia, inovação e resultados para transformar o seu negócio." },
      { property: "og:title", content: "Sobre a Vortis Gestão" },
      { property: "og:description", content: "Inovação, segurança, eficiência, controle e produtividade — os pilares que guiam nosso trabalho." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/sobre" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: Sobre,
});

const pilares = [
  { icon: Sparkles, text: "Inovação contínua em cada solução desenvolvida para sua empresa." },
  { icon: ShieldCheck, text: "Segurança e confiabilidade em todos os processos e dados do negócio." },
  { icon: Gauge, text: "Eficiência operacional com tecnologia de ponta e alta performance." },
  { icon: Rocket, text: "Controle total da gestão empresarial na palma da sua mão." },
  { icon: TrendingUp, text: "Produtividade e crescimento sustentável para o seu negócio." },
];

function Sobre() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_1.2fr] lg:py-24 lg:px-8">
          <div className="relative flex justify-center">
            <div className="absolute inset-0 -z-10 mx-auto h-80 w-80 rounded-full bg-accent/30 blur-3xl" aria-hidden />
            <img src={mascot} alt="Mascote Vortis" width={1024} height={1280} loading="lazy" className="w-64 sm:w-80 lg:w-[380px]" />
          </div>
          <div>
            <span className="inline-block rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
              Quem Somos
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
              Quem <span className="text-accent">Somos</span>.
            </h1>
            <p className="mt-6 text-base text-muted-foreground sm:text-lg">
              A Vortis Gestão nasceu para transformar a tecnologia em uma aliada estratégica para empresas.
              Desenvolvemos soluções inteligentes, seguras e completas que automatizam processos,
              aumentam a produtividade e impulsionam o crescimento dos nossos clientes.
            </p>
            <p className="mt-4 text-base text-muted-foreground sm:text-lg">
              Mais do que fornecer tecnologia, entregamos <span className="text-accent-glow">inovação</span>,{" "}
              <span className="text-accent-glow">confiança</span> e{" "}
              <span className="text-primary">resultados</span>.
            </p>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="O que nos guia"
          title={<>Nossos <span className="text-accent">Pilares</span></>}
          description="Cinco compromissos que sustentam cada projeto que entregamos."
        />
        <div className="mx-auto mt-14 grid max-w-4xl gap-4">
          {pilares.map((p, i) => (
            <div
              key={i}
              className="group grid grid-cols-[auto_minmax(0,1fr)] items-center gap-5 rounded-2xl border border-border bg-card p-5 transition hover:border-accent/60 hover:shadow-glow"
            >
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl border border-accent/40 bg-accent/10 text-accent">
                <p.icon className="h-6 w-6" />
              </div>
              <p className="text-base text-foreground/90 sm:text-lg">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="grid gap-6 rounded-3xl border border-border bg-surface/40 p-10 text-center sm:grid-cols-3">
          {[
            { k: "100%", v: "Online e acessível" },
            { k: "24/7", v: "Suporte contínuo" },
            { k: "∞", v: "Possibilidades" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-display text-4xl font-bold text-primary sm:text-5xl">{s.k}</div>
              <div className="mt-2 text-sm text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
