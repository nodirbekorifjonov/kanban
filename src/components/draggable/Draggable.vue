<script setup lang="ts">
import { PlusOutlined, MoreOutlined } from "@ant-design/icons-vue";
import { h, reactive, ref } from "vue";

interface Task {
  id: number;
  title: string;
  description: string;
  importance: string;
}

interface Column {
  id: number;
  title: string;
  tasks: Task[];
  color: string;
}

const columns = reactive<Column[]>([
  {
    id: 1,
    title: "To Do",
    tasks: [
      {
        id: 101,
        title: "Vue.js o‘rganish",
        description: "Lorem ipsum dolor set",
        importance: "Important",
      },
      {
        id: 102,
        title: "Kanban loyihasini tugatish",
        description: "Lorem ipsum dolor set",
        importance: "Important",
      },
    ],
    color: "#4F46E5",
  },
  {
    id: 2,
    title: "In Progress",
    tasks: [],
    color: "#F59E0B",
  },
  {
    id: 3,
    title: "Completed",
    tasks: [],
    color: "#22C55E",
  },
]);

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
    columns[draggedColumnIndex.value].tasks.splice(draggedTaskIndex.value, 1);
    columns[targetColumnIndex].tasks.push(draggedTask.value);
    draggedTask.value = null;
    draggedColumnIndex.value = null;
    draggedTaskIndex.value = null;
  }
}
</script>

<template>
  <div class="kanban-board flex gap-4 overflow-x-auto">
    <div
      v-for="(column, columnIndex) in columns"
      :key="column.id"
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
        :key="task.id"
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
          <a-tooltip title="More">
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

<style scoped>
/* .kanban-board {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}

.kanban-column {
  flex: 1;
  background: #f3f4f6;
  border-radius: 12px;
  padding: 10px;
  margin: 0 10px;
  min-height: 250px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background 0.3s;
}

.kanban-column h3 {
  text-align: center;
  font-weight: bold;
  color: #4b5563;
  margin-bottom: 12px;
}

.kanban-item {
  padding: 10px;
  margin-bottom: 8px;
  background: #e5e7eb;
  border-radius: 6px;
  cursor: grab;
  transition: transform 0.2s, background 0.2s;
}

.kanban-item:active {
  cursor: grabbing;
}

.kanban-item:hover {
  background: #d1d5db;
  transform: scale(1.03);
} */
</style>
