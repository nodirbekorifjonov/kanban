import type { Task } from "./task";

export interface Column {
    id: number;
    title: string;
    tasks: Task[];
    color: string;
}