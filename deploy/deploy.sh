#!/usr/bin/env bash
# =============================================================================
# Vortis Gestão — Script de deploy / atualização
# =============================================================================
# Arquitetura esperada no servidor:
#   /var/www/<site>/repo   <- git clone deste repositório
#   /var/www/<site>/app    <- artefato publicado (symlink -> releases/<timestamp>)
#   /var/www/<site>/releases/<timestamp>  <- cada build publicado
#
# Uso:
#   sudo -u www-data bash deploy/deploy.sh
#
# Variáveis de ambiente aceitas:
#   SITE_DIR   (default: /var/www/vortis)
#   BRANCH     (default: main)
#   KEEP       número de releases a manter (default: 5)
#   PORT       porta em que o Node vai escutar (default: 3000)
# =============================================================================
set -euo pipefail

SITE_DIR="${SITE_DIR:-/var/www/vortis}"
BRANCH="${BRANCH:-main}"
KEEP="${KEEP:-5}"
PORT="${PORT:-3000}"

REPO_DIR="${REPO_DIR:-$SITE_DIR/repo}"
APP_LINK="$SITE_DIR/app"
RELEASES_DIR="$SITE_DIR/releases"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
RELEASE_DIR="$RELEASES_DIR/$TIMESTAMP"

echo "▶ Deploy Vortis  |  site=$SITE_DIR  repo=$REPO_DIR  branch=$BRANCH"

# 1) Garantir estrutura
mkdir -p "$RELEASES_DIR"

# 2) Localizar o .git (aceita repo/ com subpasta criada pelo clone)
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

# 3) Localizar package.json (raiz do projeto pode estar em subpasta)
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

# 4) Instalar dependências e buildar
echo "▶ npm ci"
npm ci --no-audit --no-fund

echo "▶ npm run build"
rm -rf dist
npm run build

if [ ! -f "dist/server/index.mjs" ]; then
  echo "✖ Build falhou: dist/server/index.mjs não existe." >&2
  exit 1
fi

# 5) Publicar release (cópia atômica)
echo "▶ publicando release $TIMESTAMP em $RELEASE_DIR"
mkdir -p "$RELEASE_DIR"
cp -a dist/. "$RELEASE_DIR/"

# 6) Trocar symlink de forma atômica.
#    Se $APP_LINK for diretório real (não symlink), remove primeiro pra permitir o swap.
if [ -e "$APP_LINK" ] && [ ! -L "$APP_LINK" ]; then
  echo "▶ $APP_LINK é diretório real — removendo para virar symlink"
  rm -rf "$APP_LINK"
fi
ln -sfn "$RELEASE_DIR" "$APP_LINK.new"
mv -Tf "$APP_LINK.new" "$APP_LINK"
echo "▶ $APP_LINK -> $(readlink "$APP_LINK")"

# 7) Restart do serviço (systemd)
SERVICE_NAME="${SERVICE_NAME:-vortis.service}"
if systemctl list-unit-files | grep -q "^${SERVICE_NAME}"; then
  echo "▶ systemctl restart $SERVICE_NAME"
  sudo systemctl restart "$SERVICE_NAME"
else
  echo "⚠ Serviço $SERVICE_NAME não instalado — pulei o restart."
  echo "  Instale copiando deploy/vortis.service para /etc/systemd/system/."
fi

# 7) Limpar releases antigas
echo "▶ mantendo últimas $KEEP releases"
cd "$RELEASES_DIR"
ls -1t | tail -n +"$((KEEP + 1))" | xargs -r rm -rf

echo "✅ Deploy concluído: $RELEASE_DIR"
