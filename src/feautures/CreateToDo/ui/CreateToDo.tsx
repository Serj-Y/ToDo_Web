import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Input from 'shared/ui/Input/Input';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ObjectId } from 'bson';
import * as yup from 'yup';
import { useYupValidationResolver } from 'shared/lib/hooks/useYupValidationResolver/useYupValidationResolver';
import { Text, TextTheme } from 'shared/ui/Text/Text';
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
    const dispatch = useAppDispatch();

    const validationSchema = yup.object({
        name: yup.string()
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
                render={({ field }) => (
                    <div className={cls.InputAndError}>
                        <Text text={errors.name?.message} theme={TextTheme.ERROR} />
                        <Input
                            {...field}
                            placeholder={t('Enter ToDo list name')}
                            onChange={(value) => field.onChange(value)}
                            className={cls.input}
                        />
                    </div>
                )}
            />
            <Button type="submit">
                {t('Create To-Do')}
            </Button>
        </form>
    );
};
