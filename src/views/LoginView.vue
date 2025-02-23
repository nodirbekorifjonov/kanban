<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { RouterLink } from "vue-router";
import { useAuthStore } from "@/stores/auth";

interface FormState {
  email: string;
  password: string;
}

const authStore = useAuthStore();

const formState = reactive<FormState>({
  email: "",
  password: "",
});

onMounted(() => {
  authStore.getUser();
});
</script>

<template>
  <section
    class="bg-white flex flex-col justify-center items-center w-full h-screen"
  >
    <h1 class="mb-8 text-2xl">Login</h1>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @submit.prevent="authStore.login(formState.email, formState.password)"
    >
      <a-form-item
        label="Email"
        name="email"
        :rules="[{ required: true, message: 'Please input your email!' }]"
      >
        <a-input v-model:value="formState.email" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </a-form-item>

      <span class="mb-4 block ml-2">
        Not registered yet?
        <RouterLink :to="{ name: 'register' }">Sign Up</RouterLink>
      </span>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">LogIn</a-button>
      </a-form-item>
    </a-form>
  </section>
</template>

<style scoped></style>
