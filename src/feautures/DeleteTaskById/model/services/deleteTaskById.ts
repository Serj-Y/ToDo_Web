import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { todosPageActions } from '../../../../entities/ToDoList/model/slice/toDoListSlice';
import { Task } from '../../../../entities/Task/module/types/task';

interface DeleteToDoListByIdProps {
    toDoId: string
    taskId: string
    replace?: boolean;
}

export const deleteTaskById = createAsyncThunk<
    Task,
    DeleteToDoListByIdProps,
    ThunkConfig<string>
>(
    'todo/deleteTask',
    async (taskIdForDelete, thunkAPI) => {
        const { extra, dispatch, rejectWithValue } = thunkAPI;
        const forDeleteData = { taskId: taskIdForDelete.taskId, todoId: taskIdForDelete.toDoId };
        try {
            const response = await extra.api.delete<Task>('task/', { data: forDeleteData });
            if (!response.data) {
                rejectWithValue(response.statusText);
            }
            dispatch(todosPageActions.deleteTask(forDeleteData));
            return response.data;
        } catch (e) {
            console.log(e);
            return rejectWithValue('error');
        }
    },
);
