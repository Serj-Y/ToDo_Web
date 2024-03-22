import { TaskStatus } from './taskStatus';

export interface Task {
    _id: string
    name: string
    status: TaskStatus
    todo: string
    order: number
    createdAt: string
    updatedAt: string
}
