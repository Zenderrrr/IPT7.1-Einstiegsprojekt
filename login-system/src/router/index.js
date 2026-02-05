import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegistrationView.vue";
import ProductsView from "../views/ProductsView.vue";

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  { path: "/products", component: ProductsView },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
