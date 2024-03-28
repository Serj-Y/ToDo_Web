import React, { useCallback, useState } from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { UpdateTask } from 'feautures/UpdateTask';
import { DeleteTaskById } from 'feautures/DeleteTaskById';
import { Controller, useForm } from 'react-hook-form';
import { updateTask } from 'feautures/UpdateTask/model/services/updateTask';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './TaskItem.module.scss';
import { ToDo } from '../../../ToDoList';
import { TaskStatusSelect } from '../TaskStatusSelect/TaskStatusSelect';
import { Task } from '../../module/types/task';
import { TaskStatus } from '../../module/types/taskStatus';

type TaskProps = {
    task: Task
    toDo: ToDo
}
interface FormData {
    taskStatus: TaskStatus
}
export const TaskItem = ({ task, toDo }: TaskProps) => {
    const [isEditTask, setIsEditTask] = useState<boolean>(false);
    const setEditTaskHandler = () => setIsEditTask((prev) => !prev);
    const { control, handleSubmit } = useForm<FormData>();
    const dispatch = useAppDispatch();

    const onSubmit = useCallback((data: FormData) => {
        dispatch(updateTask({
            taskStatus: data.taskStatus, taskId: task._id, toDoId: toDo._id,
        }));
    }, [dispatch, task._id, toDo._id]);
    return (
        <div onDoubleClick={setEditTaskHandler}>
            <div key={task._id} className={cls.TaskWrapper}>
                { !isEditTask && <Text text={task.name} />}
                <div className={cls.taskStatusAnDelete}>
                    { isEditTask ? (
                        <UpdateTask
                            currentTaskName={task.name}
                            setIsEditTask={setIsEditTask}
                            taskId={task._id}
                            taskStatus={task.status}
                            toDoId={toDo._id}
                        />
                    )
                        : (
                            <>
                                <form onChange={handleSubmit(onSubmit)}>
                                    <Controller
                                        name="taskStatus"
                                        control={control}
                                        defaultValue={task.status}
                                        render={({ field }) => (
                                            <div className={cls.taskStatusAnDelete}>
                                                <TaskStatusSelect value={field.value} onChange={field.onChange} />
                                            </div>
                                        )}
                                    />
                                </form>
                                <DeleteTaskById taskIdForDelete={task._id} toDoListId={toDo._id} />
                            </>
                        )}
                </div>
            </div>
        </div>
    );
};
