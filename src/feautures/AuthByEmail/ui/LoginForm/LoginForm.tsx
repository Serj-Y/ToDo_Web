import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { classNames } from 'shared/lib/classNames/classNames';
import Input from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { loginByEmail } from '../../model/services/loginByEmail/loginByEmail';
import { loginActions, loginReducer } from '../../model/slice/loginSlice';
import cls from './LoginForm.module.scss';
import { getLoginEmail } from '../../model/selectors/getLoginEmail/getLoginEmail';

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void
}

const initialReducers: ReducersList = {
    loginForm: loginReducer,
};
const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const email = useSelector(getLoginEmail);
    const password = useSelector(getLoginPassword);
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(loginActions.setUsername(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(loginActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(loginByEmail({ email, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, password, email, onSuccess]);
    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <div className={classNames(cls.LoginForm, {}, [className])}>
                <Text title={t('Auth form')} align={TextAlign.CENTER} />
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
                <Button
                    disabled={isLoading}
                    theme={ButtonTheme.OUTLINE}
                    className={cls.loginBtn}
                    onClick={onLoginClick}
                >
                    {t('Sign in')}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});
export default LoginForm;
