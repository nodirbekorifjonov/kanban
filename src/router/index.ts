import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AuthLayouts from "@/layouts/AuthLayouts.vue";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import RegistrationView from "@/views/RegistrationView.vue";

const routes = [
  {
    path: "/",
    component: DefaultLayout,
    children: [
      { path: "", name: "home", component: HomeView },
    ],
  },
  {
    path: "/auth",
    component: AuthLayouts,
    children: [
      { path: "login", name: "login", component: LoginView },
      { path: "register", name: "register", component: RegistrationView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
