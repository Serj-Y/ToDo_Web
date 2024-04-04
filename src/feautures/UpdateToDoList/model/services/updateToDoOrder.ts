import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ToDo } from 'entities/ToDoList';

interface UpdateToDoOrderProps {
    firstTodoId: string
    secondTodoId: string
    replace?: boolean;
}

export const updateToDoOrder = createAsyncThunk<
    ToDo,
    UpdateToDoOrderProps,
    ThunkConfig<string>
>(
    'todo/updateToDoOrder',
    async (toDoSwap, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        try {
            const response = await extra.api.put<ToDo>('todo/swap-orders', toDoSwap);
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
