import { EntityState } from '@reduxjs/toolkit';
import { ToDo } from '../../../../entities/ToDo';

export interface ToDoPageSchema extends EntityState<ToDo> {
    isLoading?: boolean,
    error?: string,
    _inited: boolean
}
