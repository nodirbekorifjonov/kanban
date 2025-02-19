import { reactive, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Column } from '@/types/column';
import { COLUMNS, DATABASE_ID } from '@/constants';
import { DATABASE } from '@/libs/appwrite';

export const useColumnsStore = defineStore('columns', () => {
    let columns = reactive<Column[]>([]);
    // let columns = ref<object>({})
    async function fetchColumns() {
        try {
            const { documents } = await DATABASE.listDocuments(DATABASE_ID, COLUMNS);
            documents.map((column: any) => {
                columns.push({
                    $id: column.id,
                    title: column.title,
                    tasks: column.tasks || [],
                    color: column.color || "#f8fafc",
                });
            });
            console.log(documents);
        } catch (error) {
            console.log(error);

        }
    };

    return { columns, fetchColumns }
})
