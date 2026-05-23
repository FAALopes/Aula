import '../styles/KPICard.css'

const KPICard = ({ title, value, icon, color }) => {
  return (
    <div className="kpi-card" style={{ '--accent-color': color }}>
      <div className="kpi-icon">{icon}</div>
      <div className="kpi-content">
        <p className="kpi-title">{title}</p>
        <h3 className="kpi-value">{value}</h3>
      </div>
    </div>
  )
}

export default KPICard
