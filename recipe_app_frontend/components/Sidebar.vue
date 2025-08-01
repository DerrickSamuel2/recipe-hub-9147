<template>
  <aside class="sidebar">
    <section>
      <h3>Categories</h3>
      <ul>
        <li :class="{active: !selectedCategory}" @click="$emit('updateCategory', null)">All</li>
        <li v-for="cat in categories" :key="cat" :class="{active: selectedCategory === cat}" @click="$emit('updateCategory', cat)">{{ cat }}</li>
      </ul>
    </section>
    <section>
      <h3>Ingredients</h3>
      <div class="ingredient-list">
        <label v-for="ingredient in ingredients" :key="ingredient">
          <input
            type="checkbox"
            :value="ingredient"
            :checked="selectedIngredients.includes(ingredient)"
            @change="onIngredientToggle(ingredient)"
          />
          {{ ingredient }}
        </label>
      </div>
    </section>
  </aside>
</template>
<script setup lang="ts">
defineProps(['categories', 'selectedCategory', 'ingredients', 'selectedIngredients'])
defineEmits(['updateCategory', 'updateIngredients'])

function onIngredientToggle(ingredient) {
  let newSelected = [...props.selectedIngredients]
  if (newSelected.includes(ingredient))
    newSelected = newSelected.filter(i => i !== ingredient)
  else
    newSelected.push(ingredient)
  emit('updateIngredients', newSelected)
}
</script>
<style scoped>
.sidebar {
  min-width: 230px;
  background: #f7f4ff;
  padding: 2rem 1.5vw;
  border-right: 1px solid #ece2ff;
}
h3 {
  color: var(--color-primary);
  margin-top: 0;
}
ul {
  padding-left: 0;
  list-style: none;
}
li {
  cursor: pointer;
  padding: 0.45rem 0.5rem;
  border-radius: 6px;
  transition: background var(--transition);
}
li.active, li:hover {
  background: var(--color-primary-light);
  color: #fff;
}
.ingredient-list label {
  display: inline-block;
  margin: 0 0.2rem 0.5rem 0;
  padding: 0.20rem 0.5rem;
  border-radius: 6px;
  background: #ececff;
  cursor: pointer;
  font-size: 0.97rem;
}
input[type="checkbox"] {
  margin-right: 4px;
}
</style>
