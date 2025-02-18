<script setup lang="ts">
import { reactive, ref } from "vue";

const columns = reactive([
  {
    id: 1,
    title: "To Do",
    tasks: [
      { id: 101, title: "Vue.js o‘rganish" },
      { id: 102, title: "Kanban loyihasini tugatish" },
    ],
  },
  {
    id: 2,
    title: "In Progress",
    tasks: [],
  },
  {
    id: 3,
    title: "Done",
    tasks: [],
  },
]);

interface Task {
  id: number;
  title: string;
}

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
  <div class="kanban-board">
    <div
      v-for="(column, columnIndex) in columns"
      :key="column.id"
      class="kanban-column"
      @dragover.prevent
      @drop="onDrop(columnIndex)"
    >
      <h3>{{ column.title }}</h3>
      <div
        v-for="(task, taskIndex) in column.tasks"
        :key="task.id"
        class="kanban-item"
        draggable="true"
        @dragstart="onDragStart(task, columnIndex, taskIndex)"
      >
        {{ task.title }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.kanban-board {
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
}
</style>
