import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ToDo } from '../../types/toDo';

interface FetchToDoListProps {
    replace?: boolean
}

export const fetchToDoList = createAsyncThunk<ToDo[], FetchToDoListProps, ThunkConfig<string>>(
    'toDoPage/fetchToDoLists',
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
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
