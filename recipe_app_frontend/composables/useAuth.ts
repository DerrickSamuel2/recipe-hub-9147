import { ref } from 'vue'

// PUBLIC_INTERFACE
export function useAuth() {
  /**
   * Temporarily stubbed authentication. All users are anonymous. No login/register required.
   */
  const user = ref(null)
  const token = ref<string|null>(null)

  async function login(username: string, password: string) {
    // No-op
  }

  async function signup(username: string, password: string) {
    // No-op
  }

  function logout() {
    // No-op
  }

  function getHeaders() {
    // No Authorization header for now
    return {}
  }

  function onAuthSuccess(data: any) {
    // No-op
  }

  return { user, token, login, signup, logout, getHeaders, onAuthSuccess }
}
