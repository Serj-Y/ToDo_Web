import { TaskStatus } from '../../../TaskStatus';

export interface Task {
    _id: string
    name: string
    status: TaskStatus
    todo: string
    order: number
    createdAt: string
    updatedAt: string
}

export interface ToDo {
    _id: string
    name: string
    order:number
    tasks: Task[],
    createdAt: string
    updatedAt: string
}
