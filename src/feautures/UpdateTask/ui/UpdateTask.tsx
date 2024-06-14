import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Task, TaskStatus, TaskStatusSelect } from 'entities/Task';
import { FaCheck } from 'react-icons/fa';
import cls from './UpdateTask.module.scss';
import { updateTask } from '../model/services/updateTask';

type UpdateTaskProps = {
    setIsEditTask: (value: boolean) => void
    taskId: string
    currentTaskName: string
    toDoId: string
    taskStatus: TaskStatus
    task: Task
}
interface FormData {
    taskStatus: TaskStatus
    taskName: string
}

export const UpdateTask = ({
    taskId, currentTaskName, setIsEditTask, toDoId, taskStatus, task,
}: UpdateTaskProps) => {
    const { control, handleSubmit } = useForm<FormData>();
    const dispatch = useAppDispatch();
    const onSubmit = useCallback((data: FormData) => {
        dispatch(updateTask({
            taskStatus: data.taskStatus, taskName: data.taskName, taskId, toDoId, task,
        }));
        setIsEditTask(false);
    }, [dispatch, setIsEditTask, task, taskId, toDoId]);
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
