import { ref } from 'vue'

export function useRecipeFilters() {
  const categories = ref<string[]>([])
  const selectedCategory = ref<string|null>(null)
  const ingredients = ref<string[]>([])
  const selectedIngredients = ref<string[]>([])

  function onCategoryChange(category: string|null) {
    selectedCategory.value = category
  }
  function onIngredientsChange(selected: string[]) {
    selectedIngredients.value = selected
  }

  // These could call API to fetch values
  return {
    categories, selectedCategory,
    ingredients, selectedIngredients,
    onCategoryChange, onIngredientsChange
  }
}
