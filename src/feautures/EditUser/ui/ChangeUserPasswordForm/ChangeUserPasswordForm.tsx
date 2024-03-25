import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import Input from 'shared/ui/Input/Input';
import { Button, ButtonSize } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import cls from './ChangeUserPasswordForm.module.scss';
import { changeUserName } from '../../model/services/changeUserName/changeUserName';
import { changePassword } from '../../model/services/changePassword/changePassword';

export interface ChangeUserPasswordFormProps {
    currentName: string
    className?: string;
}

interface FormData {
    password: string,
    newPassword: string,
    repeatPassword: string
}

const ChangeUserPasswordForm = memo(({ className, currentName }: ChangeUserPasswordFormProps) => {
    const { t } = useTranslation();
    const { control, handleSubmit } = useForm<FormData>();
    const dispatch = useAppDispatch();

    const onSubmit = useCallback((data: FormData) => {
        dispatch(changePassword(data));
    }, [dispatch]);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cls.ChangeUserPasswordForm}>
            <Text title={t('Change password')} align={TextAlign.CENTER} />
            <div className={cls.currentName}>
                <Text text={t('Current user name')} />
                <Text text={currentName} />
            </div>
            <Controller
                name="password"
                control={control}
                defaultValue=""
                rules={{ minLength: 2, maxLength: 50 }}
                render={({ field }) => (
                    <Input
                        {...field}
                        customPlaceholder={t('Enter current password')}
                        placeholder={t('Enter current password')}
                        onChange={(value) => field.onChange(value)}
                        className={cls.input}
                        type="password"
                    />
                )}
            />
            <Controller
                name="newPassword"
                control={control}
                defaultValue=""
                rules={{ minLength: 2, maxLength: 50 }}
                render={({ field }) => (
                    <Input
                        {...field}
                        customPlaceholder={t('Enter new password')}
                        placeholder={t('Enter new password')}
                        onChange={(value) => field.onChange(value)}
                        className={cls.input}
                        type="password"
                    />
                )}
            />
            <Controller
                name="repeatPassword"
                control={control}
                defaultValue=""
                rules={{ minLength: 2, maxLength: 50 }}
                render={({ field }) => (
                    <Input
                        {...field}
                        customPlaceholder={t('Enter confirm new password')}
                        placeholder={t('Enter confirm new password')}
                        onChange={(value) => field.onChange(value)}
                        className={cls.input}
                        type="password"
                    />
                )}
            />
            <Button type="submit" size={ButtonSize.M}>
                {t('Save changes')}
            </Button>
        </form>
    );
});
export default ChangeUserPasswordForm;
