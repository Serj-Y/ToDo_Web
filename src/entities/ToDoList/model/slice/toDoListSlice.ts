import { createEntityAdapter, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { createToDoList } from 'feautures/CreateToDoList/model/services/createToDoList';
import { deleteToDoListById } from 'feautures/DeleteToDoListById/model/services/deleteToDoListById';
import { createTask } from 'feautures/CreateTask/model/services/createTask';
import { fetchToDoList } from '../services/fetchToDoLists/fetchToDoList';
import { Task, ToDo } from '../types/toDo';
import { ToDoSchema } from '../types/toDoSchema';

const toDoAdapter = createEntityAdapter<ToDo>({
    selectId: (toDo) => toDo._id,
});

export const getToDo = toDoAdapter.getSelectors<StateSchema>(
    (state) => state.toDoList || toDoAdapter.getInitialState(),
);

const toDoListSlice = createSlice({
    name: 'toDoListSlice',
    initialState: toDoAdapter.getInitialState<ToDoSchema>({
        isLoading: false,
        error: undefined,
        _inited: false,
        entities: {},
        ids: [],
    }),
    reducers: {
        initState: (state) => {
            state._inited = true;
        },
        createTask: (state, action: PayloadAction<{ todoId: string, task: Task }>) => {
            const { todoId, task } = action.payload;
            const toDoList = state.entities[todoId];
            if (toDoList) {
                const updatedTasks = [...toDoList.tasks, task];
                state.entities[todoId] = { ...toDoList, tasks: updatedTasks };
            }
        },
        deleteTask: (state, action: PayloadAction<{ todoId: string, taskId: string }>) => {
            const { todoId, taskId } = action.payload;
            const toDoList = state.entities[todoId];
            if (toDoList) {
                const updatedTasks = toDoList.tasks.filter((task) => task._id !== taskId);
                state.entities[todoId] = { ...toDoList, tasks: updatedTasks };
            }
        },
        updateTask: (state, action: PayloadAction<{ todoId: string, taskId: string, updatedTask: Task }>) => {
            const { todoId, taskId, updatedTask } = action.payload;
            const toDoList = state.entities[todoId];
            if (toDoList) {
                const updatedTasks = toDoList.tasks.map((task) => (task._id === taskId ? updatedTask : task));
                state.entities[todoId] = { ...toDoList, tasks: updatedTasks };
            }
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
            .addCase(createToDoList.fulfilled, (state, action) => {
                state.isLoading = false;
                toDoAdapter.addOne(state, action.payload);
            })
            .addCase(deleteToDoListById.fulfilled, (state, action) => {
                state.isLoading = false;
                toDoAdapter.removeOne(state, action.payload._id);
            })
            // .addCase(createTask.fulfilled, (state, action) => {
            //     const { todo } = action.payload;
            //     const task = action.payload;
            //     const toDoList = state.entities[todo];
            //     if (toDoList) {
            //         const updatedToDoList = {
            //             ...toDoList,
            //             tasks: [...toDoList.tasks, task],
            //         };
            //         state.entities[todo] = updatedToDoList;
            //     }
            // })
            .addCase(fetchToDoList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: todosPageReducer,
    actions: todosPageActions,
} = toDoListSlice;
