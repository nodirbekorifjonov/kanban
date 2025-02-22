import { DATABASE_ID, TASKS } from "@/constants";
import { DATABASE, UNIQUE_ID } from "@/libs/appwrite";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useColumnsStore } from "./columns";

export const useTasksStore = defineStore('tasks', () => {
    const createModal = ref<boolean>(false)
    const columnId = ref<string | null>(null)
    const newTask = ref<object | null>(null)
    // const userId = ref<string | null>(null)

    function hideCreateModal(): void {
        createModal.value = false
    }

    function handleCreate(id: string): void {
        createModal.value = true
        columnId.value = id
        console.log(columnId.value);

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

    async function createTask(title: string, description: string, importance: string): Promise<void> {
        try {
            newTask.value = null
            const task = await DATABASE.createDocument(DATABASE_ID, TASKS, UNIQUE_ID.unique(), {
                title,
                description,
                importance,
                columns: columnId.value,
            })

            newTask.value = task
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteTask(documentId: string) {
        try {
            await DATABASE.deleteDocument(DATABASE_ID, TASKS, documentId)
            newTask.value = null
            useColumnsStore().fetchColumns()
        } catch (error) {
            console.log(error);
        }
    }

    // async function fetchTasks() {
    //     await DATABASE.listDocuments(DATABASE_ID, TASKS, )
    // }

    return { updateTaskColumn, createModal, hideCreateModal, handleCreate, createTask, newTask, deleteTask }
})