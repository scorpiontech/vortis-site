#!/usr/bin/env bash
# =============================================================================
# Vortis Gestão — Deploy de site ESTÁTICO (React/Vite + prerender)
# =============================================================================
# Arquitetura esperada no servidor:
#   /var/www/<site>/repo                  <- git clone deste repositório
#   /var/www/<site>/app                   <- arquivos publicados (HTML/CSS/JS)
#
# Uso:
#   sudo -u www-data bash deploy/deploy.sh
#
# Variáveis de ambiente aceitas:
#   SITE_DIR   (default: /var/www/vortis)
#   BRANCH     (default: main)
# =============================================================================
set -euo pipefail

SITE_DIR="${SITE_DIR:-/var/www/vortis}"
BRANCH="${BRANCH:-main}"

REPO_DIR="${REPO_DIR:-$SITE_DIR/repo}"
APP_DIR="$SITE_DIR/app"
STAGING_DIR="$SITE_DIR/app.new"
BACKUP_DIR="$SITE_DIR/app.previous"

echo "▶ Deploy Vortis (estático)  |  site=$SITE_DIR  repo=$REPO_DIR  branch=$BRANCH"

mkdir -p "$SITE_DIR"

# 1) Localizar o .git (aceita subpasta criada pelo clone)
if [ ! -d "$REPO_DIR/.git" ]; then
  FOUND_GIT="$(find "$REPO_DIR" -maxdepth 3 -type d -name .git -print -quit 2>/dev/null || true)"
  if [ -n "$FOUND_GIT" ]; then
    REPO_DIR="$(dirname "$FOUND_GIT")"
    echo "▶ .git detectado em: $REPO_DIR"
  else
    echo "✖ Repositório git não encontrado a partir de $REPO_DIR." >&2
    exit 1
  fi
fi

cd "$REPO_DIR"

# Evita "detected dubious ownership" quando o repo pertence a outro usuário (ex.: www-data)
git config --global --get-all safe.directory 2>/dev/null | grep -qx "$REPO_DIR" || \
  git config --global --add safe.directory "$REPO_DIR"

echo "▶ git fetch/reset origin/$BRANCH"
git fetch --prune origin
git reset --hard "origin/$BRANCH"
git clean -fd

# 2) Localizar package.json
BUILD_DIR="$REPO_DIR"
if [ ! -f "$BUILD_DIR/package.json" ]; then
  FOUND_PKG="$(find "$REPO_DIR" -maxdepth 3 -type f -name package.json -not -path '*/node_modules/*' -print -quit 2>/dev/null || true)"
  if [ -n "$FOUND_PKG" ]; then
    BUILD_DIR="$(dirname "$FOUND_PKG")"
    echo "▶ package.json em: $BUILD_DIR"
  else
    echo "✖ package.json não encontrado em $REPO_DIR." >&2
    exit 1
  fi
fi

cd "$BUILD_DIR"

# 3) Instalar dependências e buildar (saída estática em dist/client)
# O projeto usa bun.lock. Se bun existir, usamos bun; senão npm (ci só com package-lock.json).
if command -v bun >/dev/null 2>&1; then
  echo "▶ bun install --frozen-lockfile"
  bun install --frozen-lockfile || bun install
  RUN="bun run"
else
  if [ -f package-lock.json ]; then
    echo "▶ npm ci"
    npm ci --no-audit --no-fund
  else
    echo "▶ package-lock.json ausente — usando npm install"
    npm install --no-audit --no-fund
  fi
  RUN="npm run"
fi

echo "▶ $RUN build:static"
rm -rf dist
$RUN build:static

DIST_DIR="dist/client"
if [ ! -f "$DIST_DIR/index.html" ]; then
  echo "✖ Build falhou: $DIST_DIR/index.html não existe." >&2
  exit 1
fi

FILE_COUNT="$(find "$DIST_DIR" -type f | wc -l)"
echo "✔ Build concluído: $BUILD_DIR/$DIST_DIR ($FILE_COUNT arquivos)"

# 4) Copiar para uma pasta temporária e trocar a pasta app de forma atômica.
# O Nginx sempre continua enxergando uma pasta completa, nunca uma cópia parcial.
echo "▶ copiando arquivos para $STAGING_DIR"
rm -rf "$STAGING_DIR"
mkdir -p "$STAGING_DIR"
cp -a "$DIST_DIR"/. "$STAGING_DIR/"

if [ ! -f "$STAGING_DIR/index.html" ]; then
  echo "✖ Cópia falhou: $STAGING_DIR/index.html não existe." >&2
  exit 1
fi

echo "▶ publicando em $APP_DIR"
rm -rf "$BACKUP_DIR"
if [ -e "$APP_DIR" ] || [ -L "$APP_DIR" ]; then
  mv -T "$APP_DIR" "$BACKUP_DIR"
fi
mv -T "$STAGING_DIR" "$APP_DIR"
echo "✔ $APP_DIR atualizado ($FILE_COUNT arquivos)"

# 6) Recarregar Nginx (opcional; site é estático, sem serviço Node)
if command -v nginx >/dev/null 2>&1; then
  sudo nginx -t >/dev/null 2>&1 && sudo systemctl reload nginx || \
    echo "⚠ Não consegui recarregar o Nginx (sem sudo?). Não é obrigatório."
fi

echo "✅ Deploy concluído: $APP_DIR"
