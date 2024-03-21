import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    getToDoPageHasInited,
} from '../../../../../entities/ToDoList/model/selectors/toDoPageSelectors';
import { todosPageActions } from '../../../../../entities/ToDoList/model/slice/toDoListSlice';
import {
    fetchToDoList,
} from '../../../../../entities/ToDoList/model/services/fetchToDoLists/fetchToDoList';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';

export const initToDoPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'toDoPage/initToDoPage',
    async (_, thunkAPI) => {
        const {
            getState,
            dispatch,
        } = thunkAPI;

        const inited = getToDoPageHasInited(getState());
        if (!inited) {
            dispatch(todosPageActions.initState());
            dispatch(fetchToDoList({}));
        }
    },
);
