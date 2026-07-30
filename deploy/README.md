# Deploy — Vortis Gestão (site estático + Ubuntu + Nginx)

O projeto agora é buildado como **site estático** (React/Vite com páginas
prerenderizadas). Não existe mais serviço Node em produção — o Nginx serve
os arquivos diretamente.

```
/var/www/vortis/
├── repo/                   # git clone deste projeto
├── app/                    # arquivos publicados (root do Nginx)
└── app.previous/           # cópia da publicação anterior para rollback
```

Requisitos no servidor: Node.js LTS (>= 20) + npm (só para buildar), Nginx, Git.

## 1. Setup inicial (uma vez)

```bash
sudo mkdir -p /var/www/vortis
sudo chown -R www-data:www-data /var/www/vortis
sudo -u www-data git clone <URL_DO_REPO> /var/www/vortis/repo

sudo cp /var/www/vortis/repo/deploy/nginx-vortis.conf /etc/nginx/sites-available/vortis.conf
sudo ln -s /etc/nginx/sites-available/vortis.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

Se você já tinha o serviço antigo rodando:

```bash
sudo systemctl disable --now vortis.service
sudo rm -f /etc/systemd/system/vortis.service && sudo systemctl daemon-reload
```

## 2. Deploy / atualização

```bash
sudo -u www-data SITE_DIR=/var/www/vortis BRANCH=main bash /var/www/vortis/repo/deploy/deploy.sh
```

Se o clone estiver dentro de uma subpasta (por exemplo `repo/vortis-site`), o
script detecta automaticamente o diretório que contém `.git` e `package.json`.

O script: `git fetch/reset` → instala dependências (usa `bun install` se o bun estiver
instalado, senão `npm ci`/`npm install`) → `build:static` → normaliza a saída em
`dist/client/` → copia para `app.new/` → troca atomicamente a pasta `app/`.

Ao terminar, devem existir:

```bash
/var/www/vortis/repo/vortis-site/dist/client/index.html
/var/www/vortis/app/index.html
```

## 3. Build local

```bash
npm install
npm run build:static   # gera dist/client com HTML estático de cada rota
npx serve dist/client  # teste local
```

## 4. HTTPS

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d vortisgestao.com.br -d www.vortisgestao.com.br
```

## 5. Rollback rápido

```bash
cd /var/www/vortis
rm -rf app.failed
mv -T app app.failed
mv -T app.previous app
```

## 6. Múltiplos sites

Mesma estrutura em `/var/www/<outro-site>/`, outro `server_name` no Nginx:

```bash
sudo -u www-data SITE_DIR=/var/www/tecnorastro bash /var/www/tecnorastro/repo/deploy/deploy.sh
```

## 7. Logs

```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```
