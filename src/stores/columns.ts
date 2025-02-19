import { reactive, watch } from 'vue'
import { defineStore } from 'pinia'
import { collection, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import type { Column } from '@/types/column';

export const useColumnsStore = defineStore('columns', () => {
    const columns = reactive<Column[]>([]);
    async function fetchColumns() {
        const querySnapshot = await getDocs(collection(db, "columns"));
        const columnsData = querySnapshot.docs.map((doc) => doc.data());

        columnsData.forEach((column: any) => {
            columns.push({
                id: column.id,
                title: column.title,
                tasks: column.tasks || [],
                color: column.color || "#f8fafc",
            });
        });

        console.log(columnsData);
    };

    return { columns, fetchColumns }
})
