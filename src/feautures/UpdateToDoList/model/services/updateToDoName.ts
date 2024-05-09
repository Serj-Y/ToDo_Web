import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ToDo } from 'entities/ToDoList';
import { todosPageActions } from 'entities/ToDoList/model/slice/toDoListSlice';

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
        } catch (e: any) {
            if (!e) {
                dispatch(todosPageActions.updateToDo(toDoName));
                console.log(e);
            }
            console.log(e);
            return rejectWithValue(e);
        }
    },
);
