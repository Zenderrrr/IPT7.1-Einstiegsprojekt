<template>
  <section class="page">
    <div class="container">
      <div class="top">
        <h1>Products</h1>
        <button class="logout" @click="logout">Logout</button>
      </div>

      <p v-if="loading" class="info">Loading products...</p>
      <p v-else-if="error" class="info error">{{ error }}</p>

      <div v-else class="grid">
        <article v-for="(p, idx) in products" :key="p.id ?? idx" class="card">
          <h3 class="title">{{ p.name ?? p.title ?? "Product" }}</h3>
          <p class="desc">{{ p.description ?? "No description" }}</p>
          <p class="meta" v-if="p.price !== undefined">Price: {{ p.price }}</p>
        </article>

        <p v-if="products.length === 0" class="info">No products found.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const products = ref([]);
const loading = ref(true);
const error = ref("");

async function loadProducts() {
  loading.value = true;
  error.value = "";

  // simple client-side gate (API doc doesn't show token)
  const loggedIn = localStorage.getItem("loggedIn") === "true";
  if (!loggedIn) {
    router.push("/login");
    return;
  }

  try {
    const res = await fetch(
      "https://ipt71.kuno-schuerch.bbzwinf.ch/product/list",
      {
        method: "GET",
        headers: { Accept: "application/json" },
        credentials: "include",
      },
    );

    if (!res.ok) {
      error.value = "Could not load products. Please login again.";
      return;
    }

    const data = await res.json();
    // API might return array or {products:[...]}
    products.value = Array.isArray(data) ? data : (data.products ?? []);
  } catch (e) {
    error.value = "Network error while loading products.";
  } finally {
    loading.value = false;
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  router.push("/login");
}

onMounted(loadProducts);
</script>

<style scoped>
.page {
  padding: 28px 14px 60px;
  min-height: 100vh;
  min-height: 100dvh;
}

.container {
  width: min(1100px, 92vw);
  margin: 0 auto;
}

.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
}

h1 {
  color: #fff;
  font-size: clamp(1.6rem, 3.5vw, 2.2rem);
}

.logout {
  height: 40px;
  padding: 0 16px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.5);
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
  cursor: pointer;
  backdrop-filter: blur(10px);
}

.logout:hover {
  background: rgba(0, 0, 0, 0.45);
}

.info {
  color: #fff;
  opacity: 0.9;
  margin-top: 12px;
}

.info.error {
  background: rgba(255, 60, 60, 0.18);
  border: 1px solid rgba(255, 60, 60, 0.35);
  padding: 10px 12px;
  border-radius: 10px;
  display: inline-block;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin-top: 14px;
}

.card {
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 16px;
  color: #fff;
  min-height: 120px;
}

.title {
  font-size: 1.05rem;
  font-weight: 700;
  margin-bottom: 8px;
}

.desc {
  opacity: 0.9;
  line-height: 1.35;
}

.meta {
  margin-top: 10px;
  opacity: 0.85;
  font-size: 0.95rem;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
@media (max-width: 560px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
