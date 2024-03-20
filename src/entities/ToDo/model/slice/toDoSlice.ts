import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToDo } from '../types/toDo';
import {
    fetchToDoById,
} from '../services/fetchToDoById/fetchToDoById';
import { ToDoDetailsSchema } from '../types/toDoDetailsSchema';

const initialState: ToDoDetailsSchema = {
    isLoading: false,
    error: undefined,
    data: undefined,

};
export const toDoSlice = createSlice({
    name: 'toDoSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchToDoById.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchToDoById.fulfilled, (state, action: PayloadAction<ToDo>) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchToDoById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: articleDetailsActions } = toDoSlice;
export const { reducer: articleDetailsReducer } = toDoSlice;
