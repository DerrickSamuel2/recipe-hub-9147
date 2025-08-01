<template>
  <div class="card" @click="$emit('click', recipe)">
    <img v-if="recipe.image" :src="recipe.image" class="card-img"/>
    <div class="card-body">
      <h3>{{ recipe.title }}</h3>
      <span class="chip" v-for="cat in recipe.categories" :key="cat">{{ cat }}</span>
      <p class="desc">{{ recipe.description }}</p>
      <div class="footer">
        <span class="ingredients">Ingredients: {{ recipe.ingredients.length }}</span>
        <button class="view-btn">View</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps(['recipe'])
defineEmits(['click'])
</script>
<style scoped>
.card {
  background: var(--color-card);
  border-radius: var(--border-radius);
  box-shadow: 0 2px 18px #b8b4ff29;
  max-width: 340px;
  min-width: 240px;
  margin: 1rem;
  padding: 0;
  overflow: hidden;
  cursor: pointer;
  display: flex; flex-direction: column;
  transition: box-shadow 0.23s;
}
.card:hover {
  box-shadow: 0 4px 28px #6c63ff21;
}
.card-img {
  width: 100%;
  object-fit: cover;
  min-height: 170px;
  max-height: 188px;
}
.card-body {
  padding: 1.3rem 1rem 1rem 1rem;
}
h3 { margin: 0 0 0.5rem 0; }
.chip {
  background: var(--color-accent);
  color: #22223B;
  border-radius: 8px;
  padding: 0.24rem 0.58rem;
  font-size: 0.99rem;
  margin-right: 0.37rem;
  margin-bottom: 0.25rem;
  display: inline-block;
}
.desc { font-size: 1.05rem; color: #3b3c63b9; padding: 0.5rem 0 0.3rem 0;}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.98rem;
  margin-top: 8px;
}
.ingredients { color: #444; }
.view-btn {
  background: var(--color-primary);
  color: #fff;
  border: none;
  border-radius: 7px;
  padding: 0.37rem 1.12rem;
  font-weight: 500;
  cursor: pointer;
  transition: background var(--transition);
}
.view-btn:hover { background: #5145cc; }
</style>
