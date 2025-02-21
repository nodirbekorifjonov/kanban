import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Column } from '@/types/column';
import { COLUMNS, DATABASE_ID } from '@/constants';
import { DATABASE, UNIQUE_ID } from '@/libs/appwrite';
import { Query } from 'appwrite';

export const useColumnsStore = defineStore('columns', () => {
    let columns = ref<Column[]>([]);
    const newColumn = ref<Column[] | null>(null)
    const user_id = ref<string | null>(null);

    async function fetchColumns() {
        try {
            const userData = JSON.parse(localStorage.getItem('user') || 'null');
            user_id.value = userData.$id;

            const { documents } = await DATABASE.listDocuments(DATABASE_ID, COLUMNS, [
                Query.equal('user_id', user_id.value as string)
            ]);

            if (documents && documents.length) {
                columns.value = documents.sort((a, b) => a.order - b.order) as any[]
            }
        } catch (error) {
            console.log(error);
        }
    };

    async function createColumn(title: string, color: string, userId: string) {
        try {
            const col = await DATABASE.createDocument(DATABASE_ID, COLUMNS, UNIQUE_ID.unique(), {
                title: title,
                color: color,
                user_id: userId
            })

            await fetchColumns()

            console.log(col);

        } catch (error) {
            console.log(error);

        }
    }

    async function deleteColumns(colId: string) {
        try {
            await DATABASE.deleteDocument(DATABASE_ID, COLUMNS, colId)
            fetchColumns()
        } catch (error) {
            console.log(error);

        }
    }

    return { columns, fetchColumns, deleteColumns, createColumn }
});
