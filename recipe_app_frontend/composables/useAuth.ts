import { ref } from 'vue'
import { useRouter } from 'vue-router'
const API_URL = 'http://localhost:8000/api' // Update as needed

const user = ref(null)
const token = ref<string|null>(null)

function setAuth(data:any) {
  token.value = data.token
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem('token', data.token)
  }
  user.value = data.user
}
function clearAuth() {
  token.value = null
  user.value = null
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.removeItem('token')
  }
}
function getHeaders() {
  return token.value
    ? { Authorization: `Bearer ${token.value}` }
    : {}
}

// PUBLIC_INTERFACE
export function useAuth() {
  /**
   * Provides authentication helpers: login, signup, logout, state
   */
  const router = useRouter()

  async function login(username: string, password: string) {
    const res = await fetch(`${API_URL}/auth/login/`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
    if (!res.ok) throw new Error('Login failed')
    const data = await res.json()
    setAuth(data)
  }

  async function signup(username: string, password: string) {
    const res = await fetch(`${API_URL}/auth/register/`, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
    if (!res.ok) throw new Error('Signup failed')
    const data = await res.json()
    setAuth(data)
  }

  function logout() {
    clearAuth()
    router.push('/')
  }

  function restore() {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem('token')
      if (stored) {
        token.value = stored
        // Optionally: fetch user details with token
      }
    }
  }

  function onAuthSuccess(data) {
    setAuth(data)
  }

  // Only call restore on client (not during Nuxt SSR)
  if (typeof window !== 'undefined') {
    restore()
  }
  return { user, token, login, signup, logout, getHeaders, onAuthSuccess }
}
