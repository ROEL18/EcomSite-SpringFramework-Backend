import { useMemo } from 'react'

export default function OrderBuilder({ customerName, email, setCustomerName, setEmail, cart, updateQuantity, removeItem, onPlaceOrder, placing }) {
  const total = useMemo(() => cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0), [cart])

  return (
    <div className="card">
      <div className="section-title-row">
        <h2>Create Order</h2>
        <span className="pill">{cart.length} selected</span>
      </div>

      <div className="form-grid">
        <div>
          <label>Customer name</label>
          <input value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Enter customer name" />
        </div>
        <div>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
        </div>
      </div>

      {cart.length === 0 ? (
        <p className="muted">Add some products from the list to create an order.</p>
      ) : (
        <div className="cart-list">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <strong>{item.name}</strong>
                <p className="muted small">₹{item.price} each</p>
              </div>
              <div className="cart-controls">
                <input
                  type="number"
                  min="1"
                  max={item.stockQuantity}
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                />
                <button className="ghost" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="section-title-row top-gap">
        <strong>Total</strong>
        <strong>₹{total.toFixed(2)}</strong>
      </div>

      <button onClick={onPlaceOrder} disabled={placing || cart.length === 0}>
        {placing ? 'Placing order...' : 'Place order'}
      </button>
    </div>
  )
}
