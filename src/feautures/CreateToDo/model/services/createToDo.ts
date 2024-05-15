import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ToDo } from 'entities/ToDo';
import { toDoActions } from 'entities/ToDo/model/slice/toDoSlice';

interface CreateToDoProps {
    name: string
    _id?: string
    replace?: boolean;
}

export const createToDo = createAsyncThunk<
    ToDo,
    CreateToDoProps,
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
            if (!e) {
                dispatch(toDoActions.createToDo({ name: toDoName.name, _id: toDoName._id }));
            }
            console.log(e);
            return rejectWithValue(e);
        }
    },
);
