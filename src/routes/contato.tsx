import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { Instagram, Phone, Mail, MessageCircle } from "lucide-react";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Vortis Gestão" },
      { name: "description", content: "Fale com a Vortis Gestão pelo WhatsApp, Instagram ou envie sua mensagem." },
      { property: "og:title", content: "Contato — Vortis Gestão" },
      { property: "og:description", content: "Fale com a nossa equipe e transforme sua ideia em resultados." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contato,
});

function Contato() {
  const [form, setForm] = useState({ nome: "", whatsapp: "", email: "", mensagem: "" });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = `Olá Vortis! Meu nome é ${form.nome}.%0A%0A${form.mensagem}%0A%0AContato: ${form.whatsapp} · ${form.email}`;
    const url = `https://wa.me/5591996316518?text=${text}`;
    const gtag = (window as any).gtag;
    if (typeof gtag === "function") {
      gtag("event", "click_whatsapp", {
        event_category: "engagement",
        link_url: url,
        location: "/contato#form",
      });
    }
    window.open(url, "_blank");
  }

  return (
    <>
      <section className="relative border-b border-border/60">
        <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <span className="inline-block rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-accent">
            Contato
          </span>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
            Vamos <span className="text-primary">conversar</span>?
          </h1>
          <p className="mt-4 max-w-2xl text-muted-foreground">
            Preencha o formulário ou fale direto no WhatsApp — respondemos rápido para tirar seu projeto do papel.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <form onSubmit={onSubmit} className="rounded-3xl border border-border bg-card p-8">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium">Nome</span>
                <input required value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent" />
              </label>
              <label className="block">
                <span className="text-sm font-medium">WhatsApp</span>
                <input required value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                  placeholder="(91) 90000-0000"
                  className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent" />
              </label>
            </div>
            <label className="mt-4 block">
              <span className="text-sm font-medium">E-mail</span>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent" />
            </label>
            <label className="mt-4 block">
              <span className="text-sm font-medium">Mensagem</span>
              <textarea required rows={5} value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                placeholder="Me conte sobre o seu projeto..."
                className="mt-1.5 w-full rounded-md border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-accent" />
            </label>
            <button type="submit"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-orange hover:opacity-90 sm:w-auto">
              <MessageCircle className="h-4 w-4" /> Enviar pelo WhatsApp
            </button>
          </form>

          <div className="space-y-4">
            <a href="https://wa.me/5591996316518" target="_blank" rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-accent/60 hover:shadow-glow">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                <Phone className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</div>
                <div className="font-display text-lg font-bold">(91) 99631-6518</div>
              </div>
            </a>
            <a href="https://wa.me/5591996127952" target="_blank" rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-accent/60 hover:shadow-glow">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                <Phone className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">WhatsApp</div>
                <div className="font-display text-lg font-bold">(91) 99612-7952</div>
              </div>
            </a>
            <a href="https://instagram.com/vortis.gestao" target="_blank" rel="noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-primary/60 hover:shadow-orange">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                <Instagram className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">Instagram</div>
                <div className="font-display text-lg font-bold">@vortis.gestao</div>
              </div>
            </a>
            <a href="mailto:contato@vortisgestao.com"
              className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition hover:border-accent/60 hover:shadow-glow">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent">
                <Mail className="h-6 w-6" />
              </div>
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">E-mail</div>
                <div className="font-display text-lg font-bold">contato@vortisgestao.com</div>
              </div>
            </a>
          </div>
        </div>
      </Section>
    </>
  );
}
