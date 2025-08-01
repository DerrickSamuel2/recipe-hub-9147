<template>
  <header class="app-header">
    <div class="logo">
      <span class="logo-dot"></span>
      <span class="brand">RecipeHub</span>
    </div>
    <nav>
      <NuxtLink to="/" class="nav-link">All Recipes</NuxtLink>
      <NuxtLink to="/create" class="nav-link">Add Recipe</NuxtLink>
    </nav>
    <div class="user-section">
      <!-- All features are public, so no login/register/logout UI for now -->
    </div>
  </header>
</template>
<script setup lang="ts">
// No props or emits for now
</script>
<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-header);
  padding: 1.25rem 2vw;
  border-bottom: 1px solid #e0e0ed;
  box-shadow: 0 2px 10px #ddd2ff26;
}
.logo {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: var(--color-primary);
  font-size: 1.35rem;
}
.logo-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--color-primary);
  margin-right: 8px;
}
.brand { letter-spacing: 1px; }
.nav-link {
  margin-left: 1.5rem;
  color: var(--color-primary);
  font-weight: 500;
  font-size: 1.1rem;
}
.user-section {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.user-section button {
  background: var(--color-secondary);
  color: #fff;
  border: none;
  padding: 0.45rem 1rem;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
}
.user-section button:hover {
  background: #da5061;
}
</style>
