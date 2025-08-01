<template>
  <div>
    <BaseHeader />
    <div class="layout">
      <Sidebar
        :categories="categories"
        :selectedCategory="selectedCategory"
        :ingredients="ingredients"
        :selectedIngredients="selectedIngredients"
        @updateCategory="onCategoryChange"
        @updateIngredients="onIngredientsChange"
      />
      <main class="main-content">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRecipeFilters } from '~/composables/useRecipeFilters'
import BaseHeader from '~/components/BaseHeader.vue'
import Sidebar from '~/components/Sidebar.vue'

const {
  categories,
  selectedCategory,
  ingredients,
  selectedIngredients,
  onCategoryChange,
  onIngredientsChange
} = useRecipeFilters()
</script>

<style scoped>
.layout {
  display: flex;
  min-height: 95vh;
}
.main-content {
  flex: 1;
  padding: 2rem 2.5vw;
  background: #faf8ff;
}
</style>
