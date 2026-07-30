#!/usr/bin/env node
/**
 * Prerender estático: renderiza cada rota usando o bundle de servidor gerado
 * pelo build e grava o HTML dentro de dist/client, para hospedagem 100%
 * estática (Nginx servindo arquivos, sem Node em produção).
 *
 * Uso: npm run build:static
 */
import { mkdirSync, writeFileSync, existsSync, cpSync } from "node:fs";
import { join, dirname } from "node:path";
import { pathToFileURL } from "node:url";

const ROUTES = ["/", "/sobre", "/servicos", "/contato"];

const ROOT = process.cwd();
const CLIENT_DIR = join(ROOT, "dist", "client");
const SERVER_ENTRIES = [
  join(ROOT, "dist", "server", "index.mjs"),
  join(ROOT, ".output", "server", "index.mjs"),
  join(ROOT, ".output", "server", "index.js"),
];
const PUBLIC_DIRS = [
  join(ROOT, "dist", "public"),
  join(ROOT, ".output", "public"),
];
const SERVER_ENTRY = SERVER_ENTRIES.find(existsSync);

if (!SERVER_ENTRY) {
  console.error("✖ Bundle do servidor não encontrado após o vite build.");
  console.error(`  Locais verificados: ${SERVER_ENTRIES.join(", ")}`);
  process.exit(1);
}

// Normaliza a saída do Vite/Nitro: tudo que será publicado fica em dist/client.
// Preserva assets que o Vite já tenha gravado diretamente em dist/client.
mkdirSync(CLIENT_DIR, { recursive: true });
for (const publicDir of PUBLIC_DIRS) {
  if (existsSync(publicDir)) {
    cpSync(publicDir, CLIENT_DIR, { recursive: true });
    console.log(`✔ Assets copiados de ${publicDir.replace(ROOT + "/", "")} para dist/client`);
  }
}

const app = (await import(pathToFileURL(SERVER_ENTRY).toString())).default;

// Contexto mínimo esperado pelo runtime (Cloudflare-style fetch handler).
const env = {};
const ctx = { waitUntil() {}, passThroughOnException() {} };

let failed = false;

for (const route of ROUTES) {
  const res = await app.fetch(new Request(`http://localhost${route}`), env, ctx);
  const html = await res.text();

  if (res.status !== 200 || !html.includes("<html")) {
    console.error(`✖ ${route} -> HTTP ${res.status}`);
    failed = true;
    continue;
  }

  const outFile =
    route === "/"
      ? join(CLIENT_DIR, "index.html")
      : join(CLIENT_DIR, route.replace(/^\//, ""), "index.html");

  mkdirSync(dirname(outFile), { recursive: true });
  writeFileSync(outFile, html);
  console.log(`✔ ${route} -> ${outFile.replace(ROOT + "/", "")} (${(html.length / 1024).toFixed(1)} kB)`);
}

if (failed) process.exit(1);

// Fallback para rotas desconhecidas (Nginx: try_files ... /404.html)
cpSync(join(CLIENT_DIR, "index.html"), join(CLIENT_DIR, "404.html"));

console.log("✅ Prerender concluído em dist/client");
