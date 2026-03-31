import { useEffect, useMemo, useState } from 'react'
import { fetchOrders, fetchProducts, login, logout, placeOrder, searchProducts } from './api'
import LoginForm from './components/LoginForm'
import ProductList from './components/ProductList'
import OrderBuilder from './components/OrderBuilder'
import OrderList from './components/OrderList'

export default function App() {
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [cart, setCart] = useState([])
  const [customerName, setCustomerName] = useState('')
  const [email, setEmail] = useState('')
  const [query, setQuery] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loggingIn, setLoggingIn] = useState(false)
  const [loadingProducts, setLoadingProducts] = useState(false)
  const [loadingOrders, setLoadingOrders] = useState(false)
  const [placing, setPlacing] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    loadProducts()
    tryLoadOrders()
  }, [])

  async function loadProducts(search = '') {
    setLoadingProducts(true)
    setError('')
    try {
      const data = search ? await searchProducts(search) : await fetchProducts()
      setProducts(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoadingProducts(false)
    }
  }

  async function tryLoadOrders() {
    setLoadingOrders(true)
    try {
      const data = await fetchOrders()
      setOrders(Array.isArray(data) ? data : [])
      setAuthenticated(true)
    } catch {
      setAuthenticated(false)
      setOrders([])
    } finally {
      setLoadingOrders(false)
    }
  }

  async function handleLogin(emailInput, passwordInput) {
    setLoggingIn(true)
    setError('')
    setMessage('')
    try {
      await login(emailInput, passwordInput)
      setAuthenticated(true)
      setMessage('Login successful. You can now view and place orders.')
      await tryLoadOrders()
    } catch (err) {
      setAuthenticated(false)
      setError(err.message || 'Login failed')
    } finally {
      setLoggingIn(false)
    }
  }

  async function handleLogout() {
    setError('')
    setMessage('')
    try {
      await logout()
      setAuthenticated(false)
      setOrders([])
      setMessage('Logged out successfully.')
    } catch (err) {
      setError(err.message)
    }
  }

  function addToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, item.stockQuantity) }
            : item
        )
      }
      return [...current, { ...product, quantity: 1 }]
    })
  }

  function updateQuantity(id, quantity) {
    setCart((current) => current.map((item) => item.id === id ? { ...item, quantity: Math.max(1, quantity || 1) } : item))
  }

  function removeItem(id) {
    setCart((current) => current.filter((item) => item.id !== id))
  }

  async function handlePlaceOrder() {
    if (!authenticated) {
      setError('Please log in before placing an order.')
      return
    }

    if (!customerName.trim() || !email.trim()) {
      setError('Customer name and email are required.')
      return
    }

    setPlacing(true)
    setError('')
    setMessage('')
    try {
      const payload = {
        customerName,
        email,
        items: cart.map((item) => ({
          productId: item.id,
          quantity: item.quantity
        }))
      }

      const response = await placeOrder(payload)
      setMessage(`Order ${response.orderId} placed successfully.`)
      setCart([])
      setCustomerName('')
      setEmail('')
      await loadProducts(query)
      await tryLoadOrders()
    } catch (err) {
      setError(err.message)
    } finally {
      setPlacing(false)
    }
  }

  const dashboardTitle = useMemo(() => authenticated ? 'Logged in dashboard' : 'Public product catalogue', [authenticated])

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">SpringEcom</p>
          <h1>SpringEcom</h1>
          <p className="muted hero-copy">
            Browse products, sign in with your Spring Security user, place orders, and view saved orders from one clean frontend.
          </p>
        </div>
        <div className="hero-actions">
          <span className={`pill ${authenticated ? 'success' : ''}`}>{authenticated ? 'Authenticated' : 'Guest mode'}</span>
          {authenticated && <button className="ghost" onClick={handleLogout}>Logout</button>}
        </div>
      </header>

      {message && <div className="alert success">{message}</div>}
      {error && <div className="alert error">{error}</div>}

      <div className="layout">
        <aside className="sidebar">
          <LoginForm onLogin={handleLogin} loading={loggingIn} />
          <div className="card">
            <h2>{dashboardTitle}</h2>
            <p className="muted">Orders need login. Products are public.</p>
            <div className="search-row">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
              />
              <button className="ghost" onClick={() => loadProducts(query)} disabled={loadingProducts}>
                {loadingProducts ? 'Searching...' : 'Search'}
              </button>
            </div>
            <button className="ghost full" onClick={() => { setQuery(''); loadProducts('') }}>
              Reset products
            </button>
          </div>
          <OrderBuilder
            customerName={customerName}
            email={email}
            setCustomerName={setCustomerName}
            setEmail={setEmail}
            cart={cart}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            onPlaceOrder={handlePlaceOrder}
            placing={placing}
          />
        </aside>

        <main className="content">
          <ProductList products={products} onAdd={addToCart} />
          <OrderList orders={orders} onRefresh={tryLoadOrders} loading={loadingOrders} />
        </main>
      </div>
      <footer style={{ textAlign: 'center', padding: '1rem', opacity: 0.7, fontSize: '0.9rem' }}>
        by roel
      </footer>
    </div>
  )
}
