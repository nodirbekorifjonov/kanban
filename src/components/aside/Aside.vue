<script setup lang="ts">
import {
  SearchOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  UserOutlined,
  InboxOutlined,
  CreditCardOutlined,
  SettingOutlined,
  MessageOutlined,
  WarningOutlined,
  CloseOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
import { ref } from "vue";
import { RouterLink } from "vue-router";

import { useAsideStore } from "@/stores/aside";

const asideStore = useAsideStore()

const menuData = [
  {
    title: "Home",
    icon: HomeOutlined,
    count: 10,
    id: "home",
  },
  {
    title: "Tasks",
    icon: UnorderedListOutlined,
    count: 0,
    id: "tasks",
  },
  {
    title: "Users",
    icon: UserOutlined,
    count: 2,
    id: "users",
  },
  {
    title: "APIs",
    icon: InboxOutlined,
    count: 0,
    id: "api",
  },
  {
    title: "Subscription",
    icon: CreditCardOutlined,
    count: 0,
    id: "subscription",
  },
  {
    title: "Settings",
    icon: SettingOutlined,
    count: 0,
    id: "settingss",
  },
  {
    title: "Help & Support",
    icon: MessageOutlined,
    count: 0,
    id: "help",
  },
];


window.addEventListener('keydown', (e) => {
  if (e.key === "Control" && e.shiftKey) {
    asideStore.showAside = !asideStore.showAside;
  }  
});

window.addEventListener('resize', () => {
  asideStore.showAside = window.innerWidth > 768;
});
</script>

<template>
  <div
    class="w-[312px] py-8 px-4 flex flex-col justify-between h-screen overflow-y-auto gap-[52px] bg-[#fff] border-r border-[#E2E8F0] transition " :class="!asideStore.showAside && 'max-[768px]:translate-x-[100%] max-[768px]:opacity-0'"
  >
    <div class="flex flex-col gap-8">
      <!-- Logo -->
      <RouterLink :to="{ name: 'home' }">
        <span
          class="text-[#1E293B] font-plusjakarta-extrabold select-none cursor-pointer"
          >Crevtive</span
        >
      </RouterLink>
      <!-- Search input -->
      <a-input placeholder="Search..." class="rounded-full! outline-none">
        <template #prefix>
          <search-outlined />
        </template>
      </a-input>
      <!-- Menu -->
      <ul>
        <li
          v-for="menu in menuData"
          :key="menu.id"
          class="flex items-center gap-[8px] p-3 cursor-pointer hover:bg-[#F8FAFC] font-plusjakarta-bold select-none rounded-[4px]"
        >
          <component :is="menu.icon"></component>
          <span> {{ menu.title }} </span>
          <span
            v-if="menu.count > 0"
            class="px-[10px] py-[4px] rounded-full border border-[#A5B4FC] bg-[#EEF2FF] text-[#4F46E5] text-[14px] leading-[1.4] font-plusjakarta-semibold ml-auto"
            >{{ menu.count }}</span
          >
        </li>
      </ul>
    </div>
    <div>
      <div
        class="text-sm p-4 bg-[#F8FAFC] rounded-3xl flex flex-col gap-4 text-[#475569] mb-6"
      >
        <div class="flex justify-between items-start">
          <span
            class="flex justify-center items-center w-10 h-10 bg-[#E2E8F0] rounded-full text-[18px]"
          >
            <WarningOutlined />
          </span>
          <a-button
            type="text"
            shape="circle"
            class="flex! justify-center! items-center!"
            ><CloseOutlined
          /></a-button>
        </div>
        <p class="text-[#475569]">
          Enjoy unlimited access to our app with only a small price monthly.
        </p>
        <div class="font-plusjakarta-bold! flex items-center">
          <a-button type="text" class="font-plusjakarta-bold!"
            >Dismiss</a-button
          >
          <a-button type="link" class="font-plusjakarta-bold!">Go Pro</a-button>
        </div>
      </div>
      <div class="flex items-center gap-3 border-t pt-6 border-[#E2E8F0]">
        <a-avatar class="flex! justify-center! items-center!">
          <template #icon><UserOutlined /></template>
        </a-avatar>
        <div class="">
          <h4 class="font-plusjakarta-bold text-[#1E293B]!">Azunyan U. Wu</h4>
          <p class="font-plusjakarta-semibold text-sm text-[#475569]">
            Basic Member
          </p>
        </div>
        <a-button
          type="text"
          shape="circle"
          class="flex! justify-center! items-center! ml-auto text-xl!"
          ><LogoutOutlined
        /></a-button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
