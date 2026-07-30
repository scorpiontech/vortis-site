#!/usr/bin/env bash
# =============================================================================
# Vortis Gestão — Deploy de site ESTÁTICO (React/Vite + prerender)
# =============================================================================
# Arquitetura esperada no servidor:
#   /var/www/<site>/repo                  <- git clone deste repositório
#   /var/www/<site>/releases/<timestamp>  <- cada build publicado (HTML/CSS/JS)
#   /var/www/<site>/app -> releases/...   <- symlink atômico (root do Nginx)
#
# Uso:
#   sudo -u www-data bash deploy/deploy.sh
#
# Variáveis de ambiente aceitas:
#   SITE_DIR   (default: /var/www/vortis)
#   BRANCH     (default: main)
#   KEEP       número de releases a manter (default: 5)
# =============================================================================
set -euo pipefail

SITE_DIR="${SITE_DIR:-/var/www/vortis}"
BRANCH="${BRANCH:-main}"
KEEP="${KEEP:-5}"

REPO_DIR="${REPO_DIR:-$SITE_DIR/repo}"
APP_LINK="$SITE_DIR/app"
RELEASES_DIR="$SITE_DIR/releases"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
RELEASE_DIR="$RELEASES_DIR/$TIMESTAMP"

echo "▶ Deploy Vortis (estático)  |  site=$SITE_DIR  repo=$REPO_DIR  branch=$BRANCH"

mkdir -p "$RELEASES_DIR"

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

# 3) Instalar dependências e buildar (saída estática em dist/public)
echo "▶ npm ci"
npm ci --no-audit --no-fund

echo "▶ npm run build"
rm -rf dist
npm run build

if [ ! -f "dist/public/index.html" ]; then
  echo "✖ Build falhou: dist/public/index.html não existe." >&2
  exit 1
fi

# 4) Publicar release
echo "▶ publicando release $TIMESTAMP em $RELEASE_DIR"
mkdir -p "$RELEASE_DIR"
cp -a dist/public/. "$RELEASE_DIR/"

# 5) Trocar symlink de forma atômica
if [ -e "$APP_LINK" ] && [ ! -L "$APP_LINK" ]; then
  echo "▶ $APP_LINK é diretório real — removendo para virar symlink"
  rm -rf "$APP_LINK"
fi
ln -sfn "$RELEASE_DIR" "$APP_LINK.new"
mv -Tf "$APP_LINK.new" "$APP_LINK"
echo "▶ $APP_LINK -> $(readlink "$APP_LINK")"

# 6) Recarregar Nginx (opcional; site é estático, sem serviço Node)
if command -v nginx >/dev/null 2>&1; then
  sudo nginx -t >/dev/null 2>&1 && sudo systemctl reload nginx || \
    echo "⚠ Não consegui recarregar o Nginx (sem sudo?). Não é obrigatório."
fi

# 7) Limpar releases antigas
echo "▶ mantendo últimas $KEEP releases"
cd "$RELEASES_DIR"
ls -1t | tail -n +"$((KEEP + 1))" | xargs -r rm -rf

echo "✅ Deploy concluído: $RELEASE_DIR"
