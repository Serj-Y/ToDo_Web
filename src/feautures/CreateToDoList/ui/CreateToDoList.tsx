import { useTranslation } from 'react-i18next';
import React, { useCallback, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from 'shared/ui/Input/Input';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './CreateToDoList.module.scss';
import { createToDoList } from '../model/services/createToDoList';

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

    const onSubmit = useCallback(async (data: FormData) => {
        await dispatch(createToDoList(data));
    }, [dispatch]);
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
