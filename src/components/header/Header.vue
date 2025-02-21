<script setup lang="ts">
import {
  PlusOutlined,
  SearchOutlined,
  ShareAltOutlined,
  UploadOutlined,
} from "@ant-design/icons-vue";
import { h } from "vue";
import { RouterLink } from "vue-router";

const navData = [
  {
    title: "By Status",
    name: "status",
    count: 0,
    active: false,
  },
  {
    title: "By Total Tasks",
    name: "total-tasks",
    count: 12,
    active: true,
  },
  {
    title: "Tasks Due",
    name: "due-tasks",
    count: 0,
    active: false,
  },
  {
    title: "Extra Tasks",
    name: "extra-tasks",
    count: 0,
    active: false,
  },
  {
    title: "Tasks Completed",
    name: "completed-tasks",
    count: 0,
    active: false,
  },
];
</script>

<template>
  <div class="pt-8 px-8 pb-[13px] bg-[#F8FAFC]">
    <div class="flex justify-between items-center">
      <h2 class="text-[30px] font-plusjakarta-extrabold">
        Kanban Dashboard 🃏
      </h2>
      <div class="flex items-center gap-2">
        <a-tooltip title="search">
          <a-button
            shape="circle"
            :icon="h(SearchOutlined)"
            class="flex! justify-center! items-center! border-none! shadow-none!"
          />
        </a-tooltip>
        <a-button
          type="primary"
          shape="round"
          class="flex! flex-row-reverse! items-center! justify-center! gap-2 text-[14px] font-plusjakarta-bold!"
        >
          <template #icon>
            <ShareAltOutlined />
          </template>
          <span class="m-0!">Share</span>
        </a-button>
        <a-tooltip title="upload">
          <a-button
            shape="circle"
            :icon="h(UploadOutlined)"
            class="flex! justify-center! items-center!"
          />
        </a-tooltip>
        <a-tooltip title="add">
          <a-button
            shape="circle"
            :icon="h(PlusOutlined)"
            class="flex! justify-center! items-center!"
          />
        </a-tooltip>
      </div>
    </div>
    <div class="pt-8">
      <nav>
        <ul class="flex overflow-x-scroll">
          <li v-for="nav in navData" class="shrink-0">
            <RouterLink
              to="#"
              class="tracking-[-0.7%] block font-plusjakarta-bold px-4 py-[13px] border-b-2 border-[#CBD5E1] text-[#475569]"
              :class="nav.active && 'text-[#1E293B]! border-[#4F46E5]!'"
              >{{ nav.title }}
              <span
                v-if="nav.count > 0"
                class="px-[10px] py-[4px] rounded-full border border-[#A5B4FC] bg-[#EEF2FF] text-[#4F46E5] text-[14px] leading-[1.4] font-plusjakarta-semibold ml-auto"
                >{{ nav.count }}</span
              ></RouterLink
            >
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped></style>
