export default function ProductList({ products, onAdd }) {
  return (
    <div className="card">
      <div className="section-title-row">
        <h2>Products</h2>
        <span className="pill">{products.length} items</span>
      </div>
      <div className="grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-header">
              <div>
                <h3>{product.name}</h3>
                <p className="muted small">ID: {product.id}</p>
              </div>
              <span className="price">₹{product.price}</span>
            </div>
            <p className="muted description">{product.description || 'No description available.'}</p>
            <div className="product-footer">
              <span>Stock: {product.stockQuantity}</span>
              <button onClick={() => onAdd(product)} disabled={product.stockQuantity <= 0}>
                Add to order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
