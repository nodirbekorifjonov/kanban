import type { Task } from "./task";

export interface Column {
    $id: string;
    title: string;
    tasks: Task[];
    color: string;
    order: number | string
}