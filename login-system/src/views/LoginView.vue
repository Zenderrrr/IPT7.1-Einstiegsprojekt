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
<style scoped></style>
