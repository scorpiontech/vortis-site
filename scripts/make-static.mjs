#!/usr/bin/env node
/**
 * Gera um index.html (SPA shell) a partir da saída client do build.
 *
 * O build do TanStack Start entrega apenas os assets em dist/client (o HTML
 * normalmente é montado pelo servidor SSR). Para hospedagem 100% estática no
 * Nginx precisamos de um index.html que carregue o bundle e deixe o router
 * renderizar as rotas no browser.
 */
import { readdirSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const CLIENT_DIR = join(process.cwd(), "dist", "client");
const ASSETS_DIR = join(CLIENT_DIR, "assets");

if (!existsSync(ASSETS_DIR)) {
  console.error("✖ dist/client/assets não encontrado. Rode `npm run build` antes.");
  process.exit(1);
}

const files = readdirSync(ASSETS_DIR);
const entryJs = files.find((f) => /^index-.*\.js$/.test(f));
const cssFiles = files.filter((f) => f.endsWith(".css"));

if (!entryJs) {
  console.error("✖ Bundle de entrada (assets/index-*.js) não encontrado.");
  process.exit(1);
}

const TITLE = "Vortis Gestão — Sites, Apps e Sistema de Gestão Comercial";
const DESCRIPTION =
  "Vortis Gestão: sites profissionais, apps sob medida e sistema de gestão comercial com segurança, performance e suporte.";

const html = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${TITLE}</title>
    <meta name="description" content="${DESCRIPTION}" />
    <meta property="og:title" content="${TITLE}" />
    <meta property="og:description" content="${DESCRIPTION}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Vortis Gestão" />
    <meta property="og:locale" content="pt_BR" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" href="/favicon.ico" />
${cssFiles.map((f) => `    <link rel="stylesheet" href="/assets/${f}" />`).join("\n")}
    <script type="module" src="/assets/${entryJs}"></script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

writeFileSync(join(CLIENT_DIR, "index.html"), html);
copyFileSync(join(CLIENT_DIR, "index.html"), join(CLIENT_DIR, "404.html"));

console.log(`✔ dist/client/index.html gerado (entry: ${entryJs}, css: ${cssFiles.join(", ") || "nenhum"})`);
