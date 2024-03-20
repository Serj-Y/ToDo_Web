import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from 'shared/ui/Input/Input';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { $api } from 'shared/api/api';
import cls from './CreateToDoList.module.scss';
import { todosPageActions } from '../../model/slice/toDoPageSlice';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch';

type CreateToDoListProps = {
    className?: string
}
interface FormData {
    name: string;
}
export const CreateToDoList = ({ className }: CreateToDoListProps) => {
    const { t } = useTranslation();
    const { control, handleSubmit } = useForm<FormData>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const onSubmit = async (data: FormData) => {
        setIsLoading(true);
        await $api.post('todo', {
            name: data.name,
        }).then((res) => {
            if (res.data) {
                dispatch(todosPageActions.addToDo(res.data));
                setIsLoading(false);
            }
        });
    };
    return (
        <div className={classNames(cls.CreateToDoList, {}, [className])}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{ minLength: 2, maxLength: 10 }}
                    render={({ field }) => (
                        <Input
                            {...field}
                            placeholder={t('Enter to-do lis name')}
                            onChange={(value) => field.onChange(value)}
                        />
                    )}
                />
                <Button type="submit" disabled={isLoading}>
                    {t('Create To-Do')}
                </Button>
            </form>
        </div>
    );
};
