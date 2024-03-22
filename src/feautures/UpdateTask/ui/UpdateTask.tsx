import { useTranslation } from 'react-i18next';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input from 'shared/ui/Input/Input';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonSize } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { TaskStatus, TaskStatusSelect } from 'entities/TaskStatus';
import cls from './UpdateTask.module.scss';
import { updateTask } from '../model/services/updateTask';

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
    const { t } = useTranslation();
    const { control, handleSubmit } = useForm<FormData>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const onSubmit = useCallback(async (data: FormData) => {
        setIsLoading(true);
        await dispatch(updateTask({
            taskStatus: data.taskStatus, taskName: data.taskName, taskId, toDoId,
        }))
            .then(() => {
                setIsEditTask(false);
                setIsLoading(false);
            });
    }, [dispatch, setIsEditTask, taskId, toDoId]);
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
            <div className={cls.taskStatusAnDelete}>
                <Controller
                    name="taskStatus"
                    control={control}
                    defaultValue={taskStatus}
                    render={({ field }) => (
                        <TaskStatusSelect {...field} value={field.value} onChange={(value) => field.onChange(value)} />
                    )}
                />
                <Button type="submit" disabled={isLoading} size={ButtonSize.M}>
                    {t('✓')}
                </Button>
            </div>
        </form>
    );
};
