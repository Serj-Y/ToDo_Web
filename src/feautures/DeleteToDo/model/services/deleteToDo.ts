import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ToDo } from 'entities/ToDo';
import { toDoActions } from 'entities/ToDo/model/slice/toDoSlice';
import { AxiosResponse } from 'axios';

interface DeleteToDoProps {
    toDoId: string
    replace?: boolean;
}

export const deleteToDo = createAsyncThunk<
    ToDo,
    DeleteToDoProps,
    ThunkConfig<string>
>(
    'toDo/deleteToDo',
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
                dispatch(toDoActions.deleteToDo(forDeleteData));
                console.log(e);
            }
            console.log(e);
            return rejectWithValue(e);
        }
    },
);
