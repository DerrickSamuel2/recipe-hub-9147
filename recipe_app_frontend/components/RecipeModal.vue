<template>
  <div class="modal-backdrop">
    <div class="modal-content">
      <span class="modal-close" @click="$emit('close')">×</span>
      <h2 v-if="isEdit">{{ recipe ? 'Edit Recipe' : 'Create Recipe' }}</h2>
      <h2 v-else>{{ recipe.title }}</h2>
      <form v-if="isEdit" @submit.prevent="onSave">
        <input v-model="form.title" placeholder="Title" required />
        <textarea v-model="form.description" placeholder="Description"></textarea>
        <input v-model="form.image" placeholder="Image URL" />
        <div>
          <input v-model="category" placeholder="Categories (comma separated)" />
        </div>
        <div>
          <input v-model="ingredients" placeholder="Ingredients (comma separated)" />
        </div>
        <button type="submit">{{ recipe ? 'Update' : 'Create' }}</button>
        <button type="button" v-if="recipe" @click="onDelete" class="danger">Delete</button>
      </form>
      <div v-else>
        <img v-if="recipe.image" :src="recipe.image" class="detail-img"/>
        <p><strong>Description:</strong> {{ recipe.description }}</p>
        <div>
          <strong>Ingredients:</strong>
          <ul>
            <li v-for="ing in recipe.ingredients" :key="ing">{{ ing }}</li>
          </ul>
        </div>
        <div>
          <strong>Categories:</strong> {{ recipe.categories.join(', ') }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
const props = defineProps(['recipe', 'isEdit'])
const emit = defineEmits(['close', 'save', 'delete'])

const form = ref({ title: '', description: '', image: '', categories: [], ingredients: [] })
const category = ref('')
const ingredients = ref('')

watch(() => props.recipe, (val) => {
  if (val) {
    form.value = {
      title: val.title,
      description: val.description,
      image: val.image || '',
      categories: val.categories.slice(),
      ingredients: val.ingredients.slice()
    }
    category.value = val.categories.join(', ')
    ingredients.value = val.ingredients.join(', ')
  } else {
    form.value = { title: '', description: '', image: '', categories: [], ingredients: [] }
    category.value = ''
    ingredients.value = ''
  }
}, { immediate: true })

function onSave() {
  const editForm = {
    ...form.value,
    categories: category.value.split(',').map(c => c.trim()).filter(Boolean),
    ingredients: ingredients.value.split(',').map(i => i.trim()).filter(Boolean)
  }
  emit('save', editForm)
}
function onDelete() {
  emit('delete', props.recipe.id)
}
</script>
<style scoped>
.modal-backdrop {
  position: fixed; inset: 0; z-index: 99;
  background: rgba(56, 45, 89, 0.17);
  display: flex; align-items: center; justify-content: center;
}
.modal-content {
  background: #fff;
  border-radius: var(--border-radius);
  box-shadow: 0 6px 28px #715aff32;
  min-width: 320px;
  max-width: 450px;
  padding: 2.2rem 2.3rem 1.3rem 2.3rem;
  position: relative;
}
.modal-close {
  position: absolute; top: 13px; right: 19px;
  font-size: 1.5em; cursor: pointer; color: #5145cc;
}
form input, form textarea {
  display: block;
  width: 99%;
  margin-bottom: 1rem;
  padding: 0.6em;
  border-radius: 7px;
  border: 1px solid #deddf3;
  font-size: 1.06rem;
}
form textarea { min-height: 65px; }
button {
  background: var(--color-primary);
  color: #fff;
  border: none;
  padding: 0.6em 1.1em;
  border-radius: var(--border-radius);
  margin-right: 0.6em;
  margin-bottom: 0.2em;
  cursor: pointer;
}
button.danger {
  background: #F67280;
}
.detail-img {
  width: 100%; max-width: 360px; margin: 0.7rem 0; border-radius: 10px; box-shadow: 0 2px 10px #ad9ff242;
}
</style>
