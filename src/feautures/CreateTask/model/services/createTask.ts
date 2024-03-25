import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Task } from 'entities/Task/module/types/task';

interface CreateTaskProps {
    taskName: string
    toDoListId: string
}

type TaskResponse ={
   task:Task,
    toDoId: string
}

export const createTask = createAsyncThunk<
    TaskResponse,
    CreateTaskProps,
    ThunkConfig<string>
>(
    'todo/createTask',
    async (newTaskData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        const newTask = {
            name: newTaskData.taskName,
            todoId: newTaskData.toDoListId,
        };
        try {
            const response = await extra.api.post<Task>('task/', newTask);
            if (!response.data) {
                rejectWithValue(response.statusText);
            }
            return { task: response.data, toDoId: newTaskData.toDoListId };
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
