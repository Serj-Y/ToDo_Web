import { Update } from '@reduxjs/toolkit';
import { TaskStatus } from './taskStatus';
import { ToDo } from '../../../ToDoList';

export interface Task {
    _id: string
    name: string
    status: TaskStatus
    todo: string
    order: number
    createdAt: string
    updatedAt: string

    map(param: (task: Task) => ({ changes: any; id: string } | null)): Update<ToDo>[];
}
