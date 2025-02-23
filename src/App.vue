<script setup lang="ts">
import { RouterView } from "vue-router";
import { useAuthStore } from "./stores/auth";
import { onMounted } from "vue";
import { useColumnsStore } from "./stores/columns";

const columnsStore = useColumnsStore();

onMounted(() => {
  useAuthStore().getUser();
  columnsStore.columns = [];
  columnsStore.fetchColumns();
});
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
