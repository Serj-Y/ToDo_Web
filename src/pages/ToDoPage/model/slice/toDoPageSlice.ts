import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToDoPageSchema } from '../types/toDoPageSchema';
import { fetchToDoList } from '../services/fetchToDoLists/fetchToDoList';
import { ToDo } from '../../../../entities/ToDo';
import { StateSchema } from '../../../../app/providers/StoreProvider';

const toDoAdapter = createEntityAdapter<ToDo>({
    selectId: (toDo) => toDo._id,
});

export const getToDo = toDoAdapter.getSelectors<StateSchema>(
    (state) => state.toDo || toDoAdapter.getInitialState(),
);

const toDoPageSlice = createSlice({
    name: 'toDoPageSlice',
    initialState: toDoAdapter.getInitialState<ToDoPageSchema>({
        isLoading: false,
        error: undefined,
        ids: [],
        entities: {},
        _inited: false,
    }),
    reducers: {
        initState: (state) => {
            state._inited = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchToDoList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    toDoAdapter.removeAll(state);
                }
            })
            .addCase(fetchToDoList.fulfilled, (state, action) => {
                state.isLoading = false;

                if (action.meta.arg.replace) {
                    toDoAdapter.setAll(state, action.payload);
                } else {
                    toDoAdapter.addMany(state, action.payload);
                }
            })
            .addCase(fetchToDoList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: todosPageReducer,
    actions: todosPageActions,
} = toDoPageSlice;
