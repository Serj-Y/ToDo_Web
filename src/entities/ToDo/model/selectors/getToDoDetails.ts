import { StateSchema } from '../../../../app/providers/StoreProvider';

export const getToDoData = (state: StateSchema) => state.toDo?.data;
export const getToDoError = (state: StateSchema) => state.toDo?.error;
export const getToDoIsLoading = (state: StateSchema) => state.toDo?.isLoading || false;
