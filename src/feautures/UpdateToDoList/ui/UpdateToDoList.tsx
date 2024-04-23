import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input from 'shared/ui/Input/Input';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useUpdateToDoMutation } from 'entities/ToDoList/model/services/toDoApiServices';
import cls from './UpdateToDoList.module.scss';

type CreateToDoListProps = {
    setIsEditToDoList: React.Dispatch<React.SetStateAction<boolean>>
    toDoId: string
    currentToDoName: string
    className?: string
}
interface FormData {
    name: string;
}
export const UpdateToDoList = ({
    className, toDoId, setIsEditToDoList, currentToDoName,
}: CreateToDoListProps) => {
    const { t } = useTranslation();
    const { control, handleSubmit } = useForm<FormData>();
    const [updateTodo] = useUpdateToDoMutation();

    const onSubmit = useCallback((data: FormData) => {
        updateTodo({ name: data.name, todoId: toDoId }).unwrap(); // To access sucess and error use .unwrap()
        setIsEditToDoList(false);
    }, [setIsEditToDoList, toDoId, updateTodo]);
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className={cls.UpdateToDoList}
        >
            <Controller
                name="name"
                control={control}
                defaultValue={currentToDoName}
                rules={{ minLength: 2, maxLength: 50 }}
                render={({ field }) => (
                    <Input
                        {...field}
                        onChange={(value) => field.onChange(value)}
                        className={classNames(cls.InputWrapper, undefined, [cls.input])}
                    />
                )}
            />
            <Button
                type="submit"
            >
                {t('Change name')}
            </Button>
        </form>
    );
};
