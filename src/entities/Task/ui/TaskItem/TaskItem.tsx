import React, { memo, useCallback, useState } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { UpdateTask } from 'feautures/UpdateTask';
import { DeleteTaskById } from 'feautures/DeleteTaskById';
import { Controller, useForm } from 'react-hook-form';
import { updateTask } from 'feautures/UpdateTask/model/services/updateTask';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { DraggableWrapper } from 'widgets/DraggableWrapper';
import { updateTaskOrder } from 'feautures/UpdateTask/model/services/updateTaskOrder';
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
export const TaskItem = memo(({ task, toDo }: TaskProps) => {
    const [isEditTask, setIsEditTask] = useState<boolean>(false);
    const setEditTaskHandler = () => setIsEditTask((prev) => !prev);
    const { control, handleSubmit } = useForm<FormData>();
    const dispatch = useAppDispatch();

    const onSubmit = useCallback((data: FormData) => {
        dispatch(updateTask({
            taskStatus: data.taskStatus, taskId: task._id, toDoId: toDo._id, task,
        }));
    }, [dispatch, task, toDo._id]);
    return (
        <DraggableWrapper
            draggableElementId={task._id}
            updateRequest={updateTaskOrder}
            key={task._id}
            toDoId={toDo._id}
        >
            <div
                className={cls.TaskWrapper}
                key={task._id}
                onDoubleClick={setEditTaskHandler}
            >
                { !isEditTask && <Text text={task.name} />}
                <div className={cls.taskStatusAnDelete}>
                    { isEditTask ? (
                        <UpdateTask
                            currentTaskName={task.name}
                            setIsEditTask={setIsEditTask}
                            taskId={task._id}
                            taskStatus={task.status}
                            toDoId={toDo._id}
                            task={task}
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
        </DraggableWrapper>
    );
});
