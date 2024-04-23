import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from 'shared/api/rtkApi';
import { string } from 'yup';

export const toDoApiServices = createApi({
    reducerPath: 'toDoApiServices',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['fetchToDo'],
    endpoints: (builder) => ({
        fetchToDo: builder.query({
            query: () => ({
                url: 'todo/',
                method: 'get',
            }),
            providesTags: ['fetchToDo'], // provide unique name in which this unique key is used for invalidation
        }),
        updateToDo: builder.mutation({
            query: (formData) => ({
                url: 'todo/',
                method: 'patch',
                data: formData,
            }),
            invalidatesTags: ['fetchToDo'], // Invalidate fetchJokes on mutation success
        }),
        createToDo: builder.mutation({
            query: (formData) => ({
                url: 'todo/',
                method: 'post',
                data: formData,
            }),
            invalidatesTags: ['fetchToDo'], // Invalidate fetchJokes on mutation success
        }),
        deleteToDo: builder.mutation({
            query: (formData) => ({
                url: 'todo/',
                method: 'delete',
                data: formData,
            }),
            invalidatesTags: ['fetchToDo'], // Invalidate fetchJokes on mutation success
        }),
        changeOrderToDo: builder.mutation({
            query: (formData) => ({
                url: 'todo/swap-orders',
                method: 'put',
                data: formData,
            }),
            invalidatesTags: ['fetchToDo'], // Invalidate fetchJokes on mutation success
        }),
    }),
});
export const {
    useFetchToDoQuery,
    useUpdateToDoMutation,
    useCreateToDoMutation,
    useDeleteToDoMutation,
    useChangeOrderToDoMutation,
} = toDoApiServices;
