import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input from 'shared/ui/Input/Input';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import cls from './CreateToDoList.module.scss';
import { useCreateToDoMutation } from '../../../entities/ToDoList/model/services/toDoApiServices';
import { Text, TextAlign, TextTheme } from '../../../shared/ui/Text/Text';

type CreateToDoListProps = {
    className?: string
}
interface FormData {
    name: string;
}
export const CreateToDoList = ({ className }: CreateToDoListProps) => {
    const { t } = useTranslation();
    const { control, handleSubmit, reset } = useForm<FormData>();
    const [createToDo, { isLoading, isError }] = useCreateToDoMutation();

    const onSubmit = useCallback((data: FormData) => {
        createToDo(data);
        reset();
    }, [createToDo, reset]);
    return (
        <>
            {isError
            && (
                <Text
                    title={t('Something went wrong')}
                    theme={TextTheme.ERROR}
                    align={TextAlign.CENTER}
                />
            ) }
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
                <Button type="submit" disabled={isLoading}>
                    {t('Create To-Do')}
                </Button>
            </form>
        </>

    );
};
