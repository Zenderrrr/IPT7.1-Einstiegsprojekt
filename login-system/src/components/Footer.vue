<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <div class="inner">
      <p>© {{ year }} ProductManagement</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 22px 12px;
  margin-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.inner {
  width: min(1100px, 92vw);
  margin: 0 auto;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.95rem;
}
</style>
