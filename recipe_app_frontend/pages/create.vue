<template>
  <section>
    <RecipeModal
      :recipe="null"
      :isEdit="true"
      @close="goHome"
      @save="onSave"
    />
  </section>
</template>
<script setup lang="ts">
import RecipeModal from '~/components/RecipeModal.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const API_URL = 'http://localhost:8000/api'

function goHome() {
  router.push('/')
}
async function onSave(form) {
  await fetch(`${API_URL}/recipes/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form)
  })
  goHome()
}
</script>
