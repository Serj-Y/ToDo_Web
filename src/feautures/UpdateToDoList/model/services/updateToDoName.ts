import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ToDo } from 'entities/ToDo';
import { toDoActions } from 'entities/ToDo/model/slice/toDoSlice';

interface UpdateToDoNameProps {
    todoId: string
    name: string
    replace?: boolean;
}

export const updateToDoName = createAsyncThunk<
    ToDo,
    UpdateToDoNameProps,
    ThunkConfig<string>
>(
    'toDo/updateToDoName',
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
                dispatch(toDoActions.updateToDoName(toDoName));
                console.log(e);
            }
            console.log(e);
            return rejectWithValue(e);
        }
    },
);
