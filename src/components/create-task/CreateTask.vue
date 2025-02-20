<script setup lang="ts">
import { ref, reactive, toRaw } from "vue";
import { useTasksStore } from "@/stores/tasks";

const taskStore = useTasksStore();

interface FormState {
  name: string;
  desc: string;
  importance: string;
}
const formState = reactive<FormState>({
  name: "",
  desc: "",
  importance: "",
});
const onSubmit = () => {
  console.log("submit!", toRaw(formState));
  taskStore.hideCreateModal();
  formState.name = "";
  formState.desc = "";
  formState.importance = "";
};
const labelCol = { style: { width: "150px" } };
const wrapperCol = { span: 14 };
</script>

<template>
  <a-modal
    v-model:open="taskStore.createModal"
    title="Create Task"
    @ok="taskStore.hideCreateModal()"
  >
    <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
      <a-form-item label="Title">
        <a-input v-model:value="formState.name" />
      </a-form-item>

      <a-form-item label="Description">
        <a-textarea v-model:value="formState.desc" />
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
            formState.name == '' ||
            formState.desc == '' ||
            formState.importance == ''
          "
          type="primary"
          @click="onSubmit"
          >Create</a-button
        >
        <a-button style="margin-left: 10px">Cancel</a-button>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<style>
.ant-modal .ant-modal-footer {
  display: none !important;
}
</style>
