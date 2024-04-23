import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from 'shared/ui/Input/Input';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import cls from './CreateToDoList.module.scss';
import { useCreateToDoMutation } from '../../../entities/ToDoList/model/services/toDoApiServices';

type CreateToDoListProps = {
    className?: string
}
interface FormData {
    name: string;
}
export const CreateToDoList = ({ className }: CreateToDoListProps) => {
    const { t } = useTranslation();
    const { control, handleSubmit, reset } = useForm<FormData>();
    const [createToDo] = useCreateToDoMutation();

    const onSubmit = useCallback((data: FormData) => {
        createToDo(data).unwrap();
        reset();
    }, [createToDo, reset]);
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
