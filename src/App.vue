<script setup lang="ts">
import { RouterView } from "vue-router";
import { Aside, Header } from "./components";
import { useAuthStore } from "./stores/auth";
import { onMounted } from "vue";

onMounted(() => {
  useAuthStore().getUser();
});
</script>

<template>
  <aside
    class="fixed top-0 left-0 bottom-0 z-10 max-[768px]:right-0 max-[768px]:left-auto"
  >
    <Aside />
  </aside>
  <header class="ml-[312px] max-[768px]:m-0">
    <Header />
  </header>
  <main class="ml-[312px] max-[768px]:m-0">
    <RouterView />
  </main>
</template>

<style scoped></style>
