import { StateSchema } from 'app/providers/StoreProvider';

export const getToDoPageIsLoading = (state: StateSchema) => state.toDoList?.isLoading || false;
export const getToDoPageError = (state: StateSchema) => state.toDoList?.error;
export const getToDoPageHasInited = (state: StateSchema) => state.toDoList?._inited;
