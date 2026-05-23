import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import '../styles/Chart.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const TrimestreChart = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.quarter),
    datasets: [
      {
        label: 'Vendas por Trimestre (€)',
        data: data.map(d => d.sales),
        backgroundColor: [
          '#667eea',
          '#764ba2',
          '#f093fb',
          '#4facfe',
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  }

  return (
    <div className="chart-container">
      <h2>📊 Vendas por Trimestre</h2>
      <Bar
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

export default TrimestreChart
