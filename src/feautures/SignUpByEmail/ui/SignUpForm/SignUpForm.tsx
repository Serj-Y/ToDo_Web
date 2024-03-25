import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import Input from 'shared/ui/Input/Input';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import cls from './SignUpForm.module.scss';
import { signUpByEmail } from '../../model/services/signUpByEmail/signUpByEmail';
import { getSignUpError } from '../../model/selectors/getSignUpError/getSignUpError';
import { getSignUpIsLoading } from '../../model/selectors/getSignUpIsLoading/getSignUpIsLoading';
import { getSignUpPassword } from '../../model/selectors/getSignUpPassword/getSignUpPassword';
import { getSignUpEmail } from '../../model/selectors/getSignUpEmail/getSignUpEmail';
import { getSignUpName } from '../../model/selectors/getSignUpName/getSignUpName';
import { signUpActions, signUpReducer } from '../../model/slice/signUpSlice';

export interface SignUpFormProps {
    className?: string;
    onSuccess: () => void
}

const initialReducers: ReducersList = {
    signUpForm: signUpReducer,
};
const SignUpForm = memo(({ className, onSuccess }: SignUpFormProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const email = useSelector(getSignUpEmail);
    const userName = useSelector(getSignUpName);
    const password = useSelector(getSignUpPassword);
    const isLoading = useSelector(getSignUpIsLoading);
    const error = useSelector(getSignUpError);

    const onChangeUsername = useCallback((value: string) => {
        dispatch(signUpActions.setUsername(value));
    }, [dispatch]);

    const onChangeEmail = useCallback((value: string) => {
        dispatch(signUpActions.setEmail(value));
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
        dispatch(signUpActions.setPassword(value));
    }, [dispatch]);

    const onLoginClick = useCallback(async () => {
        const result = await dispatch(signUpByEmail({ name: userName, email, password }));
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, password, userName, email, onSuccess]);
    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <div className={classNames(cls.SignUpForm, {}, [className])}>
                <Text title={t('Sign up')} align={TextAlign.CENTER} />
                {error && (
                    <Text text={t('Incorrect password or username')} theme={TextTheme.ERROR} />

                )}
                <Input
                    type="text"
                    className={cls.input}
                    customPlaceholder={t('Name')}
                    placeholder={t('Name')}
                    autoFocus
                    onChange={onChangeUsername}
                    value={userName}
                />
                <Input
                    type="email"
                    className={cls.input}
                    customPlaceholder={t('Email')}
                    placeholder={t('Email')}
                    onChange={onChangeEmail}
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
                    {t('Sign up')}
                </Button>
            </div>
        </DynamicModuleLoader>
    );
});
export default SignUpForm;
