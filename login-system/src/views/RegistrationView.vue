<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const username = ref("");
const firstname = ref("");
const lastname = ref("");
const password = ref("");
const language = ref("en");

const loading = ref(false);
const error = ref("");
const success = ref("");

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

async function onSubmit() {
  error.value = "";
  success.value = "";

  if (!isValidEmail(username.value)) {
    error.value = "Please enter a valid email address.";
    return;
  }
  if (firstname.value.length < 2 || lastname.value.length < 2) {
    error.value = "First name and last name must be at least 2 characters.";
    return;
  }
  if (password.value.length < 6) {
    error.value = "Password must be at least 6 characters.";
    return;
  }

  loading.value = true;
  try {
    const res = await fetch("api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        username: username.value,
        firstname: firstname.value,
        lastname: lastname.value,
        password: password.value,
        language: language.value, // de | en | fr
      }),
    });

    if (!res.ok) {
      error.value = "Registration failed. Try another email or check inputs.";
      return;
    }

    success.value = "Account created! Redirecting to login...";
    setTimeout(() => router.push("/login"), 900);
  } catch (e) {
    error.value = "Network error. Please try again.";
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="auth-page">
    <section class="card">
      <form @submit.prevent="onSubmit">
        <h1>Register</h1>

        <p v-if="error" class="msg error">{{ error }}</p>
        <p v-if="success" class="msg success">{{ success }}</p>

        <div class="inputbox">
          <ion-icon name="mail-outline"></ion-icon>
          <input v-model.trim="username" type="email" required />
          <label>Email</label>
        </div>

        <div class="row">
          <div class="inputbox">
            <ion-icon name="person-outline"></ion-icon>
            <input
              v-model.trim="firstname"
              type="text"
              required
              minlength="2"
            />
            <label>First name</label>
          </div>

          <div class="inputbox">
            <ion-icon name="person-outline"></ion-icon>
            <input v-model.trim="lastname" type="text" required minlength="2" />
            <label>Last name</label>
          </div>
        </div>

        <div class="inputbox">
          <ion-icon name="lock-closed-outline"></ion-icon>
          <input v-model="password" type="password" required minlength="6" />
          <label>Password</label>
        </div>

        <div class="selectbox">
          <label class="selectlabel">Language</label>
          <select v-model="language" required>
            <option value="de">Deutsch</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
          </select>
        </div>

        <button type="submit" :disabled="loading">
          {{ loading ? "Creating account..." : "Register" }}
        </button>

        <div class="switch">
          <p>
            Already have an account?
            <RouterLink to="/login">Login</RouterLink>
          </p>
        </div>
      </form>
    </section>
  </section>
</template>

<style scoped>
.auth-page {
  min-height: 100vh;
  min-height: 100dvh;
  display: grid;
  place-items: center;
  padding: 24px 12px;
}

.card {
  width: min(560px, 92vw);
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  background: rgba(255, 255, 255, 0.06);
  padding: clamp(1.25rem, 4vw, 2rem) clamp(1.25rem, 5vw, 3rem);
}

h1 {
  font-size: clamp(1.6rem, 3.5vw, 2rem);
  color: #fff;
  text-align: center;
}

.msg {
  margin: 12px 0 6px;
  padding: 10px 12px;
  border-radius: 10px;
  color: #fff;
  font-size: 0.95rem;
}
.error {
  background: rgba(255, 60, 60, 0.18);
  border: 1px solid rgba(255, 60, 60, 0.35);
}
.success {
  background: rgba(60, 255, 160, 0.16);
  border: 1px solid rgba(60, 255, 160, 0.35);
}

.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}

.inputbox {
  position: relative;
  margin: 22px 0;
  width: 100%;
  border-bottom: 2px solid #fff;
}

.inputbox label {
  position: absolute;
  top: 50%;
  left: 8px;
  transform: translateY(-50%);
  color: #fff;
  font-size: 1rem;
  pointer-events: none;
  transition: all 0.35s ease;
}

.inputbox input:focus ~ label,
.inputbox input:valid ~ label {
  top: 6px;
  font-size: 0.85rem;
  opacity: 0.9;
}

.inputbox input {
  width: 100%;
  height: 56px;
  background: transparent;
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 0 42px 0 8px;
  color: #fff;
}

.inputbox ion-icon {
  position: absolute;
  right: 10px;
  top: 18px;
  color: #fff;
  font-size: 1.2rem;
}

.selectbox {
  margin-top: 6px;
}

.selectlabel {
  display: block;
  color: #fff;
  font-size: 0.95rem;
  margin-bottom: 8px;
}

select {
  width: 100%;
  height: 46px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.45);
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
  outline: none;
  padding: 0 12px;
}

button {
  width: 100%;
  height: 44px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 1);
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: 0.25s ease;
  margin-top: 18px;
}

button:hover {
  background: rgb(0 0 0 / 50%);
  color: #fff;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.switch {
  text-align: center;
  margin-top: 18px;
  color: #fff;
}

.switch a {
  color: #fff;
  font-weight: 700;
  text-decoration: none;
}
.switch a:hover {
  text-decoration: underline;
}

@media (max-width: 560px) {
  .row {
    grid-template-columns: 1fr;
  }
}
</style>
