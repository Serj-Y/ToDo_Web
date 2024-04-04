import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ToDo } from 'entities/ToDoList';

interface UpdateToDoListNameProps {
    todoId: string
    name?: string
    order?: number
    replace?: boolean;
}

export const updateToDoName = createAsyncThunk<
    ToDo,
    UpdateToDoListNameProps,
    ThunkConfig<string>
>(
    'todo/updateToDoName',
    async (toDoName, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.patch<ToDo>('todo/', toDoName);
            if (!response.data) {
                rejectWithValue(response.statusText);
            }
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
