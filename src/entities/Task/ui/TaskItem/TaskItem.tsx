import React, { memo, useCallback, useState } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { UpdateTask } from 'feautures/UpdateTask';
import { DeleteTask } from 'feautures/DeleteTask';
import { Controller, useForm } from 'react-hook-form';
import { DraggableWrapper } from 'widgets/DraggableWrapper';
import cls from './TaskItem.module.scss';
import { TaskStatusSelect } from '../TaskStatusSelect/TaskStatusSelect';
import { Task } from '../../module/types/task';
import { ToDo, useChangeOrderTaskMutation, useUpdateTaskMutation } from '../../../ToDoList';
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
    const [updateTask] = useUpdateTaskMutation();
    const [changeOrderTask] = useChangeOrderTaskMutation();
    const setEditTaskHandler = () => setIsEditTask((prev) => !prev);
    const { control, handleSubmit } = useForm<FormData>();

    const onSubmit = useCallback((data: FormData) => {
        updateTask({
            taskId: task._id, status: data.taskStatus,
        });
    }, [task._id, updateTask]);

    const updateTaskOrder = useCallback((
        data: {
            firstId: string
            secondId: string
        },
    ) => {
        changeOrderTask({ firstTaskId: data.firstId, secondTaskId: data.secondId });
    }, [changeOrderTask]);
    return (
        <DraggableWrapper
            draggableElementId={task._id}
            updateRequest={updateTaskOrder}
            key={task._id}
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
                                <DeleteTask taskIdForDelete={task._id} toDoListId={toDo._id} />
                            </>
                        )}
                </div>
            </div>
        </DraggableWrapper>
    );
});
