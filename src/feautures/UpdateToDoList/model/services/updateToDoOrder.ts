import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { ToDo } from 'entities/ToDoList';
import { todosPageActions } from 'entities/ToDoList/model/slice/toDoListSlice';

interface UpdateToDoOrderProps {
    firstId: string
    secondId: string
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
        const forSwap = {
            firstTodoId: toDoSwap.firstId,
            secondTodoId: toDoSwap.secondId,
        };
        try {
            const response = await extra.api.put<ToDo>('todo/swap-orders', forSwap);
            if (!response.data) {
                rejectWithValue(response.statusText);
            }
            return response.data;
        } catch (e: any) {
            if (!e) {
                dispatch(todosPageActions.changeToDoOrder(toDoSwap));
                console.log(e);
            }
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
