<script setup lang="ts">
import { PlusOutlined, MoreOutlined } from "@ant-design/icons-vue";
import { h, onMounted, ref, watch, reactive } from "vue";
import type { Task } from "@/types/task";
import { useColumnsStore } from "@/stores/columns";
import { useTasksStore } from "@/stores/tasks";
import { useAuthStore } from "@/stores/auth";
import type { User } from "@/types/user";

const columnsStore = useColumnsStore();
const tasksStore = useTasksStore();

let draggedTask = ref<Task | null>(null);
let draggedColumnIndex = ref<number | null>(null);
let draggedTaskIndex = ref<number | null>(null);
const user = ref<User | null>(null);

function onDragStart(task: Task, columnIndex: number, taskIndex: number) {
  draggedTask.value = task;
  draggedColumnIndex.value = columnIndex;
  draggedTaskIndex.value = taskIndex;
}

function onDrop(targetColumnIndex: number) {
  if (
    draggedTask.value !== null &&
    draggedColumnIndex.value !== null &&
    draggedTaskIndex.value !== null
  ) {
    columnsStore.columns[draggedColumnIndex.value].tasks.splice(
      draggedTaskIndex.value,
      1
    );

    columnsStore.columns[targetColumnIndex].tasks.push(draggedTask.value);
    tasksStore.updateTaskColumn(
      draggedTask.value.$id,
      columnsStore.columns[targetColumnIndex].$id
    );

    draggedTask.value = null;
    draggedColumnIndex.value = null;
    draggedTaskIndex.value = null;
  }
}

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
  () => tasksStore.newTask,
  () => {
    columnsStore.fetchColumns();
  }
);

watch(
  () => useAuthStore().userData,
  () => {
    columnsStore.fetchColumns();
  }
);

watch(
  () => useAuthStore().userData,
  () => {
    user.value = JSON.parse(localStorage.getItem("user") || "null");
  }
);

// onMounted(async () => {
//   await useAuthStore().getUser();
// });
</script>

<template>
  <div class="kanban-board flex gap-4 overflow-x-auto">
    <div
      v-for="(column, columnIndex) in columnsStore.columns"
      :key="column.$id"
      class="w-[344px] p-3 bg-[#f8fafc] rounded-4xl shrink-0 flex flex-col gap-4 cursor-pointer select-none"
      @dragover.prevent
      @drop="onDrop(columnIndex)"
      @dblclick="columnsStore.deleteColumns(column.$id)"
    >
      <div
        class="text-[#fff] rounded-full py-2 px-3 flex items-center gap-2"
        :style="{ background: column.color }"
      >
        <span
          class="block px-3 py-1.5 bg-white text-sm font-plusjakarta-semibold rounded-full"
          :style="{ color: column.color }"
        >
          {{ column.tasks.length }}
        </span>
        <h3 class="font-plusjakarta-bold">{{ column.title }}</h3>
        <a-button
          @click="tasksStore.handleCreate(column.$id)"
          type="primary"
          shape="circle"
          class="text-white! flex! justify-center! items-center! text-lg! bg-transparent! shadow-none! ml-auto"
        >
          <template #icon>
            <PlusOutlined />
          </template>
        </a-button>
      </div>
      <div
        v-for="(task, taskIndex) in column.tasks"
        :key="task.$id"
        draggable="true"
        @dragstart="onDragStart(task, columnIndex, taskIndex)"
        class="bg-[#fff] p-3 rounded-3xl"
      >
        <div class="flex justify-between items-center mb-3">
          <span
            class="block px-2 py-1 rounded-full text-[12px] font-plusjakarta-semibold"
            :style="{ backgroundColor: column.color + 20, color: column.color }"
          >
            {{ task.importance }}
          </span>
          <a-tooltip title="More" @click="tasksStore.deleteTask(task.$id)">
            <a-button
              shape="circle"
              :icon="h(MoreOutlined)"
              class="flex! justify-center! items-center! border-none! shadow-none! ml-auto"
            />
          </a-tooltip>
        </div>
        <h5 class="font-plusjakarta-bold mb-1.5">{{ task.title }}</h5>
        <p class="mb-4 text-[#475569]">{{ task.description }}</p>
      </div>
    </div>
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
  </div>
</template>

<style scoped></style>
