import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ToDo } from 'entities/ToDoList';
import { todosPageActions } from 'entities/ToDoList/model/slice/toDoListSlice';
import { AxiosResponse } from 'axios';

interface DeleteToDoListByIdProps {
    toDoId: string
    replace?: boolean;
}

export const deleteToDoListById = createAsyncThunk<
    ToDo,
    DeleteToDoListByIdProps,
    ThunkConfig<string>
>(
    'todo/deleteTodo',
    async (toDoListIdForDelete, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        const forDeleteData = { todoId: toDoListIdForDelete.toDoId };
        try {
            const response = await extra.api.delete<ToDo>('todo/', { data: forDeleteData });
            if (!response.data) {
                rejectWithValue(response.statusText);
            }
            return response.data;
        } catch (e: any) {
            if (!e) {
                dispatch(todosPageActions.deleteToDo(forDeleteData));
                console.log(e);
            }
            console.log(e);
            return rejectWithValue(e);
        }
    },
);
