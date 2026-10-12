# Guia de Implantação no aaPanel (Linux)
## Domínio Oficial: https://criadordesites.app.br

Este documento descreve os passos para publicar o **Criador de Sites** em um servidor Linux gerenciado pelo **aaPanel**.

O projeto suporta **dois modelos de publicação**:
1. **Modo Estático (SPA / Nginx / Apache - Recomendado para alta velocidade e baixo consumo)**: A pasta `dist` gerada pelo `npm run build` é servida diretamente pelo Nginx com cache e SSL.
2. **Modo Full-Stack (Node.js Project Manager no aaPanel)**: Executa a aplicação com o servidor Express (`server.ts` / `server.js`).
3. **Modo PHP para formulário**: Caso utilize hospedagem PHP no aaPanel, incluímos o script opcional `lead.php` para recepção de orçamentos via PHP Mail / PDO.

---

### Opção 1: Implantação Estática via Nginx (Mais Rápida e Simples)

#### 1. Gerar os Arquivos de Produção
No seu ambiente de desenvolvimento ou CI/CD, execute:
```bash
npm run build
```
Isso gerará a pasta `dist/` com todos os arquivos HTML, CSS, JavaScript, imagens, `robots.txt` e `sitemap.xml`.

#### 2. Criar o Site no aaPanel
1. Acesse o painel **aaPanel** (`https://seu-ip:8888`).
2. Vá em **Website** > **Add site**.
3. Preencha:
   - **Domain**: `criadordesites.app.br` (adicione também `www.criadordesites.app.br` se desejar).
   - **Description**: Criador de Sites Oficial.
   - **Root directory**: `/www/wwwroot/criadordesites.app.br`.
   - **FTP**: Opcional.
   - **Database**: Não é necessário para o modo estático.
   - **PHP Version**: `pure-static` (ou PHP 8.x se for usar scripts auxiliares).

#### 3. Upload dos Arquivos
Envie todo o conteúdo da pasta `dist/` para dentro de `/www/wwwroot/criadordesites.app.br/`.
Garanta as permissões adequadas:
```bash
chown -R www:www /www/wwwroot/criadordesites.app.br
chmod -R 755 /www/wwwroot/criadordesites.app.br
```

#### 4. Configurar Regras de URL Amigável / SPA no Nginx
No aaPanel, clique no nome do site > **URL rewrite** e selecione ou adicione:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

#### 5. Configurar Certificado SSL (HTTPS Gratuito)
1. No aaPanel, clique no site > **SSL**.
2. Selecione a aba **Let's Encrypt**.
3. Marque os domínios `criadordesites.app.br` e `www.criadordesites.app.br`.
4. Clique em **Apply**.
5. Ative a chave **Force HTTPS** para redirecionar automaticamente todo o tráfego HTTP para HTTPS.

---

### Opção 2: Implantação Full-Stack (Node.js no aaPanel)

Se desejar executar o backend Express nativo no servidor:

1. No aaPanel, vá em **App Store** e instale o **Node.js Version Manager** (Node 20+ ou 22+).
2. Vá em **Website** > **Node project** > **Add Node project**.
3. Defina:
   - **Project Name**: `criadordesites`
   - **Run opt**: `npm run start` (ou `tsx server.ts`)
   - **Port**: `3000`
   - **Run User**: `www`
4. Configure o **Reverse Proxy** automático no aaPanel para encaminhar as requisições da porta 80/443 do domínio para `http://127.0.0.1:3000`.

---

### Opção 3: Backend Auxiliar em PHP (Caso queira processar formulários via PHP no aaPanel)

Se optar pelo modo PHP, o arquivo `public/api/lead.php` pode ser configurado para receber os dados via `POST` e salvar em arquivo JSON seguro ou enviar e-mail via `mail()` ou SMTP autenticado.

---

### Verificações Pós-Publicação

1. **Acessibilidade do Domínio**: Teste `https://criadordesites.app.br` em dispositivos móveis e desktops.
2. **SSL**: Verifique o cadeado de segurança (TLS 1.2/1.3) ativo.
3. **WhatsApp**: Clique nos botões para confirmar que a conversa abre com o número correto configurado em `src/config/siteConfig.ts`.
4. **Sitemap e Robots**: Verifique `https://criadordesites.app.br/robots.txt` e `https://criadordesites.app.br/sitemap.xml`.
5. **Formulário de Contato**: Envie um teste e certifique-se de que os dados são capturados e a mensagem para o WhatsApp é formatada perfeitamente.
