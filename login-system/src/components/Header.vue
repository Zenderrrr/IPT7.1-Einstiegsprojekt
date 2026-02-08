<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <header class="header">
    <div class="inner">
      <RouterLink class="brand" to="/login">ProductManagement</RouterLink>

      <nav class="nav">
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/registration">Sign Up</RouterLink>
        <RouterLink to="/products">Products</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 5;
  padding: 14px 12px;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.inner {
  width: min(1100px, 92vw);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
}

.brand {
  color: #fff;
  text-decoration: none;
  font-weight: 800;
  letter-spacing: 0.2px;
}

.nav {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
}

.nav a {
  color: rgba(255, 255, 255, 0.92);
  text-decoration: none;
  font-weight: 600;
  padding: 6px 10px;
  border-radius: 999px;
}

.nav a.router-link-active {
  background: rgba(255, 255, 255, 0.16);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

@media (max-width: 520px) {
  .inner {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
