import { StateSchema } from '../../../../app/providers/StoreProvider';

export const getToDoPageIsLoading = (state: StateSchema) => state.toDo?.isLoading || false;
export const getToDoPageError = (state: StateSchema) => state.toDo?.error;
export const getToDoPageHasInited = (state: StateSchema) => state.toDo?._inited;
export const getToDoPageData = (state: StateSchema) => state.toDo?.data;
