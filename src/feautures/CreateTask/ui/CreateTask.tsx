import { useTranslation } from 'react-i18next';
import React, { useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from 'shared/ui/Input/Input';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './CreateTask.module.scss';
import { createTask } from '../model/services/createTask';

type CreateTaskProps = {
    toDoListId: string
    className?: string
}
interface FormData {
    taskName: string
}

export const CreateTask = ({ className, toDoListId }: CreateTaskProps) => {
    const { t } = useTranslation();
    const { control, handleSubmit } = useForm<FormData>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const onSubmit = useCallback(async (data: FormData) => {
        await dispatch(createTask({ taskName: data.taskName, toDoListId }));
    }, [dispatch, toDoListId]);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classNames(cls.CreateTask, {}, [className])}>
            <Controller
                name="taskName"
                control={control}
                defaultValue=""
                rules={{ minLength: 2, maxLength: 50 }}
                render={({ field }) => (
                    <Input
                        {...field}
                        placeholder={t('Enter task name')}
                        onChange={(value) => field.onChange(value)}
                    />
                )}
            />
            <Button type="submit" disabled={isLoading}>
                {t('Create Task')}
            </Button>
        </form>
    );
};
