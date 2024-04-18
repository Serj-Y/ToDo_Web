import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import React, { memo, useCallback } from 'react';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import Input from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { userReducer } from 'entities/User';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import {
    useYupValidationResolver,
} from 'shared/lib/hooks/useYupValidationResolver/useYupValidationResolver';
import cls from './SignUpForm.module.scss';
import { signUpByEmail } from '../../model/services/signUpByEmail/signUpByEmail';
import { getSignUpError } from '../../model/selectors/getSignUpError/getSignUpError';
import { getSignUpIsLoading } from '../../model/selectors/getSignUpIsLoading/getSignUpIsLoading';
import { signUpReducer } from '../../model/slice/signUpSlice';

export interface SignUpFormProps {
    className?: string;
    onSuccess: () => void
}

const initialReducers: ReducersList = {
    signUpForm: signUpReducer,
    user: userReducer,
};
interface FormData {
    name: string,
    email: string,
    password: string
}
const SignUpForm = memo(({ className, onSuccess }: SignUpFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getSignUpIsLoading);
    const error = useSelector(getSignUpError);

    const validationSchema = yup.object({
        name: yup.string()
            .required(t('This field is required')),
        email: yup.string().required(t('This field is required')).email(t('Enter valid email')),
        password: yup.string()
            .required(t('This field is required'))
            .min(8, t('Minimum 8 symbols')),
    });

    const {
        register, control, handleSubmit, formState: { errors }, reset,
    } = useForm<FormData>({
        resolver: useYupValidationResolver(validationSchema),
    });
    const onSubmit = useCallback(async (data: FormData) => {
        const result = await dispatch(signUpByEmail(data));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
        reset();
    }, [dispatch, reset, onSuccess]);
    return (
        <DynamicModuleLoader removeAfterUnmount={false} reducers={initialReducers}>
            <form
                className={classNames(cls.SignUpForm, {}, [className])}
                onSubmit={handleSubmit(onSubmit)}
            >
                <Text title={t('Sign up form')} align={TextAlign.CENTER} />
                {error && (
                    <Text text={t('Something went wrong')} theme={TextTheme.ERROR} />

                )}
                <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <>
                            <Text text={errors.name?.message} theme={TextTheme.ERROR} align={TextAlign.CENTER} />
                            <Input
                                {...field}
                                customPlaceholder={t('Name')}
                                autofocus
                                placeholder={t('Name')}
                                onChange={(value) => field.onChange(value)}
                                className={cls.input}
                                type="text"
                            />
                        </>
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <>
                            <Text text={errors.email?.message} theme={TextTheme.ERROR} align={TextAlign.CENTER} />
                            <Input
                                {...field}
                                customPlaceholder={t('Email')}
                                placeholder={t('Email')}
                                onChange={(value) => field.onChange(value)}
                                className={cls.input}
                                type="email"
                            />
                        </>
                    )}
                />
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                        <>
                            <Text text={errors.password?.message} theme={TextTheme.ERROR} align={TextAlign.CENTER} />
                            <Input
                                {...field}
                                customPlaceholder={t('Password')}
                                placeholder={t('Password')}
                                onChange={(value) => field.onChange(value)}
                                className={cls.input}
                                type="password"
                            />
                        </>
                    )}
                />
                <Button
                    disabled={isLoading}
                    theme={ButtonTheme.OUTLINE}
                    className={cls.loginBtn}
                    type="submit"
                >
                    {t('Sign up')}
                </Button>
            </form>
        </DynamicModuleLoader>
    );
});
export default SignUpForm;
