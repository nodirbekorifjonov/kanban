import { DATABASE_ID, TASKS } from "@/constants";
import { DATABASE } from "@/libs/appwrite";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useTasksStore = defineStore('tasks', () => {
    const createModal = ref<boolean>(false)

    function hideCreateModal(): void {
        createModal.value = false
    }

    function handleCreate(): void {
        createModal.value = true
    }

    async function updateTaskColumn(taskId: string, newColumnId: string): Promise<void> {
        try {
            await DATABASE.updateDocument(DATABASE_ID, TASKS, taskId, {
                columns: newColumnId,
            });
        } catch (error) {
            console.error(error);
        }
    }

    return { updateTaskColumn, createModal, hideCreateModal, handleCreate }
})