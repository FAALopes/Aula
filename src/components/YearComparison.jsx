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

const YearComparison = ({ data }) => {
  const years = Object.keys(data).map(Number).sort()

  const chartData = {
    labels: years.map(y => `Ano ${y}`),
    datasets: [
      {
        label: 'Vendas Anuais (€)',
        data: years.map(y => data[y]),
        backgroundColor: '#4facfe',
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  }

  return (
    <div className="chart-container">
      <h2>📅 Comparação de Vendas: Ano Atual vs Anterior</h2>
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

export default YearComparison
