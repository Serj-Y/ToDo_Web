import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ToDo } from 'entities/ToDo';

interface CreateToDoListProps {
    name: string
    replace?: boolean;
}

export const createToDo = createAsyncThunk<
    ToDo,
    CreateToDoListProps,
    ThunkConfig<string>
>(
    'toDo/createToDo',
    async (toDoName, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.post<ToDo>('todo/', toDoName);
            if (!response.data) {
                rejectWithValue(response.statusText);
            }
            return response.data;
        } catch (e: any) {
            console.log(e);
            return rejectWithValue(e);
        }
    },
);
