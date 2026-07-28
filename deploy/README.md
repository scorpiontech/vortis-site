# Deploy — Vortis Gestão (Ubuntu + Nginx)

Arquitetura no servidor (padrão do usuário):

```
/var/www/vortis/
├── repo/                   # git clone deste projeto
├── releases/               # cada build publicado (timestamp)
│   ├── 20260728-101500/
│   └── 20260728-120000/
└── app -> releases/…       # symlink atômico apontando para a release ativa
```

Requisitos no servidor:
- Node.js LTS (>= 20) e npm
- Nginx
- Usuário `www-data` com permissão em `/var/www/vortis`
- Git

## 1. Setup inicial (uma vez)

```bash
sudo mkdir -p /var/www/vortis
sudo chown -R www-data:www-data /var/www/vortis

sudo -u www-data git clone <URL_DO_REPO> /var/www/vortis/repo

# Serviço systemd (SSR Node na porta 3000)
sudo cp /var/www/vortis/repo/deploy/vortis.service /etc/systemd/system/vortis.service
sudo systemctl daemon-reload
sudo systemctl enable vortis.service

# Nginx (proxy reverso)
sudo cp /var/www/vortis/repo/deploy/nginx-vortis.conf /etc/nginx/sites-available/vortis.conf
sudo ln -s /etc/nginx/sites-available/vortis.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## 2. Deploy / atualização

Rodar a cada atualização:

```bash
sudo -u www-data SITE_DIR=/var/www/vortis BRANCH=main bash /var/www/vortis/repo/deploy/deploy.sh
```

O script:
1. `git fetch` + `reset --hard origin/main`
2. `npm ci` + `npm run build` (Vite/Nitro → `dist/`)
3. Copia `dist/` para `releases/<timestamp>/`
4. Troca o symlink `app` para a nova release (atômico, zero downtime na troca)
5. `systemctl restart vortis.service`
6. Mantém apenas as últimas `KEEP=5` releases (configurável)

## 3. HTTPS

Depois que o site estiver respondendo em HTTP:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d vortisgestao.com.br -d www.vortisgestao.com.br
```

## 4. Rollback rápido

```bash
cd /var/www/vortis
ls releases/                       # lista timestamps
ln -sfn releases/<timestamp> app.new && mv -Tf app.new app
sudo systemctl restart vortis.service
```

## 5. Múltiplos sites no mesmo servidor

Este padrão (`repo/`, `app/`, `releases/`) já é isolado por pasta. Para adicionar
outro site siga a mesma estrutura em `/var/www/<outro-site>/`, use outra porta
(`PORT=3001`) no `.service` e outro `server_name` no Nginx.

## 6. Logs

```bash
sudo journalctl -u vortis.service -f    # SSR Node
sudo tail -f /var/log/nginx/access.log   # Nginx
sudo tail -f /var/log/nginx/error.log
```
