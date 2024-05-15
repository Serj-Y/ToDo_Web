import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from 'shared/ui/Input/Input';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ObjectId } from 'bson';
import cls from './CreateToDo.module.scss';
import { createToDo } from '../model/services/createToDo';

type CreateToDoProps = {
    className?: string
}
interface FormData {
    name: string;
}
export const CreateToDo = ({ className }: CreateToDoProps) => {
    const { t } = useTranslation();
    const { control, handleSubmit, reset } = useForm<FormData>();
    const dispatch = useAppDispatch();

    const onSubmit = useCallback((data: FormData) => {
        if (!navigator.onLine) {
            const offlineId = new ObjectId();
            dispatch(createToDo({ _id: offlineId.toString(), name: data.name }));
            reset();
        } else {
            dispatch(createToDo(data));
            reset();
        }
    }, [dispatch, reset]);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classNames(cls.CreateToDoList, {}, [className])}>
            <Controller
                name="name"
                control={control}
                defaultValue=""
                rules={{ minLength: 2, maxLength: 50 }}
                render={({ field }) => (
                    <Input
                        {...field}
                        placeholder={t('Enter ToDo list name')}
                        onChange={(value) => field.onChange(value)}
                        className={cls.input}
                    />
                )}
            />
            <Button type="submit">
                {t('Create To-Do')}
            </Button>
        </form>
    );
};
