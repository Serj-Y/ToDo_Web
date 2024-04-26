import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { TaskStatus, TaskStatusSelect } from 'entities/Task';
import { FaCheck } from 'react-icons/fa';
import { useUpdateTaskMutation } from 'entities/ToDoList';
import cls from './UpdateTask.module.scss';

type CreateTaskProps = {
    setIsEditTask: (value: boolean) => void
    taskId: string
    currentTaskName: string
    toDoId: string
    taskStatus: TaskStatus
    className?: string
}
interface FormData {
    taskStatus: TaskStatus
    taskName: string
}

export const UpdateTask = ({
    className, taskId, currentTaskName, setIsEditTask, toDoId, taskStatus,
}: CreateTaskProps) => {
    const { control, handleSubmit } = useForm<FormData>();
    const [updateTask] = useUpdateTaskMutation();

    const onSubmit = useCallback((data: FormData) => {
        updateTask({
            name: data.taskName, taskId, status: data.taskStatus, todoId: toDoId,
        });
        setIsEditTask(false);
    }, [setIsEditTask, taskId, toDoId, updateTask]);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cls.UpdateTask}>
            <Controller
                name="taskName"
                control={control}
                defaultValue={currentTaskName}
                rules={{ minLength: 2, maxLength: 50 }}
                render={({ field }) => (
                    <Input
                        {...field}
                        onChange={(value) => field.onChange(value)}
                        className={cls.input}
                    />
                )}
            />
            <div className={cls.taskStatusAndDelete}>
                <Controller
                    name="taskStatus"
                    control={control}
                    defaultValue={taskStatus}
                    render={({ field }) => (
                        <TaskStatusSelect value={field.value} onChange={field.onChange} />
                    )}
                />
                <Button type="submit" theme={ButtonTheme.CLEAR}>
                    <FaCheck />
                </Button>
            </div>

        </form>
    );
};
