import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { todosPageActions } from '../../../../entities/ToDoList/model/slice/toDoListSlice';
import { Task } from '../../../../entities/ToDoList/model/types/toDo';
import { TaskStatus } from '../../../../entities/TaskStatus';

interface UpdateTaskProps {
    taskName: string
    taskId: string
    taskStatus: TaskStatus
    toDoId: string
}

export const updateTask = createAsyncThunk<
    Task,
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
            dispatch(todosPageActions.updateTask({
                updatedTask: response.data,
                todoId: newTaskData.toDoId,
                taskId: newTaskData.taskId,
            }));
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
