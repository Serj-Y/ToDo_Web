import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback, useState } from 'react';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { classNames } from 'shared/lib/classNames/classNames';
import Input from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { initUser } from 'entities/User/model/services/initUser';
import { userReducer } from 'entities/User';
import { Simulate } from 'react-dom/test-utils';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { signInByEmail } from '../../model/services/signInByEmail/signInByEmail';
import { signInActions, signInReducer } from '../../model/slice/signInSlice';
import cls from './SignInForm.module.scss';
import { getLoginEmail } from '../../model/selectors/getLoginEmail/getLoginEmail';
import ForgotPasswordForm from '../ForgotPasswordForm/ForgotPasswordForm';
import reset = Simulate.reset;

export interface SignInFormProps {
    className?: string;
    onSuccess: () => void
}

const initialReducers: ReducersList = {
    signInForm: signInReducer,
    user: userReducer,
};
const SignInForm = memo(({ className, onSuccess }: SignInFormProps) => {
    const { t } = useTranslation();
    const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const email = useSelector(getLoginEmail);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(signInActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(signInActions.setPassword(value));
    }, [dispatch]);

    const onSignInClick = useCallback(async () => {
        const result = await dispatch(signInByEmail({ email, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, password, email, onSuccess]);

    const onForgotPasswordClick = useCallback(() => {
        dispatch(signInActions.setPassword(''));
        setIsForgotPassword((prev) => !prev);
    }, [dispatch]);
    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            {isForgotPassword && <ForgotPasswordForm setIsForgotPassword={setIsForgotPassword} email={email} />}
            {!isForgotPassword
                && (
                    <div className={classNames(cls.SignInForm, {}, [className])}>
                        <Text title={t('Sign in form')} align={TextAlign.CENTER} />
                        {error && (
                            <Text text={t('Incorrect password or username')} theme={TextTheme.ERROR} />
                        )}
                        <Input
                            type="email"
                            className={cls.input}
                            customPlaceholder={t('Email')}
                            placeholder={t('Email')}
                            autoFocus
                            onChange={onChangeUsername}
                            value={email}
                        />
                        <Input
                            type="password"
                            className={cls.input}
                            customPlaceholder={t('Password')}
                            placeholder={t('Password')}
                            onChange={onChangePassword}
                            value={password}
                        />
                        <div className={cls.buttonContainer}>
                            <Button
                                disabled={isLoading}
                                theme={ButtonTheme.OUTLINE}
                                className={cls.signInBtn}
                                onClick={onForgotPasswordClick}
                            >
                                {t('Forgot password')}
                            </Button>
                            <Button
                                disabled={isLoading}
                                theme={ButtonTheme.OUTLINE}
                                className={cls.signInBtn}
                                onClick={onSignInClick}
                            >
                                {t('Sign in')}
                            </Button>
                        </div>
                    </div>
                )}
        </DynamicModuleLoader>
    );
});
export default SignInForm;
