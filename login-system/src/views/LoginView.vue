<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

async function onSubmit() {
  error.value = "";

  if (!isValidEmail(username.value)) {
    error.value = "Please enter a valid email.";
    return;
  }
  if (password.value.length < 6) {
    error.value = "Password must be at least 6 characters.";
    return;
  }

  loading.value = true;
  try {
    const res = await fetch("api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    });

    if (!res.ok) {
      error.value = "Login failed.";
      return;
    }

    localStorage.setItem("loggedIn", "true");
    await router.push("/products");
  } catch (e) {
    error.value = "Network error. Try again.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="auth-page">
    <section class="login">
      <form @submit.prevent="onSubmit">
        <h1>Login</h1>

        <p v-if="error" class="error">{{ error }}</p>

        <div class="inputbox">
          <ion-icon name="mail-outline"></ion-icon>
          <input v-model.trim="username" type="email" required />
          <label>Email</label>
        </div>

        <div class="inputbox">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input v-model="password" type="password" required minlength="6" />
          <label>Password</label>
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? "Logging in..." : "Log in" }}
        </button>

        <div class="register">
          <p>
            Don't have an account?
            <RouterLink to="/registration">Register</RouterLink>
          </p>
        </div>
      </form>
    </section>
  </section>
</template>

<style scoped>
.login {
  position: relative;
  width: min(420px, 92vw);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  padding: 2rem 3rem;
}

h1 {
  font-size: 2rem;
  color: #fff;
  text-align: center;
}

.inputbox {
  position: relative;
  margin: 30px 0;
  width: 100%;
  border-bottom: 2px solid #fff;
}

.inputbox label {
  position: absolute;
  top: 50%;
  left: 5px;
  transform: translateY(-50%);
  color: #fff;
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.5s ease-in-out;
}

input:focus ~ label,
input:valid ~ label {
  top: 5px;
}

.inputbox input {
  width: 100%;
  height: 56px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0 35px 0 5px;
  color: #fff;
}

.inputbox ion-icon {
  position: absolute;
  right: 8px;
  color: #fff;
  font-size: 1.2rem;
  top: 20px;
}

.forget {
  margin: 35px 0;
  font-size: 0.85rem;
  color: #fff;
  display: flex;
  justify-content: space-between;
}

.forget label {
  display: flex;
  align-items: center;
}

.forget label input {
  margin-right: 3px;
}

.forget a {
  color: #fff;
  text-decoration: none;
  font-size: 12px;
  font-weight: 600;
}

.forget a:hover {
  text-decoration: underline;
}

button {
  width: 100%;
  height: 40px;
  border-radius: 40px;
  background-color: rgba(255, 255, 255, 1);
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.4s ease;
}

button:hover {
  background-color: rgb(0 0 0 / 50%);
  color: white;
}

.register {
  font-size: 0.9rem;
  color: #fff;
  text-align: center;
  margin: 25px 0 10px;
}

.register p a {
  text-decoration: none;
  color: #fff;
  font-weight: 600;
}

.register p a:hover {
  text-decoration: underline;
}

.auth-page {
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 24px 12px;
}

.error {
  color: #fff;
  background: rgba(255, 60, 60, 0.2);
  border: 1px solid rgba(255, 60, 60, 0.35);
  padding: 10px 12px;
  border-radius: 10px;
  margin-bottom: 12px;
}

@media (max-width: 360px) {
  .forget {
    flex-direction: column;
    gap: 10px;
    align-items: flex-start;
  }

  button {
    height: 44px;
  }
}
</style>
