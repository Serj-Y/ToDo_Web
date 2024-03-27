import { useTranslation } from 'react-i18next';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input from 'shared/ui/Input/Input';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonSize } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './CreateTask.module.scss';
import { createTask } from '../model/services/createTask';
import { Text, TextAlign, TextSize } from '../../../shared/ui/Text/Text';

type CreateTaskProps = {
    toDoListId: string
    className?: string
}
interface FormData {
    taskName: string
}

export const CreateTask = ({ className, toDoListId }: CreateTaskProps) => {
    const { t } = useTranslation();
    const { control, handleSubmit, reset } = useForm<FormData>();
    const dispatch = useAppDispatch();

    const onSubmit = useCallback((data: FormData) => {
        dispatch(createTask({ taskName: data.taskName, toDoListId }));
        reset();
    }, [dispatch, reset, toDoListId]);
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={classNames(cls.CreateTask, {}, [className])}
        >
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
            <Button type="submit" size={ButtonSize.M}>
                {t('Add Task')}
            </Button>
        </form>
    );
};
