const API_BASE_URL = 'http://localhost:8080'

async function handleResponse(response) {
  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || 'Request failed')
  }

  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    return response.json()
  }
  return response.text()
}

export async function login(email, password) {
  const body = new URLSearchParams()
  body.append('username', email)
  body.append('password', password)

  const response = await fetch(`${API_BASE_URL}/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body
  })

  return handleResponse(response)
}

export async function logout() {
  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include'
  })

  return handleResponse(response)
}

export async function fetchProducts() {
  const response = await fetch(`${API_BASE_URL}/products`, {
    credentials: 'include'
  })
  return handleResponse(response)
}

export async function searchProducts(keyword) {
  const response = await fetch(`${API_BASE_URL}/product/search?keyword=${encodeURIComponent(keyword)}`, {
    credentials: 'include'
  })
  return handleResponse(response)
}

export async function fetchOrders() {
  const response = await fetch(`${API_BASE_URL}/api/orders`, {
    credentials: 'include'
  })
  return handleResponse(response)
}

export async function placeOrder(payload) {
  const response = await fetch(`${API_BASE_URL}/api/orders/place`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  return handleResponse(response)
}

export async function getProductImageUrl(id) {
  return `${API_BASE_URL}/product/${id}/image`
}
