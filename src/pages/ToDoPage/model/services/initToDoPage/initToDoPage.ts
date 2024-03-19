import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    getToDoPageHasInited,
} from '../../selectors/mainPageSelectors';
import { todosPageActions } from '../../slice/toDoPageSlice';
import {
    fetchToDoList,
} from '../fetchToDoLists/fetchToDoList';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';

export const initToDoPage = createAsyncThunk<void>(
    'toDoPage/initToDoPage',
    async (searchParams, thunkAPI) => {
        const {
            getState,
            dispatch,
        } = thunkAPI;
        // @ts-ignore
        const inited = getToDoPageHasInited(getState());
        if (!inited) {
            dispatch(todosPageActions.initState());

            // @ts-ignore
            dispatch(fetchToDoList({}));
        }
    },
);
