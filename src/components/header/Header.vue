<script setup lang="ts">
import { useAuthStore } from "@/stores/auth";
import type { User } from "@/types/user";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons-vue";
import { onMounted, ref, watch } from "vue";
const authStore = useAuthStore();
const user = ref<User | null>(null);

const showUserModal = ref<boolean>(false);

onMounted(() => {
  user.value = JSON.parse(localStorage.getItem("user") || "null");
});
watch(
  () => authStore.userData,
  () => {
    user.value = JSON.parse(localStorage.getItem("user") || "null");
  }
);
</script>

<template>
  <div class="py-8 px-8 bg-[#F8FAFC]">
    <div class="flex justify-between items-center">
      <h2 class="text-[30px] font-plusjakarta-extrabold">
        Kanban Dashboard 🃏
      </h2>
      <div v-if="user" class="relative flex gap-6 items-center">
        <a-avatar
          @click="showUserModal = !showUserModal"
          class="flex! justify-center! items-center! cursor-pointer"
        >
          <template #icon><UserOutlined /></template>
        </a-avatar>

        <div
          v-if="showUserModal"
          class="user-modal absolute py-3 px-4 right-0 bg-white rounded-xl top-11 shadow"
        >
          <h4 class="text-lg font-plusjakarta-bold">{{ user?.name }}</h4>
          <p class="text-gray-600">{{ user?.email }}</p>
          <a-divider class="my-3!" />

          <div
            @click="authStore.logout()"
            class="flex items-center justify-between cursor-pointer"
          >
            <span>Logout</span>
            <a-button
              type="text"
              shape="circle"
              class="flex! justify-center! items-center! text-xl!"
            >
              <LogoutOutlined />
            </a-button>
          </div>
        </div>
      </div>

      <div v-else class="flex gap-2">
        <a-button type="primary" @click="$router.push('/auth/login')"
          >Login</a-button
        >
        <a-button @click="$router.push('/auth/register')">Register</a-button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
