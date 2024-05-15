import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Task } from 'entities/Task/module/types/task';
import { toDoActions } from '../../../../entities/ToDo/model/slice/toDoSlice';

interface CreateTaskProps {
    taskName: string
    toDoId: string
    taskId?: string
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
    'toDo/task/createTask',
    async (newTaskData, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        const newTask = {
            name: newTaskData.taskName,
            todoId: newTaskData.toDoId,
            _id: newTaskData.taskId,
        };
        try {
            const response = await extra.api.post<Task>('task/', newTask);
            if (!response.data) {
                rejectWithValue(response.statusText);
            }
            return { task: response.data, toDoId: newTaskData.toDoId };
        } catch (e: any) {
            if (!e) {
                dispatch(toDoActions.createTask(newTaskData));
            }
            console.log(e);
            return rejectWithValue(e);
        }
    },
);
