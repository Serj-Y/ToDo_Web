import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    getToDoPageHasInited,
} from '../../selectors/toDoPageSelectors';
import { todosPageActions } from '../../slice/toDoPageSlice';
import {
    fetchToDoList,
} from '../fetchToDoLists/fetchToDoList';
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
