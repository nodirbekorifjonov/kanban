<script setup lang="ts">
import { PlusOutlined, MoreOutlined } from "@ant-design/icons-vue";
import { h, ref, watch } from "vue";
import type { Task } from "@/types/task";

import { useColumnsStore } from "@/stores/columns";
import { useTasksStore } from "@/stores/tasks";

const columnsStore = useColumnsStore();
const tasksStore = useTasksStore();

let draggedTask = ref<Task | null>(null);
let draggedColumnIndex = ref<number | null>(null);
let draggedTaskIndex = ref<number | null>(null);

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

watch(
  () => tasksStore.newTask,
  () => {
    columnsStore.fetchColumns();
  }
);
</script>

<template>
  <div class="kanban-board flex gap-4 overflow-x-auto">
    <div
      v-for="(column, columnIndex) in columnsStore.columns"
      :key="column.$id"
      class="w-[344px] p-3 bg-[#f8fafc] rounded-4xl shrink-0 flex flex-col gap-4"
      @dragover.prevent
      @drop="onDrop(columnIndex)"
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
  </div>
</template>

<style scoped></style>
