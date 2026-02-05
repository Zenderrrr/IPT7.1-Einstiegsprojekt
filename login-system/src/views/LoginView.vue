<template>
  <section class="login">
    <form>
      <h1>Login</h1>

      <div class="inputbox">
        <ion-icon name="mail-outline"></ion-icon>
        <input type="text" required />
        <label>Email</label>
      </div>

      <div class="inputbox">
        <ion-icon name="lock-closed-outline"></ion-icon>
        <input type="password" required />
        <label>Password</label>
      </div>

      <div class="forget">
        <label>
          <input type="checkbox" />
          Remember me
        </label>
        <a href="#">Forget Password</a>
      </div>

      <button type="submit">Log in</button>

      <div class="register">
        <p>
          Don't have an account?
          <a href="#">Register</a>
        </p>
      </div>
    </form>
  </section>
</template>

<style scoped>
.login {
  position: relative;
  width: min(420px, 92vw);
  background-color: transparent;
  border: 2px solid rgba(255, 255, 255, 0.5);
  border-radius: 20px;
  backdrop-filter: blur(15px);
  display: flex;
  justify-content: center;
  align-items: center;
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
