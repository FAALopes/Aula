# 📊 Aula - Sales Dashboard

Um dashboard interativo e bonito para análise de dados de vendas.

## Funcionalidades

✅ **KPIs Principais**: Vendas, Lucros, Quantidade, Transações, Margem de Lucro
✅ **Série Temporal**: Visualização de vendas acumuladas ao longo do tempo
✅ **Filtro por Ano**: Selecionar dados de diferentes anos
✅ **Vendas por Trimestre**: Análise trimestral com gráficos
✅ **Top 10 Vendedores**: Ranking com média de quantidade e transações
✅ **Comparação Ano a Ano**: Comparação de vendas entre anos
✅ **Design Responsivo**: Funciona em desktop, tablet e mobile
✅ **Cores Personalizáveis**: Tema moderno e gradientes

## Tech Stack

- **Frontend**: React 18 + Vite
- **Charts**: Chart.js + react-chartjs-2
- **Styling**: CSS3 com variáveis CSS
- **Deployment**: Railway

## Setup Local

```bash
# Instalar dependências
npm install

# Correr servidor de desenvolvimento
npm run dev

# Build para produção
npm run build
```

## Estrutura do Projeto

```
src/
├── components/
│   ├── Dashboard.jsx        # Componente principal
│   ├── KPICard.jsx         # Cards de KPI
│   ├── SalesChart.jsx      # Gráfico de vendas
│   ├── TrimestreChart.jsx  # Gráfico de trimestres
│   ├── TopVendedores.jsx   # Tabela de top 10
│   └── YearComparison.jsx  # Comparação ano a ano
├── styles/
│   ├── Dashboard.css
│   ├── KPICard.css
│   ├── Chart.css
│   └── TopVendedores.css
├── App.jsx
├── main.jsx
└── index.css
```

## Personalização

### Cores
Edite as variáveis CSS em `src/styles/Dashboard.css`:

```css
:root {
  --primary-color: #667eea;
  --secondary-color: #764ba2;
  --success-color: #10b981;
  --warning-color: #f59e0b;
  --info-color: #3b82f6;
}
```

### Dados
Substitua os dados de exemplo em `src/components/Dashboard.jsx` com os dados reais do Excel.

## Deployment no Railway

1. Push para GitHub
2. Conectar repo no Railway
3. Railway faz build automaticamente com `npm run build`
4. Acesso em https://seu-projeto-production.up.railway.app

---

Desenvolvido para a Universidade do Minho 🎓
