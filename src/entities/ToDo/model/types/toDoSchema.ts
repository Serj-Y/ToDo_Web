import { EntityState } from '@reduxjs/toolkit';
import { ToDo } from './toDo';

export interface ToDoSchema extends EntityState<ToDo> {
    _inited: boolean;
    isLoading?: boolean,
    error?: string,
    data?: ToDo
}
