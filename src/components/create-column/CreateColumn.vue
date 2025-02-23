<script lang="ts" setup>
import type { User } from "@/types/user";
import { reactive, ref, watch } from "vue";
import { useColumnsStore } from "@/stores/columns";
import { useAuthStore } from "@/stores/auth";

const columnsStore = useColumnsStore();
const user = ref<User | null>(null);

interface FormState {
  title: string;
  color: string;
}

const formState = reactive<FormState>({
  title: "",
  color: "#FFB200",
});

function onSubmit() {
  columnsStore.createColumn(
    formState.title,
    formState.color,
    user.value?.$id as string
  );

  formState.title = "";
  formState.color = "#FFB200";
}

watch(
  () => useAuthStore().userData,
  () => {
    user.value = JSON.parse(localStorage.getItem("user") || "null");
  }
);
</script>

<template>
  <div
    class="w-[344px] p-6 bg-[#f8fafc] rounded-4xl shrink-0 flex flex-col gap-4"
  >
    <a-form
      @submit.prevent="onSubmit()"
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 100 }"
      autocomplete="off"
      class="flex! flex-col! items-center! w-full!"
    >
      <a-form-item name="title" class="w-full!">
        <a-input
          v-model:value="formState.title"
          class="w-full! py-2! rounded-3xl!"
          placeholder="Column title"
        />
      </a-form-item>

      <a-form-item>
        <div class="flex items-center gap-2">
          <input
            type="color"
            name="color"
            v-model="formState.color"
            class="cursor-pointer"
          />
          <span>{{ formState.color }}</span>
        </div>
      </a-form-item>

      <a-form-item :wrapper-col="{ offset: 0, span: 16 }" class="m-0!">
        <a-button
          :disabled="formState.title == ''"
          type="primary"
          html-type="submit"
          >Create</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped></style>
