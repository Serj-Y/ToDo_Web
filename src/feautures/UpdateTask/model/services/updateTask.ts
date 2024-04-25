import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Task, TaskStatus } from 'entities/Task';

interface UpdateTaskProps {
    taskId: string
    taskStatus: TaskStatus
    toDoId: string
    taskName?: string
}

type UpdatedTask = {
    toDoId: string,
    taskId: string,
    updatedTask: Task,
}

export const updateTask = createAsyncThunk<
    UpdatedTask,
    UpdateTaskProps,
    ThunkConfig<string>
>(
    'todo/updateTask',
    async (newTaskData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        const newTask = {
            name: newTaskData.taskName,
            taskId: newTaskData.taskId,
            status: newTaskData.taskStatus,
        };
        try {
            const response = await extra.api.patch<Task>('task/', newTask);
            if (!response.data) {
                rejectWithValue(response.statusText);
            }
            return { toDoId: newTaskData.toDoId, taskId: newTaskData.taskId, updatedTask: response.data };
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
