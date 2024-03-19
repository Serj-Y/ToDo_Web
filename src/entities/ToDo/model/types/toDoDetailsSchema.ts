import { ToDo } from './toDo';

export interface ToDoDetailsSchema {
    isLoading: boolean;
    error?: string;
    data?: ToDo;
}
