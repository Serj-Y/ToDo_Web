import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Task } from 'entities/Task';
import { toDoActions } from '../../../../entities/ToDo/model/slice/toDoSlice';

interface ChangeTaskOrderProps {
    firstId: string
    secondId: string
    toDoId?: string
    replace?: boolean;
}

export const changeTaskOrder = createAsyncThunk<
    Task,
    ChangeTaskOrderProps,
    ThunkConfig<string>
>(
    'toDo/task/changeTaskOrder',
    async (taskSwap, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        const forSwap = {
            firstTaskId: taskSwap.firstId,
            secondTaskId: taskSwap.secondId,
        };
        try {
            const response = await extra.api.put<Task>('task/swap-orders', forSwap);
            if (!response.data) {
                rejectWithValue(response.statusText);
            }
            return response.data;
        } catch (e: any) {
            if (!e) {
                dispatch(toDoActions.changeTaskOrder(taskSwap));
            }
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
