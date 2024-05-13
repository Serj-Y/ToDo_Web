import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ToDo } from '../../types/toDo';

interface FetchToDoProps {
    replace?: boolean
}

export const fetchToDo = createAsyncThunk<ToDo[], FetchToDoProps, ThunkConfig<string>>(
    'toDoPage/fetchToDo',
    async (args, thunkAPI) => {
        const {
            extra,
            rejectWithValue,
            getState,
        } = thunkAPI;
        try {
            const response = await extra.api.get<ToDo[]>('todo/');
            if (!response.data) {
                throw new Error();
            }
            return response.data;
        } catch (e: any) {
            console.log(e);
            return rejectWithValue(e);
        }
    },
);
