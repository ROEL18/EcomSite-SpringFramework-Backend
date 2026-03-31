export default function OrderList({ orders, onRefresh, loading }) {
  return (
    <div className="card">
      <div className="section-title-row">
        <h2>Orders</h2>
        <button className="ghost" onClick={onRefresh} disabled={loading}>{loading ? 'Refreshing...' : 'Refresh'}</button>
      </div>

      {orders.length === 0 ? (
        <p className="muted">No orders yet.</p>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <div className="order-card" key={order.orderId}>
              <div className="section-title-row">
                <div>
                  <strong>{order.orderId}</strong>
                  <p className="muted small">{order.customerName} • {order.email}</p>
                </div>
                <span className="pill success">{order.status}</span>
              </div>
              <p className="muted small">Date: {order.orderDate}</p>
              <ul>
                {(order.items || []).map((item, index) => (
                  <li key={`${order.orderId}-${index}`}>
                    {item.productName} × {item.quantity} — ₹{item.totalPrice}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
