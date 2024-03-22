import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ToDo } from 'entities/ToDoList';

interface UpdateToDoListProps {
    name: string
    todoId: string
    replace?: boolean;
}

export const updateToDoList = createAsyncThunk<
    ToDo,
    UpdateToDoListProps,
    ThunkConfig<string>
>(
    'todo/updateToDo',
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
