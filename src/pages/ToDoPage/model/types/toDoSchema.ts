import { EntityState } from '@reduxjs/toolkit';
import { ToDo } from '../../../../entities/ToDo';

export interface ToDoSchema extends EntityState<ToDo> {
    _inited: boolean;
    isLoading?: boolean,
    error?: string,
    data?: ToDo
}
