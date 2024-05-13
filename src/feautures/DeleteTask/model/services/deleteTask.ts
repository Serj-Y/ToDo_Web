import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Task } from 'entities/Task/module/types/task';
import { toDoActions } from '../../../../entities/ToDo/model/slice/toDoSlice';

interface DeleteTaskProps {
    toDoId: string
    taskId: string
    replace?: boolean;
}

type DeleteTaskResponse = {
    toDoId: string,
    taskId:string,
}

export const deleteTask = createAsyncThunk<
    DeleteTaskResponse,
    DeleteTaskProps,
    ThunkConfig<string>
>(
    'toDo/task/deleteTask',
    async (taskForDelete, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        const forDeleteData = { taskId: taskForDelete.taskId, todoId: taskForDelete.toDoId };
        try {
            const response = await extra.api.delete<Task>('task/', { data: forDeleteData });
            if (!response.data) {
                rejectWithValue(response.statusText);
            }
            return { toDoId: taskForDelete.toDoId, taskId: taskForDelete.taskId };
        } catch (e: any) {
            if (!e) {
                dispatch(toDoActions.deleteTask(forDeleteData));
            }
            console.log(e);
            return rejectWithValue(e);
        }
    },
);
