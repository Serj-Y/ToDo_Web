import { createAsyncThunk } from '@reduxjs/toolkit';
import { ToDo } from '../../../../../entities/ToDo';
import { ThunkConfig } from '../../../../../app/providers/StoreProvider';

interface FetchArticlesListProps {
    replace?: boolean
}

export const fetchToDoList = createAsyncThunk<ToDo[], FetchArticlesListProps, ThunkConfig<string>>(
    'toDoPage/fetchToDoLists',
    async (args, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
            getState,
        } = thunkAPI;
        try {
            const response = await extra.api.get<ToDo[]>('todo/', {
                params: {

                },
            });
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
