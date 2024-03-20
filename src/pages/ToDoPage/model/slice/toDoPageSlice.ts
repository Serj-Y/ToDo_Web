import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToDo } from 'entities/ToDo';
import { ToDoSchema } from '../types/toDoSchema';
import { fetchToDoList } from '../services/fetchToDoLists/fetchToDoList';
import { StateSchema } from '../../../../app/providers/StoreProvider';

const toDoAdapter = createEntityAdapter<ToDo>({
    selectId: (toDo) => toDo._id,
});

export const getToDo = toDoAdapter.getSelectors<StateSchema>(
    (state) => state.toDo || toDoAdapter.getInitialState(),
);

const toDoPageSlice = createSlice({
    name: 'toDoPageSlice',
    initialState: toDoAdapter.getInitialState<ToDoSchema>({
        isLoading: false,
        error: undefined,
        _inited: false,
        entities: {},
        ids: [],
    }),
    reducers: {
        addToDo: (state, action: PayloadAction<ToDo>) => {
            toDoAdapter.addOne(state, action.payload);
        },
        deleteToDo: (state, action: PayloadAction<string>) => {
            toDoAdapter.removeOne(state, action.payload);
        },
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
