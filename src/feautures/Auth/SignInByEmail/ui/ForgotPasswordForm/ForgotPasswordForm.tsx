import { useTranslation } from 'react-i18next';
import React, {
    Dispatch,
    memo, SetStateAction, useCallback, useState,
} from 'react';
import Input from 'shared/ui/Input/Input';
import { Button, ButtonSize } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import AuthCode from 'react-auth-code-input';
import * as yup from 'yup';
import {
    useYupValidationResolver,
} from 'shared/lib/hooks/useYupValidationResolver/useYupValidationResolver';
import cls from './ForgotPasswordForm.module.scss';
import { forgotPasswordByEmail } from '../../model/services/forgotPaswordByEmail/forgotPasswordByEmail';
import { sendForgotPasswordToken } from '../../model/services/sendForgotPasswordToken/sendForgotPasswordToken';

export interface ForgotPasswordFormProps {
    setIsForgotPassword: Dispatch<SetStateAction<boolean>>
    email:string
    className?: string;
}

interface FormData {
    newPassword?: string
    email?: string,
    emailCode?: string

}

const ForgotPasswordForm = memo(({ className, setIsForgotPassword, email }: ForgotPasswordFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [isSendCode, setIsSendCode] = useState<boolean>(false);

    const validationSchema = yup.object({
        newPassword: yup.string()
            .min(8, t('Minimum 8 symbols')),
        emailCode: yup.string()
            .min(5, t('This field is required')),
    });

    const {
        register, control, handleSubmit, formState: { errors }, reset,
    } = useForm<FormData>({
        resolver: useYupValidationResolver(validationSchema),
    });

    const onSubmit = useCallback((data: FormData) => {
        if (data.email && !data.emailCode) {
            dispatch(forgotPasswordByEmail(data));
            setIsSendCode(true);
        } else if (data.emailCode && data.newPassword && data.email) {
            dispatch(sendForgotPasswordToken(
                { email: data.email, forgotToken: data.emailCode, password: data.newPassword },
            ));
            setIsForgotPassword((prev) => !prev);
        }
    }, [dispatch, setIsForgotPassword]);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cls.ForgotPassword}>
            <Text title={t('Reset password')} align={TextAlign.CENTER} />
            { !isSendCode && (
                <Controller
                    name="email"
                    control={control}
                    defaultValue={email || ''}
                    render={({ field }) => (
                        <>
                            <Text text={errors.email?.message} theme={TextTheme.ERROR} align={TextAlign.CENTER} />
                            <Input
                                {...field}
                                customPlaceholder={t('Enter current email')}
                                placeholder={t('Enter current email')}
                                disabled={isSendCode}
                                onChange={(value) => field.onChange(value)}
                                className={cls.input}
                                type="email"
                            />
                        </>
                    )}
                />
            )}
            {isSendCode && (
                <>
                    <Text text={t('Check spam mailbox')} />
                    <Controller
                        name="emailCode"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <>
                                <Text
                                    text={errors.emailCode?.message}
                                    theme={TextTheme.ERROR}
                                    align={TextAlign.CENTER}
                                />
                                <div className={cls.authCodeContainer}>
                                    <Text text={t('Enter code from email')} />
                                    <AuthCode
                                        {...field}
                                        length={5}
                                        containerClassName={cls.authCodeContainer}
                                        inputClassName={cls.authCodeInput}
                                        allowedCharacters="numeric"
                                        onChange={(value) => field.onChange(value)}
                                    />
                                </div>
                            </>

                        )}
                    />
                    <Controller
                        name="newPassword"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <>
                                <Text
                                    text={errors.newPassword?.message}
                                    theme={TextTheme.ERROR}
                                    align={TextAlign.CENTER}
                                />
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
                </>

            )}
            <Button type="submit" size={ButtonSize.M} className={cls.sendCodeBtn}>
                {isSendCode ? t('Send confirm code') : t('Send code to email') }
            </Button>
        </form>
    );
});
export default ForgotPasswordForm;
