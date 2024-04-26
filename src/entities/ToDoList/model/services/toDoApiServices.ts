import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from 'shared/api/rtkApi';
import { ToDo } from '../types/toDo';
import { Task, TaskStatus } from '../../../Task';

interface UpdateTodoName {
    name: string,
    todoId: string
}
interface CreateTask {
    name: string,
    todoId: string,
}
interface UpdateTask {
    taskId: string,
    todoId: string
    status: TaskStatus,
    name?: string,
}
interface DeleteTask {
    taskId: string,
    todoId: string
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
    refetchOnFocus: true,
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
            async onQueryStarted(formData, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled.then((res) => {
                        const updatedTodo = res.data;
                        dispatch(toDoApiServices.util.updateQueryData('fetchToDo', undefined, (draft) => {
                            const todoIndex = draft.findIndex((t) => t._id === updatedTodo._id);
                            if (todoIndex !== -1) {
                                draft[todoIndex] = { ...draft[todoIndex], ...updatedTodo };
                            }
                        }));
                    });
                } catch (error) {
                    console.error('Failed to update todo:', error);
                }
            },
        }),
        createToDo: builder.mutation<ToDo, {name: string}>({
            query: (formData) => ({
                url: 'todo/',
                method: 'post',
                data: formData,
            }),
            async onQueryStarted(formData, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled.then((res) => {
                        const newTodo = res.data;
                        dispatch(toDoApiServices.util.updateQueryData('fetchToDo', undefined, (draft) => {
                            draft.push(newTodo);
                        }));
                    });
                } catch (error) {
                    console.error('Failed to create todo:', error);
                }
            },
        }),
        deleteToDo: builder.mutation<ToDo, {todoId: string}>({
            query: (formData) => ({
                url: 'todo/',
                method: 'delete',
                data: formData,
            }),
            async onQueryStarted(formData, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled.then((res) => {
                        const forDeleteTodo = res.data;
                        dispatch(toDoApiServices.util.updateQueryData('fetchToDo', undefined, (draft) => {
                            const todoIndex = draft.findIndex((t) => t._id === forDeleteTodo._id);
                            if (todoIndex !== -1) {
                                draft.splice(todoIndex, 1);
                            }
                        }));
                    });
                } catch (error) {
                    console.error('Failed to delete todo:', error);
                }
            },
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
            async onQueryStarted(formData, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled.then((res) => {
                        const updatedTask = res.data;
                        dispatch(toDoApiServices.util.updateQueryData('fetchToDo', undefined, (draft) => {
                            const todoIndex = draft.findIndex((t) => t._id === formData.todoId);
                            if (todoIndex !== -1) {
                                const forChange = draft[todoIndex];
                                const taskIndex = forChange.tasks.findIndex((task) => task._id === updatedTask._id);
                                if (taskIndex !== -1) {
                                    draft[todoIndex].tasks[taskIndex] = updatedTask;
                                }
                            }
                        }));
                    });
                } catch (error) {
                    console.error('Failed to update task:', error);
                }
            },
        }),
        createTask: builder.mutation<Task, CreateTask>({
            query: (formData) => ({
                url: 'task/',
                method: 'post',
                data: formData,
            }),
            async onQueryStarted(formData, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled.then((res) => {
                        const createTask = res.data;
                        dispatch(toDoApiServices.util.updateQueryData('fetchToDo', undefined, (draft) => {
                            const todoIndex = draft.findIndex((t) => t._id === formData.todoId);
                            if (todoIndex !== -1) {
                                draft[todoIndex].tasks.push(createTask);
                            }
                        }));
                    });
                } catch (error) {
                    console.error('Failed to create task:', error);
                }
            },
        }),
        deleteTask: builder.mutation<Task, DeleteTask >({
            query: (formData) => ({
                url: 'task/',
                method: 'delete',
                data: formData,
            }),
            async onQueryStarted(formData, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled.then((res) => {
                        const deletedTask = res.data;
                        dispatch(toDoApiServices.util.updateQueryData('fetchToDo', undefined, (draft) => {
                            const todoIndex = draft.findIndex((t) => t._id === formData.todoId);
                            if (todoIndex !== -1) {
                                const todo = draft[todoIndex];
                                const taskIndex = todo.tasks.findIndex((task) => task._id === deletedTask._id);
                                if (taskIndex !== -1) {
                                    draft[todoIndex].tasks.splice(taskIndex, 1);
                                }
                            }
                        }));
                    });
                } catch (error) {
                    console.error('Failed to delete task:', error);
                }
            },
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
