import { Task } from '../../../Task';

export interface ToDo {
    _id: string
    name: string
    order:number
    tasks: Task[],
    createdAt: string
    updatedAt: string
}
