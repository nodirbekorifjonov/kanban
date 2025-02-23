<script setup lang="ts">
import { RouterView } from "vue-router";
import { Header } from "@/components";
</script>

<template>
  <header>
    <Header />
  </header>
  <main>
    <RouterView />
  </main>
</template>
