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

REPO_DIR="$SITE_DIR/repo"
APP_LINK="$SITE_DIR/app"
RELEASES_DIR="$SITE_DIR/releases"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"
RELEASE_DIR="$RELEASES_DIR/$TIMESTAMP"

echo "▶ Deploy Vortis  |  site=$SITE_DIR  branch=$BRANCH"

# 1) Garantir estrutura
mkdir -p "$RELEASES_DIR"

# 2) Atualizar repositório
if [ ! -d "$REPO_DIR/.git" ]; then
  echo "✖ Repositório não encontrado em $REPO_DIR. Faça o git clone antes." >&2
  exit 1
fi

cd "$REPO_DIR"
echo "▶ git fetch/reset origin/$BRANCH"
git fetch --prune origin
git reset --hard "origin/$BRANCH"
git clean -fd

# 3) Instalar dependências e buildar
echo "▶ npm ci"
npm ci --no-audit --no-fund

echo "▶ npm run build"
rm -rf dist
npm run build

if [ ! -f "dist/server/index.mjs" ]; then
  echo "✖ Build falhou: dist/server/index.mjs não existe." >&2
  exit 1
fi

# 4) Publicar release (cópia atômica)
echo "▶ publicando release $TIMESTAMP"
mkdir -p "$RELEASE_DIR"
cp -a dist/. "$RELEASE_DIR/"

# 5) Trocar symlink de forma atômica
ln -sfn "$RELEASE_DIR" "$APP_LINK.new"
mv -Tf "$APP_LINK.new" "$APP_LINK"

# 6) Restart do serviço (systemd)
SERVICE_NAME="vortis.service"
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
