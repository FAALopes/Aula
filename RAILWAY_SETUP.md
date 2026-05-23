# 🚀 Setup Railway

## Passos para Deploy:

### 1. Ir ao Railway
Aceda a https://railway.app/dashboard

### 2. Criar novo Projeto
- Clique em "New Project"
- Selecione "Deploy from GitHub"

### 3. Conectar Repositório
- Selecione `FAALopes/Aula`
- Autorize a conexão GitHub

### 4. Configurar Build
Railway detecta automaticamente:
- **Runtime**: Node.js
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm run preview`

### 5. Variáveis de Ambiente
Não há variáveis obrigatórias para esta versão.

### 6. Deploy
Railway faz deploy automático ao fazer push para GitHub.

---

**URL do Dashboard**: Será exibida no painel do Railway após deploy (algo como: `https://aula-production-xxxx.up.railway.app`)

## Após Deploy

Teste a aplicação:
```bash
curl https://seu-railway-url/
```

Se precisar consultar logs:
```bash
railway logs
```

## Integração com Dados Reais

Quando tiver os dados do Excel, edite `src/components/Dashboard.jsx` e substitua o array `salesData` com os dados reais.
