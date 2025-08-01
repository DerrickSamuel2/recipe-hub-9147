<template>
  <div class="modal-backdrop">
    <div class="auth-modal">
      <h2 v-if="isLogin">Sign In</h2>
      <h2 v-else>Register</h2>
      <form @submit.prevent="onSubmit">
        <input v-model="username" required autofocus placeholder="Username" />
        <input v-model="password" type="password" required placeholder="Password" />
        <button type="submit">{{ isLogin ? 'Login' : 'Sign Up' }}</button>
      </form>
      <div class="switch">
        <span v-if="isLogin">No account? <a @click.prevent="isLogin=false">Sign Up</a></span>
        <span v-else>Have an account? <a @click.prevent="isLogin=true">Login</a></span>
      </div>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
const emit = defineEmits(['success'])
const { login, signup } = useAuth()
const isLogin = ref(true)
const username = ref('')
const password = ref('')
const error = ref('')
async function onSubmit() {
  error.value = ''
  try {
    if (isLogin.value)
      await login(username.value, password.value)
    else
      await signup(username.value, password.value)
    emit('success', { user: { username: username.value }, token: localStorage.getItem('token') })
  } catch (e:any) {
    error.value = e.message
  }
}
</script>
<style scoped>
.modal-backdrop {
  position: fixed;
  z-index: 99;
  inset: 0;
  background: rgba(45,42,59, 0.17);
  display: flex;
  align-items: center;
  justify-content: center;
}
.auth-modal {
  background: #fff;
  border-radius: var(--border-radius);
  box-shadow: 0 3px 40px #7c5af517;
  padding: 2.1rem 2.3rem 1.4rem 2.3rem;
  min-width: 320px;
  text-align: center;
}
input {
  width: 95%;
  font-size: 1rem;
  margin-bottom: 1rem;
  padding: 0.7em;
  border-radius: var(--border-radius);
  border: 1px solid #deddf3;
}
.error { color: #F67280; font-size: 0.99rem;}
button {
  padding: 0.7em 1.3em;
  color: #fff; background: var(--color-primary);
  border: none;
  border-radius: var(--border-radius);
}
.switch {
  margin-top: 0.8rem;
  font-size: 0.97rem;
}
.switch a { color: var(--color-primary); cursor:pointer;}
</style>
