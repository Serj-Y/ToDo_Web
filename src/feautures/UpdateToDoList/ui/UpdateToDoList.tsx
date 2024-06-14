import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Input from 'shared/ui/Input/Input';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './UpdateToDoList.module.scss';
import { updateToDoName } from '../model/services/updateToDoName';

type CreateToDoListProps = {
    setIsEditToDoList: React.Dispatch<React.SetStateAction<boolean>>
    toDoId: string
    currentToDoName: string
}
interface FormData {
    name: string;
}
export const UpdateToDoList = ({
    toDoId, setIsEditToDoList, currentToDoName,
}: CreateToDoListProps) => {
    const { t } = useTranslation();
    const { control, handleSubmit } = useForm<FormData>();
    const dispatch = useAppDispatch();

    const onSubmit = useCallback((data: FormData) => {
        dispatch(updateToDoName({ name: data.name, todoId: toDoId }));
        setIsEditToDoList(false);
    }, [dispatch, setIsEditToDoList, toDoId]);
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
