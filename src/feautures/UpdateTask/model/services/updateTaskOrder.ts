import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Task } from 'entities/Task';

interface UpdateTaskOrderProps {
    firstId: string
    secondId: string
    replace?: boolean;
}

export const updateTaskOrder = createAsyncThunk<
    Task,
    UpdateTaskOrderProps,
    ThunkConfig<string>
>(
    'todo/updateTaskOrder',
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
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
