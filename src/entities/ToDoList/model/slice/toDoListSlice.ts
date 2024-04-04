import {
    createEntityAdapter, createSlice, Update,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { createToDoList } from 'feautures/CreateToDoList/model/services/createToDoList';
import { deleteToDoListById } from 'feautures/DeleteToDoListById/model/services/deleteToDoListById';
import { updateToDoName } from 'feautures/UpdateToDoList/model/services/updateToDoName';
import { createTask } from 'feautures/CreateTask/model/services/createTask';
import { updateTask } from 'feautures/UpdateTask/model/services/updateTask';
import { deleteTaskById } from 'feautures/DeleteTaskById/model/services/deleteTaskById';
import { updateToDoOrder } from 'feautures/UpdateToDoList/model/services/updateToDoOrder';
import { fetchToDoList } from '../services/fetchToDoLists/fetchToDoList';
import { ToDo } from '../types/toDo';
import { ToDoSchema } from '../types/toDoSchema';
import { updateTaskOrder } from '../../../../feautures/UpdateTask/model/services/updateTaskOrder';

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
            })

            .addCase(deleteToDoListById.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    toDoAdapter.removeAll(state);
                }
            })
            .addCase(deleteToDoListById.fulfilled, (state, action) => {
                state.isLoading = false;
                toDoAdapter.removeOne(state, action.payload._id);
            })
            .addCase(deleteToDoListById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(updateToDoName.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    toDoAdapter.removeAll(state);
                }
            })
            .addCase(updateToDoName.fulfilled, (state, action) => {
                state.isLoading = false;
                const { _id, name } = action.payload;
                toDoAdapter.updateOne(state, { id: _id, changes: { name } });
            })
            .addCase(updateToDoName.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(updateToDoOrder.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    toDoAdapter.removeAll(state);
                }
            })
            .addCase(updateToDoOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                const { payload } = action;
                const updates: Update<ToDo>[] = payload.map((toDo) => ({
                    id: toDo._id,
                    changes: toDo,
                }));
                toDoAdapter.updateMany(state, updates);
            })
            .addCase(updateToDoOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(createToDoList.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    toDoAdapter.removeAll(state);
                }
            })
            .addCase(createToDoList.fulfilled, (state, action) => {
                state.isLoading = false;
                toDoAdapter.addOne(state, action.payload);
            })
            .addCase(createToDoList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(createTask.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.isLoading = false;
                const { toDoId, task } = action.payload;
                const todo = state.entities[toDoId];
                if (todo) {
                    const updatedTodo = {
                        ...todo,
                        tasks: [...todo.tasks, task],
                    };
                    toDoAdapter.updateOne(state, { id: toDoId, changes: updatedTodo });
                }
            })
            .addCase(createTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(updateTask.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.isLoading = false;
                const { toDoId, taskId, updatedTask } = action.payload;
                const todo = state.entities[toDoId];
                if (todo) {
                    const updatedTasks = todo.tasks.map((task) => (task._id === taskId ? updatedTask : task));
                    const updatedTodo = { ...todo, tasks: updatedTasks };
                    toDoAdapter.updateOne(state, { id: toDoId, changes: updatedTodo });
                }
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(updateTaskOrder.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(updateTaskOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                const updates = action.payload.map((task) => {
                    const todoId = task.todo;
                    const todo = state.entities[todoId];
                    if (todo) {
                        return {
                            id: todoId,
                            changes: {
                                ...todo,
                                tasks: todo.tasks.map((t) => (t._id === task._id ? task : t)),
                            },
                        };
                    }
                    return null;
                }).filter((update) => update !== null) as Update<ToDo>[];
                toDoAdapter.updateMany(state, updates);
            })

            .addCase(updateTaskOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(deleteTaskById.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(deleteTaskById.fulfilled, (state, action) => {
                state.isLoading = false;
                const { toDoId, taskId } = action.payload;
                const todo = state.entities[toDoId];
                if (todo) {
                    const updatedTasks = todo.tasks.filter((task) => task._id !== taskId);
                    const updatedTodo = { ...todo, tasks: updatedTasks };
                    toDoAdapter.updateOne(state, { id: toDoId, changes: updatedTodo });
                }
            })
            .addCase(deleteTaskById.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: todosPageReducer,
    actions: todosPageActions,
} = toDoListSlice;
