import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Task } from 'entities/Task/module/types/task';
import { todosPageActions } from '../../../../entities/ToDoList/model/slice/toDoListSlice';

interface DeleteTaskByIdProps {
    toDoId: string
    taskId: string
    replace?: boolean;
}

type DeleteTaskByIdResponse = {
    toDoId: string,
    taskId:string,
}

export const deleteTaskById = createAsyncThunk<
    DeleteTaskByIdResponse,
    DeleteTaskByIdProps,
    ThunkConfig<string>
>(
    'todo/deleteTask',
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
                dispatch(todosPageActions.deleteTask(forDeleteData));
            }
            console.log(e);
            return rejectWithValue(e);
        }
    },
);
