import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from 'shared/api/rtkApi';
import { ToDo } from '../types/toDo';
import { Task, TaskStatus } from '../../../Task';

interface UpdateTodoName {
    name: string,
    todoId: string
}
interface createTask {
    name: string,
    todoId: string,
}
interface UpdateTask {
    taskId: string,
    status: TaskStatus,
    name?: string,
}
interface ChangeTaskOrder {
    firstTaskId: string,
    secondTaskId: string,
}
interface ChangeToDoOrder {
    firstTodoId: string,
    secondTodoId: string,
}

export const toDoApiServices = createApi({
    reducerPath: 'toDoApiServices',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['fetchToDo'],
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        fetchToDo: builder.query<ToDo[], void>({
            query: () => ({
                url: 'todo/',
                method: 'get',
            }),
            providesTags: ['fetchToDo'],
        }),
        updateToDo: builder.mutation<ToDo, UpdateTodoName>({
            query: (formData) => ({
                url: 'todo/',
                method: 'patch',
                data: formData,
            }),
            invalidatesTags: ['fetchToDo'],
        }),
        createToDo: builder.mutation<ToDo, {name: string}>({
            query: (formData) => ({
                url: 'todo/',
                method: 'post',
                data: formData,
            }),
            invalidatesTags: ['fetchToDo'],
        }),
        deleteToDo: builder.mutation<ToDo, {todoId: string}>({
            query: (formData) => ({
                url: 'todo/',
                method: 'delete',
                data: formData,
            }),
            invalidatesTags: ['fetchToDo'],
        }),
        changeOrderToDo: builder.mutation<ToDo[], ChangeToDoOrder>({
            query: (formData) => ({
                url: 'todo/swap-orders',
                method: 'put',
                data: formData,
            }),
            invalidatesTags: ['fetchToDo'],
        }),
        updateTask: builder.mutation<Task, UpdateTask>({
            query: (formData) => ({
                url: 'task/',
                method: 'patch',
                data: formData,
            }),
            invalidatesTags: ['fetchToDo'],
        }),
        createTask: builder.mutation<Task, createTask>({
            query: (formData) => ({
                url: 'task/',
                method: 'post',
                data: formData,
            }),
            invalidatesTags: ['fetchToDo'],
        }),
        deleteTask: builder.mutation<Task, {taskId: string}>({
            query: (formData) => ({
                url: 'task/',
                method: 'delete',
                data: formData,
            }),
            invalidatesTags: ['fetchToDo'],
        }),
        changeOrderTask: builder.mutation<Task[], ChangeTaskOrder>({
            query: (formData) => ({
                url: 'task/swap-orders',
                method: 'put',
                data: formData,
            }),
            invalidatesTags: ['fetchToDo'],
        }),
    }),
});
export const {
    useFetchToDoQuery,
    useUpdateToDoMutation,
    useCreateToDoMutation,
    useDeleteToDoMutation,
    useChangeOrderToDoMutation,
    useCreateTaskMutation,
    useUpdateTaskMutation,
    useDeleteTaskMutation,
    useChangeOrderTaskMutation,
} = toDoApiServices;
