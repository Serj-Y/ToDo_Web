import {
    createEntityAdapter, createSlice, Update,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { createToDo } from 'feautures/CreateToDo/model/services/createToDo';
import { deleteToDo } from 'feautures/DeleteToDo/model/services/deleteToDo';
import { updateToDoName } from 'feautures/UpdateToDoList/model/services/updateToDoName';
import { createTask } from 'feautures/CreateTask/model/services/createTask';
import { updateTask } from 'feautures/UpdateTask/model/services/updateTask';
import { deleteTask } from 'feautures/DeleteTask/model/services/deleteTask';
import { changeToDoOrder } from 'feautures/UpdateToDoList/model/services/changeToDoOrder';
import { changeTaskOrder } from 'feautures/UpdateTask/model/services/changeTaskOrder';
import { fetchToDo } from '../services/fetchToDo/fetchToDo';
import { ToDo } from '../types/toDo';
import { ToDoSchema } from '../types/toDoSchema';
import { TaskStatus } from '../../../Task';

const toDoAdapter = createEntityAdapter<ToDo>({
    selectId: (toDo) => toDo._id,
});

export const getToDo = toDoAdapter.getSelectors<StateSchema>(
    (state) => state.toDo || toDoAdapter.getInitialState(),
);

const toDoSlice = createSlice({
    name: 'toDoSlice',
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
        // for offline
        createToDo: (state, action) => {
            const order = state.ids.length + 1;
            const tasks: never[] = [];
            const { _id, name } = action.payload;
            toDoAdapter.addOne(state, {
                _id, tasks, name, order,
            });
        },
        updateToDoName: (state, action) => {
            const { todoId, name } = action.payload;
            toDoAdapter.updateOne(state, { id: todoId, changes: { name } });
        },
        deleteToDo: (state, action) => {
            toDoAdapter.removeOne(state, action.payload.todoId);
        },
        changeToDoOrder: (state, action) => {
            const { firstId, secondId } = action.payload;
            const firstToDo = state.entities[firstId];
            const secondToDo = state.entities[secondId];
            if (firstToDo && secondToDo) {
                const orderFirst = firstToDo.order;
                const orderSecond = secondToDo.order;
                if (orderFirst && orderSecond) {
                    toDoAdapter.updateMany(state, [
                        { id: firstToDo._id, changes: { order: secondToDo.order } },
                        { id: secondToDo._id, changes: { order: firstToDo.order } },
                    ]);
                }
            }
        },
        createTask: (state, action) => {
            const { toDoId, taskName, taskId } = action.payload;
            const toDo = state.entities[toDoId];
            if (toDo) {
                const order = toDo.tasks.length + 1;
                const updatedTodo = {
                    ...toDo,
                    tasks: [...toDo.tasks, {
                        _id: taskId,
                        name: taskName,
                        order,
                        todo: toDoId,
                        status: 'not done' as TaskStatus.NOT_DONE,
                    }],
                };
                toDoAdapter.updateOne(state, { id: toDoId, changes: updatedTodo });
            }
        },
        updateTask: (state, action) => {
            const { toDoId, taskId, updatedTask } = action.payload;
            const toDo = state.entities[toDoId];
            if (toDo) {
                const updatedTasks = toDo.tasks.map((task) => (task._id === taskId ? updatedTask : task));
                const updatedTodo = { ...toDo, tasks: updatedTasks };
                toDoAdapter.updateOne(state, { id: toDoId, changes: updatedTodo });
            }
        },
        deleteTask: (state, action) => {
            const { todoId, taskId } = action.payload;
            const todo = state.entities[todoId];
            if (todo) {
                const updatedTasks = todo.tasks.filter((task) => task._id !== taskId);
                const updatedTodo = { ...todo, tasks: updatedTasks };
                toDoAdapter.updateOne(state, { id: todoId, changes: updatedTodo });
            }
        },
        changeTaskOrder: (state, action) => {
            const { firstId, secondId, toDoId } = action.payload;
            const toDo = toDoAdapter.getSelectors().selectById(state, toDoId);
            if (toDo) {
                const { tasks } = toDo;
                const firstTask = tasks.find((task) => task._id === firstId);
                const secondTask = tasks.find((task) => task._id === secondId);

                if (firstTask && secondTask) {
                    const updatedTasks = tasks.map((task) => {
                        if (task._id === firstId) {
                            return { ...task, order: secondTask.order };
                        } if (task._id === secondId) {
                            return { ...task, order: firstTask.order };
                        }
                        return task;
                    });
                    toDoAdapter.updateOne(state, { id: toDoId, changes: { tasks: updatedTasks } });
                }
            }
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchToDo.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    toDoAdapter.removeAll(state);
                }
            })
            .addCase(fetchToDo.fulfilled, (state, action) => {
                state.isLoading = false;
                // if (action.meta.arg.replace) {
                //     toDoAdapter.setAll(state, action.payload);
                // } else {
                //     toDoAdapter.addMany(state, action.payload);
                // }
                toDoAdapter.setAll(state, action.payload);
            })
            .addCase(fetchToDo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(deleteToDo.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    toDoAdapter.removeAll(state);
                }
            })
            .addCase(deleteToDo.fulfilled, (state, action) => {
                state.isLoading = false;
                toDoAdapter.removeOne(state, action.payload._id);
            })
            .addCase(deleteToDo.rejected, (state, action) => {
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

            .addCase(changeToDoOrder.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    toDoAdapter.removeAll(state);
                }
            })
            .addCase(changeToDoOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                const { payload } = action;
                if (payload.map) {
                    const updates: Update<ToDo>[] = payload.map((toDo) => ({
                        id: toDo._id,
                        changes: toDo,
                    }));
                    toDoAdapter.updateMany(state, updates);
                }
            })
            .addCase(changeToDoOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(createToDo.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;

                if (action.meta.arg.replace) {
                    toDoAdapter.removeAll(state);
                }
            })
            .addCase(createToDo.fulfilled, (state, action) => {
                state.isLoading = false;
                toDoAdapter.addOne(state, action.payload);
            })
            .addCase(createToDo.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(createTask.pending, (state, action) => {
                state.error = undefined;
                console.log(action);
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

            .addCase(changeTaskOrder.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(changeTaskOrder.fulfilled, (state, action) => {
                state.isLoading = false;
                if (action.payload.map) {
                    const updates = action.payload.map((task) => {
                        const toDoId = task.todo;
                        const todo = state.entities[toDoId];
                        if (todo) {
                            return {
                                id: toDoId,
                                changes: {
                                    ...todo,
                                    tasks: todo.tasks.map((t) => (t._id === task._id ? task : t)),
                                },
                            };
                        }
                        return null;
                    }).filter((update) => update !== null) as Update<ToDo>[];
                    toDoAdapter.updateMany(state, updates);
                }
            })

            .addCase(changeTaskOrder.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(deleteTask.pending, (state, action) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                state.isLoading = false;
                const { toDoId, taskId } = action.payload;
                const toDo = state.entities[toDoId];
                if (toDo) {
                    const updatedTasks = toDo.tasks.filter((task) => task._id !== taskId);
                    const updatedTodo = { ...toDo, tasks: updatedTasks };
                    toDoAdapter.updateOne(state, { id: toDoId, changes: updatedTodo });
                }
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const {
    reducer: toDoReducers,
    actions: toDoActions,
} = toDoSlice;
