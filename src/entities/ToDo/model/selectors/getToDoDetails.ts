import { StateSchema } from '../../../../app/providers/StoreProvider';

export const getToDoDetailsError = (state: StateSchema) => state.toDo?.error;
export const getToDoDetailsIsLoading = (state: StateSchema) => state.toDo?.isLoading || false;
