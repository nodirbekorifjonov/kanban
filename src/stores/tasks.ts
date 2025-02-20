import { DATABASE_ID, TASKS } from "@/constants";
import { DATABASE } from "@/libs/appwrite";
import { defineStore } from "pinia";

export const useTasksStore = defineStore('tasks', () => {
    async function updateTaskColumn(taskId: string, newColumnId: string) {
        try {
            await DATABASE.updateDocument(DATABASE_ID, TASKS, taskId, {
                columns: newColumnId,
            });
        } catch (error) {
            console.error(error);
        }
    }

    return { updateTaskColumn }
})