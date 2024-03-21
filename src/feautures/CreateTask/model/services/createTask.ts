import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';

import { todosPageActions } from '../../../../entities/ToDoList/model/slice/toDoListSlice';
import { Task } from '../../../../entities/ToDoList/model/types/toDo';

interface CreateTaskProps {
    taskName: string
    toDoListId: string
}

export const createTask = createAsyncThunk<
    Task,
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
            dispatch(todosPageActions.createTask({ todoId: newTaskData.toDoListId, task: response.data }));
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
