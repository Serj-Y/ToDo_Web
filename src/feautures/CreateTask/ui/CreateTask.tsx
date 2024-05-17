import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input from 'shared/ui/Input/Input';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonSize } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ObjectId } from 'bson';
import * as yup from 'yup';
import { useYupValidationResolver } from 'shared/lib/hooks/useYupValidationResolver/useYupValidationResolver';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import cls from './CreateTask.module.scss';
import { createTask } from '../model/services/createTask';

type CreateTaskProps = {
    toDoId: string
    className?: string
}
interface FormData {
    taskName: string
}

export const CreateTask = ({ className, toDoId }: CreateTaskProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const validationSchema = yup.object({
        taskName: yup.string()
            .required(t('This field is required')),
    });

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormData>({
        resolver: useYupValidationResolver(validationSchema),
    });

    const onSubmit = useCallback((data: FormData) => {
        if (!navigator.onLine) {
            const offlineId = new ObjectId();
            dispatch(createTask({ taskName: data.taskName, toDoId, taskId: offlineId.toString() }));
            reset();
        } else {
            dispatch(createTask({ taskName: data.taskName, toDoId }));
            reset();
        }
    }, [dispatch, reset, toDoId]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={classNames(cls.CreateTask, {}, [className])}
        >
            <Controller
                name="taskName"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <div className={cls.InputAndError}>
                        <Text text={errors.taskName?.message} theme={TextTheme.ERROR} />
                        <Input
                            {...field}
                            placeholder={t('Enter task name')}
                            onChange={(value) => field.onChange(value)}
                        />
                    </div>
                )}
            />
            <Button type="submit" size={ButtonSize.M}>
                {t('Add Task')}
            </Button>
        </form>
    );
};
