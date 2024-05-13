import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToDoPageHasInited } from 'entities/ToDo/model/selectors/toDoSelectors';
import { toDoActions } from 'entities/ToDo/model/slice/toDoSlice';
import { fetchToDo } from 'entities/ToDo/model/services/fetchToDo/fetchToDo';
import { ThunkConfig } from 'app/providers/StoreProvider';

export const initToDoPage = createAsyncThunk<void, void, ThunkConfig<string>>(
    'toDoPage/initToDoPage',
    async (_, thunkAPI) => {
        const {
            getState,
            dispatch,
        } = thunkAPI;
        const inited = getToDoPageHasInited(getState());

        if (!inited) {
            dispatch(toDoActions.initState());
            dispatch(fetchToDo({}));
        }
    },
);
