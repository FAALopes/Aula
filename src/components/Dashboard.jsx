import { useState, useMemo } from 'react'
import KPICard from './KPICard'
import SalesChart from './SalesChart'
import TrimestreChart from './TrimestreChart'
import TopVendedores from './TopVendedores'
import YearComparison from './YearComparison'
import '../styles/Dashboard.css'

const Dashboard = () => {
  // Dados de exemplo - substituir com dados reais do Excel
  const salesData = [
    { date: '2019-01-15', sales: 5000, profit: 1200, quantity: 45, transactions: 12, vendor: 'João Silva', quarter: 'Q1', year: 2019 },
    { date: '2019-02-20', sales: 7200, profit: 1800, quantity: 62, transactions: 15, vendor: 'Maria Santos', quarter: 'Q1', year: 2019 },
    { date: '2019-03-10', sales: 6800, profit: 1500, quantity: 58, transactions: 14, vendor: 'Pedro Costa', quarter: 'Q1', year: 2019 },
    { date: '2019-04-05', sales: 8500, profit: 2100, quantity: 72, transactions: 18, vendor: 'Ana Oliveira', quarter: 'Q2', year: 2019 },
    { date: '2019-05-12', sales: 9200, profit: 2400, quantity: 80, transactions: 20, vendor: 'Carlos Ferreira', quarter: 'Q2', year: 2019 },
    { date: '2019-06-18', sales: 7900, profit: 1900, quantity: 68, transactions: 17, vendor: 'João Silva', quarter: 'Q2', year: 2019 },
    { date: '2019-07-22', sales: 10500, profit: 2800, quantity: 92, transactions: 23, vendor: 'Maria Santos', quarter: 'Q3', year: 2019 },
    { date: '2019-08-30', sales: 9800, profit: 2600, quantity: 85, transactions: 21, vendor: 'Lucia Mendes', quarter: 'Q3', year: 2019 },
    { date: '2019-09-14', sales: 8200, profit: 2100, quantity: 71, transactions: 18, vendor: 'Rui Gomes', quarter: 'Q3', year: 2019 },
    { date: '2019-10-25', sales: 11200, profit: 3000, quantity: 98, transactions: 25, vendor: 'Pedro Costa', quarter: 'Q4', year: 2019 },
    { date: '2019-11-08', sales: 12500, profit: 3400, quantity: 110, transactions: 28, vendor: 'Sofia Dias', quarter: 'Q4', year: 2019 },
    { date: '2019-12-20', sales: 10800, profit: 2900, quantity: 95, transactions: 24, vendor: 'João Silva', quarter: 'Q4', year: 2019 },

    { date: '2020-01-10', sales: 5500, profit: 1300, quantity: 48, transactions: 13, vendor: 'Maria Santos', quarter: 'Q1', year: 2020 },
    { date: '2020-02-15', sales: 7800, profit: 1900, quantity: 68, transactions: 17, vendor: 'Lucia Mendes', quarter: 'Q1', year: 2020 },
    { date: '2020-03-22', sales: 8200, profit: 2000, quantity: 72, transactions: 18, vendor: 'Pedro Costa', quarter: 'Q1', year: 2020 },
    { date: '2020-04-18', sales: 9500, profit: 2300, quantity: 83, transactions: 21, vendor: 'Carlos Ferreira', quarter: 'Q2', year: 2020 },
    { date: '2020-05-25', sales: 10200, profit: 2600, quantity: 89, transactions: 22, vendor: 'Ana Oliveira', quarter: 'Q2', year: 2020 },
    { date: '2020-06-30', sales: 9100, profit: 2200, quantity: 80, transactions: 20, vendor: 'Rui Gomes', quarter: 'Q2', year: 2020 },
    { date: '2020-07-12', sales: 11800, profit: 3100, quantity: 104, transactions: 26, vendor: 'Sofia Dias', quarter: 'Q3', year: 2020 },
    { date: '2020-08-20', sales: 10500, profit: 2700, quantity: 92, transactions: 23, vendor: 'João Silva', quarter: 'Q3', year: 2020 },
    { date: '2020-09-28', sales: 9600, profit: 2400, quantity: 84, transactions: 21, vendor: 'Maria Santos', quarter: 'Q3', year: 2020 },
    { date: '2020-10-05', sales: 12800, profit: 3400, quantity: 112, transactions: 28, vendor: 'Lucia Mendes', quarter: 'Q4', year: 2020 },
    { date: '2020-11-15', sales: 14200, profit: 3800, quantity: 124, transactions: 31, vendor: 'Pedro Costa', quarter: 'Q4', year: 2020 },
    { date: '2020-12-10', sales: 12100, profit: 3200, quantity: 106, transactions: 27, vendor: 'Carlos Ferreira', quarter: 'Q4', year: 2020 },
  ]

  const [selectedYear, setSelectedYear] = useState(2019)
  const years = [...new Set(salesData.map(d => d.year))].sort()

  const filteredData = useMemo(() => {
    return salesData.filter(d => d.year === selectedYear)
  }, [selectedYear])

  // Calcular KPIs
  const kpis = useMemo(() => {
    const totalSales = filteredData.reduce((sum, d) => sum + d.sales, 0)
    const totalProfit = filteredData.reduce((sum, d) => sum + d.profit, 0)
    const totalQuantity = filteredData.reduce((sum, d) => sum + d.quantity, 0)
    const totalTransactions = filteredData.reduce((sum, d) => sum + d.transactions, 0)
    const marginPercent = totalSales > 0 ? ((totalProfit / totalSales) * 100).toFixed(2) : 0

    return {
      totalSales,
      totalProfit,
      totalQuantity,
      totalTransactions,
      marginPercent
    }
  }, [filteredData])

  // Calcular dados por trimestre
  const trimestres = useMemo(() => {
    const data = {}
    filteredData.forEach(d => {
      if (!data[d.quarter]) {
        data[d.quarter] = { sales: 0, count: 0 }
      }
      data[d.quarter].sales += d.sales
      data[d.quarter].count += 1
    })
    return Object.entries(data).map(([quarter, { sales }]) => ({ quarter, sales }))
  }, [filteredData])

  // TOP 10 Vendedores
  const top10Vendedores = useMemo(() => {
    const vendedoresMap = {}
    filteredData.forEach(d => {
      if (!vendedoresMap[d.vendor]) {
        vendedoresMap[d.vendor] = { sales: 0, quantity: 0, transactions: 0, count: 0 }
      }
      vendedoresMap[d.vendor].sales += d.sales
      vendedoresMap[d.vendor].quantity += d.quantity
      vendedoresMap[d.vendor].transactions += d.transactions
      vendedoresMap[d.vendor].count += 1
    })

    return Object.entries(vendedoresMap)
      .map(([vendor, data]) => ({
        vendor,
        sales: data.sales,
        avgQuantity: (data.quantity / data.count).toFixed(2),
        transactions: data.transactions
      }))
      .sort((a, b) => b.sales - a.sales)
      .slice(0, 10)
  }, [filteredData])

  // Comparação ano a ano
  const yearComparison = useMemo(() => {
    const comparison = {}
    salesData.forEach(d => {
      if (!comparison[d.year]) {
        comparison[d.year] = 0
      }
      comparison[d.year] += d.sales
    })
    return comparison
  }, [])

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>📊 Sales Dashboard</h1>
        <div className="year-filter">
          <label>Filtrar por Ano:</label>
          <select value={selectedYear} onChange={(e) => setSelectedYear(parseInt(e.target.value))}>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </header>

      {/* KPI Cards */}
      <section className="kpi-section">
        <KPICard
          title="Vendas Total"
          value={`€${kpis.totalSales.toLocaleString('pt-PT')}`}
          icon="💰"
          color="var(--primary-color)"
        />
        <KPICard
          title="Lucros Total"
          value={`€${kpis.totalProfit.toLocaleString('pt-PT')}`}
          icon="📈"
          color="var(--success-color)"
        />
        <KPICard
          title="Quantidade Vendida"
          value={kpis.totalQuantity}
          icon="📦"
          color="var(--warning-color)"
        />
        <KPICard
          title="Nº Transações"
          value={kpis.totalTransactions}
          icon="🔄"
          color="var(--info-color)"
        />
        <KPICard
          title="Margem de Lucro"
          value={`${kpis.marginPercent}%`}
          icon="📊"
          color="var(--secondary-color)"
        />
      </section>

      {/* Charts Grid */}
      <section className="charts-section">
        <SalesChart data={filteredData} />
        <TrimestreChart data={trimestres} />
      </section>

      {/* Top Vendedores */}
      <section className="vendedores-section">
        <TopVendedores data={top10Vendedores} />
      </section>

      {/* Year Comparison */}
      <section className="comparison-section">
        <YearComparison data={yearComparison} />
      </section>
    </div>
  )
}

export default Dashboard
