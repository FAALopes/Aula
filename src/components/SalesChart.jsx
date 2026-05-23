import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import '../styles/Chart.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const SalesChart = ({ data }) => {
  const chartData = useMemo(() => {
    let accumulatedSales = 0
    const labels = []
    const salesData = []

    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date))

    sortedData.forEach(d => {
      accumulatedSales += d.sales
      labels.push(new Date(d.date).toLocaleDateString('pt-PT'))
      salesData.push(accumulatedSales)
    })

    return {
      labels,
      datasets: [
        {
          label: 'Vendas Acumuladas (€)',
          data: salesData,
          borderColor: '#667eea',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          borderWidth: 2,
          tension: 0.4,
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: '#667eea',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
        },
      ],
    }
  }, [data])

  return (
    <div className="chart-container">
      <h2>📈 Vendas Acumuladas ao Longo do Tempo</h2>
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            legend: { display: true, position: 'top' },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `€${context.parsed.y.toLocaleString('pt-PT')}`
                }
              }
            }
          },
          scales: {
            y: {
              ticks: {
                callback: function(value) {
                  return '€' + value.toLocaleString('pt-PT')
                }
              }
            }
          }
        }}
      />
    </div>
  )
}

export default SalesChart
