import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Column } from '@/types/column';
import { COLUMNS, DATABASE_ID } from '@/constants';
import { DATABASE, UNIQUE_ID } from '@/libs/appwrite';
import { Query } from 'appwrite';

export const useColumnsStore = defineStore('columns', () => {
    let columns = ref<Column[]>([]);
    const user_id = ref<string | null>(null);

    async function fetchColumns() {
        const userData = await JSON.parse(localStorage.getItem('user') || 'null');
        user_id.value = userData.$id;
        try {

            const { documents } = await DATABASE.listDocuments(DATABASE_ID, COLUMNS, [
                Query.equal('user_id', user_id.value as string)
            ]);

            if (documents && documents.length) {
                columns.value = documents.sort((a, b) => a.order - b.order) as any[];
            } else {
                columns.value = [];
            }
        } catch (error) {
            console.log(error);
        }
    };

    async function createColumn(title: string, color: string, userId: string) {
        try {
            const response = await DATABASE.createDocument(DATABASE_ID, COLUMNS, UNIQUE_ID.unique(), {
                title: title,
                color: color,
                user_id: userId
            })
            await fetchColumns()
        } catch (error) {
            console.log(error);
            alert("Saytimizdan foydalanishingiz uchun ro'yhatdan o'tishingiz zarur")
        }
    }

    async function deleteColumns(colId: string) {
        try {
            const response = await DATABASE.deleteDocument(DATABASE_ID, COLUMNS, colId)
            if (response) {
                await fetchColumns()
            }
        } catch (error) {
            console.log(error);

        }
    }

    return { columns, fetchColumns, deleteColumns, createColumn }
});
