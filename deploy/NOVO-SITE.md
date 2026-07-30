# Guia: publicar um NOVO site estático no servidor (Ubuntu + Nginx)

Passo a passo padronizado, baseado no que foi feito para a Vortis Gestão.
Substitua em todos os comandos:

- `<site>` → nome curto da pasta (ex.: `vortis`, `tecnorastro`)
- `<dominio>` → domínio real (ex.: `vortisgestao.com.br`)
- `<git-url>` → URL do repositório

---

## 0. Pré-requisitos (uma única vez por servidor)

```bash
sudo apt update
sudo apt install -y nginx git curl certbot python3-certbot-nginx
# Node 20 + (opcional) Bun
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs
curl -fsSL https://bun.sh/install | sudo bash   # opcional, acelera o build
```

Confirme que existe o vhost **default** (evita que um domínio novo caia em outro site):

```bash
ls /etc/nginx/sites-enabled/
```

---

## 1. Estrutura de pastas

```bash
sudo mkdir -p /var/www/<site>/{repo,logs}
sudo chown -R www-data:www-data /var/www/<site>
```

Resultado esperado:

```
/var/www/<site>/
├── repo/     <- código-fonte (git)
├── app/      <- arquivos publicados (criado pelo deploy)
└── logs/     <- logs do Nginx
```

> ⚠️ **Nunca** crie `app/` manualmente como pasta com conteúdo: o deploy faz a troca atômica dela.

---

## 2. Clonar o repositório

```bash
cd /var/www/<site>/repo
sudo -u www-data git clone <git-url> .
```

O ponto final (`.`) é essencial — sem ele o git cria uma subpasta e o deploy precisa procurar o `.git`.

Se o clone for feito como `root`, libere o diretório para o git:

```bash
sudo git config --global --add safe.directory /var/www/<site>/repo
sudo chown -R www-data:www-data /var/www/<site>/repo
```

---

## 3. Primeiro build/deploy

```bash
cd /var/www/<site>/repo
sudo -u www-data SITE_DIR=/var/www/<site> BRANCH=main bash deploy/deploy.sh
```

O script:
1. Faz `git pull` da branch
2. Instala dependências (`bun install`, senão `npm install`)
3. Roda `npm run build:static` → gera `dist/client`
4. Copia para `app.new`, move `app` → `app.previous` e renomeia `app.new` → `app`

Valide:

```bash
ls /var/www/<site>/app        # precisa ter index.html + assets
```

---

## 4. Permissões

```bash
sudo chown -R www-data:www-data /var/www/<site>/app
sudo find /var/www/<site>/app -type d -exec chmod 755 {} \;
sudo find /var/www/<site>/app -type f -exec chmod 644 {} \;
```

Causa nº 1 de **500 Internal Server Error**: arquivos pertencendo a `root` sem leitura para `www-data`.

---

## 5. Virtual host do Nginx (HTTP)

Crie `/etc/nginx/sites-available/<site>.conf`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name <dominio> www.<dominio>;

    root /var/www/<site>/app;
    index index.html;

    access_log /var/www/<site>/logs/access.log;
    error_log  /var/www/<site>/logs/error.log;

    # SPA / site estático prerenderizado
    location / {
        try_files $uri $uri/ $uri.html /index.html =404;
    }

    # Assets com hash → cache longo
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    location = /favicon.ico { log_not_found off; access_log off; }
    location = /robots.txt  { log_not_found off; access_log off; }

    gzip on;
    gzip_types text/plain text/css application/javascript application/json image/svg+xml;
}
```

Ative e valide:

```bash
sudo ln -sf /etc/nginx/sites-available/<site>.conf /etc/nginx/sites-enabled/<site>.conf
sudo nginx -t && sudo systemctl reload nginx
curl -I -H 'Host: <dominio>' http://127.0.0.1/     # esperado: 200 OK
```

---

## 6. HTTPS (obrigatório em servidor multi-site)

Sem vhost na porta 443, o domínio novo **cai no site de outro projeto** (o primeiro vhost SSL vira o default).

```bash
sudo certbot --nginx -d <dominio> -d www.<dominio>
sudo nginx -t && sudo systemctl reload nginx
curl -I --resolve <dominio>:443:127.0.0.1 https://<dominio>/    # esperado: 200 OK
```

---

## 7. Atualizações futuras (rotina)

```bash
cd /var/www/<site>/repo
sudo -u www-data SITE_DIR=/var/www/<site> bash deploy/deploy.sh
```

Rollback imediato:

```bash
sudo mv /var/www/<site>/app /var/www/<site>/app.broken
sudo mv /var/www/<site>/app.previous /var/www/<site>/app
sudo systemctl reload nginx
```

---

## 8. Checklist final (evita 100% dos problemas já vistos)

- [ ] `repo/` contém `package.json` na raiz (clone com `.` no final)
- [ ] `git config --global --add safe.directory /var/www/<site>/repo` feito
- [ ] Deploy rodou sem erro e `app/index.html` existe
- [ ] Dono `www-data`, dirs 755 / files 644
- [ ] `nginx -t` sem erros e **sem links quebrados** em `sites-enabled`
- [ ] Nenhuma config antiga com `proxy_pass` ou `index.php` para este domínio
- [ ] Domínio **não** aparece no `server_name` de outro site: `sudo nginx -T | grep -n '<dominio>'`
- [ ] Certificado emitido e vhost 443 ativo
- [ ] Testes: `/`, `/servicos` (rota interna), `/robots.txt`, `/sitemap.xml`

---

## 9. Diagnóstico rápido

| Sintoma | Causa provável | Correção |
|---|---|---|
| 500 Internal Server Error | permissão ou `try_files` em loop | seção 4 + `try_files ... =404` |
| Cai em outro site no HTTPS | falta vhost 443 do domínio | seção 6 |
| `redirection cycle to /index.php` | config antiga PHP | remover o vhost antigo de `sites-enabled` |
| `nginx: open() sites-enabled/... failed` | link simbólico quebrado | `sudo rm` do link e recriar (seção 5) |
| `npm error EUSAGE` (npm ci) | projeto usa `bun.lock` | script já usa bun/`npm install` |
| `dubious ownership` | git rodando como outro usuário | `safe.directory` (seção 2) |
| 404 em rota interna | `try_files` sem fallback | usar a `location /` da seção 5 |

Logs úteis:

```bash
sudo tail -n 50 /var/log/nginx/error.log
sudo tail -n 50 /var/www/<site>/logs/error.log
sudo nginx -T | grep -n 'server_name'
```
