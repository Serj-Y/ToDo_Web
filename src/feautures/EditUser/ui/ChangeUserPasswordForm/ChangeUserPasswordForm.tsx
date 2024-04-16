import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import Input from 'shared/ui/Input/Input';
import { Button, ButtonSize } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import * as yup from 'yup';
import { useYupValidationResolver } from 'shared/lib/hooks/useYupValidationResolver/useYupValidationResolver';
import cls from './ChangeUserPasswordForm.module.scss';
import { changePassword } from '../../model/services/changePassword/changePassword';

export interface ChangeUserPasswordFormProps {
    className?: string;
}

interface FormData {
    password: string,
    newPassword: string,
    repeatPassword: string
}

const ChangeUserPasswordForm = memo(({ className }: ChangeUserPasswordFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const validationSchema = yup.object({
        password: yup.string()
            .required(t('This field is required')),
        newPassword: yup.string()
            .required(t('This field is required'))
            .min(8, t('Minimum 8 symbols')),
        repeatPassword: yup.string()
            .required(t('This field is required'))
            .oneOf([yup.ref('newPassword')], t('Confirm password field does not match with new password'))
        ,
    });
    const {
        register, control, handleSubmit, formState: { errors }, reset,
    } = useForm<FormData>({
        resolver: useYupValidationResolver(validationSchema),
    });

    const onSubmit = useCallback((data: FormData) => {
        dispatch(changePassword(data));
        reset();
    }, [dispatch, reset]);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cls.ChangeUserPasswordForm}>
            <Text title={t('Change password')} align={TextAlign.CENTER} />
            <Controller
                name="password"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <>
                        <Text text={errors.password?.message} theme={TextTheme.ERROR} align={TextAlign.CENTER} />
                        <Input
                            {...field}
                            customPlaceholder={t('Enter current password')}
                            placeholder={t('Enter current password')}
                            onChange={(value) => field.onChange(value)}
                            className={cls.input}
                            type="password"
                        />
                    </>
                )}
            />
            <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                render={({ field }) => (
                    <>
                        <Text text={errors.newPassword?.message} theme={TextTheme.ERROR} align={TextAlign.CENTER} />
                        <Input
                            {...field}
                            customPlaceholder={t('Enter new password')}
                            placeholder={t('Enter new password')}
                            onChange={(value) => field.onChange(value)}
                            className={cls.input}
                            type="password"
                        />
                    </>

                )}
            />
            <Controller
                name="repeatPassword"
                control={control}
                defaultValue=""
                rules={{ minLength: 2, maxLength: 50 }}
                render={({ field }) => (
                    <>
                        <Text text={errors.repeatPassword?.message} theme={TextTheme.ERROR} align={TextAlign.CENTER} />
                        <Input
                            {...field}
                            customPlaceholder={t('Enter confirm new password')}
                            placeholder={t('Enter confirm new password')}
                            onChange={(value) => field.onChange(value)}
                            className={cls.input}
                            type="password"
                        />
                    </>
                )}
            />
            <Button type="submit" size={ButtonSize.M}>
                {t('Save changes')}
            </Button>
        </form>
    );
});
export default ChangeUserPasswordForm;
