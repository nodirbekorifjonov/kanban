import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Column } from '@/types/column';
import { COLUMNS, DATABASE_ID } from '@/constants';
import { DATABASE } from '@/libs/appwrite';

export const useColumnsStore = defineStore('columns', () => {
    let columns = ref<Column[]>([]);

    async function fetchColumns() {
        try {
            const { documents } = await DATABASE.listDocuments(DATABASE_ID, COLUMNS);
            columns.value = [];
            columns.value = documents.map((column: any) => ({
                $id: column.$id,
                title: column.title,
                tasks: column.tasks || [],
                color: column.color || "#f8fafc",
            }));
        } catch (error) {
            console.log(error);
        }
    };

    return { columns, fetchColumns }
});
