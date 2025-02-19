<script lang="ts" setup>
import { reactive } from "vue";
import { RouterLink } from "vue-router";

interface FormState {
  username: string;
  email: string;
  password: string;
}

import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();

const formState = reactive<FormState>({
  username: "",
  email: "",
  password: "",
});
</script>

<template>
  <section
    class="fixed top-0 left-0 bottom-0 z-50 bg-white w-screen h-screen flex flex-col justify-center items-center"
  >
    <h1 class="mb-8 text-2xl">Register</h1>
    <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @submit.prevent="
        authStore.register(
          formState.email,
          formState.password,
          formState.username
        )
      "
    >
      <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item
        label="Email"
        name="email"
        :rules="[
          {
            required: true,
            message: 'Please input your email!',
            type: 'email',
          },
        ]"
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
        Already have an account?
        <RouterLink :to="{ name: 'login' }">Login</RouterLink>
      </span>

      <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
        <a-button type="primary" html-type="submit">Register</a-button>
      </a-form-item>
    </a-form>
  </section>
</template>

<style scoped></style>
