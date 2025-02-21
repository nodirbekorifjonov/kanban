<script setup lang="ts">
import { reactive, toRaw } from "vue";
import { useTasksStore } from "@/stores/tasks";
import { useAuthStore } from "@/stores/auth";

const taskStore = useTasksStore();
const authStore = useAuthStore();

interface FormState {
  title: string;
  description: string;
  importance: string;
}
const formState = reactive<FormState>({
  title: "",
  description: "",
  importance: "",
});
const onSubmit = () => {
  console.log("submit!", toRaw(formState));
  taskStore.createTask(
    formState.title,
    formState.description,
    formState.importance
    // authStore.userData?.$id
  );
  taskStore.hideCreateModal();
  formState.title = "";
  formState.description = "";
  formState.importance = "";
};
const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 14 };
</script>

<template>
  <a-modal
    v-model:open="taskStore.createModal"
    title="Create Task"
    @ok="onSubmit"
  >
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="Title">
        <a-input v-model:value="formState.title" />
      </a-form-item>

      <a-form-item label="Description">
        <a-textarea v-model:value="formState.description" />
      </a-form-item>

      <a-form-item label="Importance">
        <a-radio-group v-model:value="formState.importance">
          <a-radio value="important">Important</a-radio>
          <a-radio value="unimportant">Unimportant</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button
          :disabled="
            formState.title == '' ||
            formState.description == '' ||
            formState.importance == ''
          "
          type="primary"
          @click="onSubmit"
          >Create</a-button
        >
        <a-button style="margin-left: 10px" @click="taskStore.hideCreateModal()"
          >Cancel</a-button
        >
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style></style>
