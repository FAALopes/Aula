import '../styles/TopVendedores.css'

const TopVendedores = ({ data }) => {
  return (
    <div className="top-vendedores">
      <h2>🏆 Top 10 Vendedores</h2>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Ranking</th>
              <th>Vendedor</th>
              <th>Vendas (€)</th>
              <th>Qtd. Média</th>
              <th>Nº Transações</th>
            </tr>
          </thead>
          <tbody>
            {data.map((vendor, idx) => (
              <tr key={idx} className={idx < 3 ? 'top-rank' : ''}>
                <td className="ranking">
                  <span className="rank-badge">
                    {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `${idx + 1}`}
                  </span>
                </td>
                <td className="vendor-name">{vendor.vendor}</td>
                <td className="amount">€{vendor.sales.toLocaleString('pt-PT')}</td>
                <td className="quantity">{vendor.avgQuantity}</td>
                <td className="transactions">{vendor.transactions}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default TopVendedores
