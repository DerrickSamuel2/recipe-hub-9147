<template>
  <section>
    <div class="search-row">
      <input v-model="search" placeholder="Search recipes..." @input="updateResults"/>
      <button @click="openCreate">Add Recipe</button>
    </div>
    <div class="recipe-list">
      <RecipeCard
        v-for="r in filtered"
        :key="r.id"
        :recipe="r"
        @click="openDetail(r)"
      />
    </div>
    <RecipeModal
      v-if="showModal"
      :recipe="selectedRecipe"
      :isEdit="editMode"
      @close="closeModal"
      @save="onSaveRecipe"
      @delete="onDeleteRecipe"
    />
  </section>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue'
import RecipeCard from '~/components/RecipeCard.vue'
import RecipeModal from '~/components/RecipeModal.vue'
import { useAuth } from '~/composables/useAuth'
const API_URL = 'http://localhost:8000/api'
const { getHeaders } = useAuth()

const recipes = ref<any[]>([])
const search = ref('')
const showModal = ref(false)
const selectedRecipe = ref<any>(null)
const editMode = ref(false)

async function fetchRecipes() {
  const res = await fetch(`${API_URL}/recipes/`, { headers: getHeaders() })
  recipes.value = await res.json()
}
fetchRecipes()

const filtered = computed(() => {
  if (!search.value) return recipes.value
  return recipes.value.filter(r => r.title.toLowerCase().includes(search.value.toLowerCase()))
})

function updateResults() {
  // Could implement real-time search (API)
}
function openDetail(r) {
  selectedRecipe.value = r
  showModal.value = true
  editMode.value = false
}
function openCreate() {
  selectedRecipe.value = null
  showModal.value = true
  editMode.value = true
}
function closeModal() {
  showModal.value = false
}
async function onSaveRecipe(form) {
  if (selectedRecipe.value) {
    // Edit (PUT)
    await fetch(`${API_URL}/recipes/${selectedRecipe.value.id}/`, {
      method: 'PUT',
      headers: { ...getHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
  } else {
    // Create (POST)
    await fetch(`${API_URL}/recipes/`, {
      method: 'POST',
      headers: { ...getHeaders(), 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
  }
  showModal.value = false
  await fetchRecipes()
}
async function onDeleteRecipe(recipeId) {
  await fetch(`${API_URL}/recipes/${recipeId}/`, {
    method: 'DELETE',
    headers: getHeaders()
  })
  showModal.value = false
  await fetchRecipes()
}
</script>
<style scoped>
.search-row {
  display: flex; align-items: center;
  margin-bottom: 1.3rem;
  gap: 1.2rem;
}
.search-row input {
  flex: 1;
  padding: 0.8em;
  border-radius: var(--border-radius);
  border: 1px solid #deddf3;
  font-size: 1.1rem;
}
.search-row button {
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: var(--border-radius);
  padding: 0.7em 1.6em;
  font-weight: 500;
  cursor: pointer;
}
.recipe-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem 0.8rem;
}
</style>
