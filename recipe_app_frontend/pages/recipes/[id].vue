<template>
  <section>
    <div v-if="!recipe">Loading...</div>
    <div v-else>
      <RecipeModal
        :recipe="recipe"
        :isEdit="editMode"
        @close="goHome"
        @save="onSave"
        @delete="onDelete"
      />
      <div v-if="!editMode">
        <button @click="editMode = true">Edit</button>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import RecipeModal from '~/components/RecipeModal.vue'
import { useRoute, useRouter } from 'vue-router'

const API_URL = 'http://localhost:8000/api'
const route = useRoute()
const router = useRouter()

const recipe = ref(null)
const editMode = ref(false)

async function fetchRecipe() {
  const res = await fetch(`${API_URL}/recipes/${route.params.id}/`)
  recipe.value = await res.json()
}

onMounted(fetchRecipe)

function goHome() { router.push('/') }

async function onSave(form) {
  await fetch(`${API_URL}/recipes/${route.params.id}/`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form)
  })
  editMode.value = false
  await fetchRecipe()
}
async function onDelete() {
  await fetch(`${API_URL}/recipes/${route.params.id}/`, {
    method: 'DELETE'
  })
  goHome()
}
</script>
