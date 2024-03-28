import { useTranslation } from 'react-i18next';
import React, {
    Dispatch, memo, SetStateAction, useCallback, useState,
} from 'react';
import Input from 'shared/ui/Input/Input';
import { Button, ButtonSize } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextAlign } from 'shared/ui/Text/Text';
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

// enum InputType {
//     PASSWORD = 'password',
//     TEXT = 'text'
// }

const ChangeUserPasswordForm = memo(({ className }: ChangeUserPasswordFormProps) => {
    const { t } = useTranslation();
    const { control, handleSubmit, reset } = useForm<FormData>();
    // const [inputType, setInputType] = useState<InputType>(InputType.PASSWORD);
    const [isDisableShowPasswordBtn, setIsDisableShowPasswordBtn] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    // const onPasswordShow = useCallback(() => {
    //     if (inputType === InputType.PASSWORD) {
    //         setInputType(InputType.TEXT);
    //     } else {
    //         setInputType(InputType.PASSWORD);
    //     }
    // }, [inputType]);

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
            {/* {!isDisableShowPasswordBtn && ( */}
            {/*    <Button size={ButtonSize.M} onClick={() => onPasswordShow()} disabled={isDisableShowPasswordBtn}> */}
            {/*        {t('Show password')} */}
            {/*    </Button> */}
            {/* )} */}

            <Button type="submit" size={ButtonSize.M}>
                {t('Save changes')}
            </Button>
        </form>
    );
});
export default ChangeUserPasswordForm;
