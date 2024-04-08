import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import Input from 'shared/ui/Input/Input';
import { Button, ButtonSize } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import cls from './ActiveEmailForm.module.scss';
import { sendActiveEmailToken } from '../../model/services/sendActiveEmailToken/sendActiveEmailToken';
import { emailActivate } from '../../model/services/activeEmail/emailActivate';

export interface ChangeUserNameFormProps {
    className?: string;
}

interface FormData {
    emailToken: string
}

const ActiveEmailForm = memo(({ className }: ChangeUserNameFormProps) => {
    const { t } = useTranslation();
    const { control, handleSubmit, reset } = useForm<FormData>();
    const dispatch = useAppDispatch();
    const [isEnterCode, setEnterCode] = useState<boolean>(false);
    const [isResendTimeout, setIsReSendTimeout] = useState<boolean>(false);

    const activeEmailHandler = () => {
        dispatch(emailActivate());
        setEnterCode(true);
        setIsReSendTimeout(true);
        setTimeout(() => {
            setIsReSendTimeout(false);
        }, 60000);
    };

    const onSubmit = useCallback((data: FormData) => {
        reset();
        setEnterCode(false);
        dispatch(sendActiveEmailToken(data));
    }, [dispatch, reset]);

    return (
        <div>
            {!isEnterCode
            && (
                <div className={cls.EnterConfirmCodeForm}>
                    <Text title={t('Active email')} align={TextAlign.CENTER} />
                    <Button onClick={activeEmailHandler} size={ButtonSize.M}>
                        {t('Send activate code to email')}
                    </Button>
                </div>

            )}

            {isEnterCode
                && (
                    <form onSubmit={handleSubmit(onSubmit)} className={cls.EnterConfirmCodeForm}>
                        <Text title={t('Active email')} align={TextAlign.CENTER} />
                        <Controller
                            name="emailToken"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    customPlaceholder={t('Enter code from email')}
                                    placeholder={t('Enter code from email')}
                                    onChange={(value) => field.onChange(value)}
                                    className={cls.input}
                                    type="text"
                                />
                            )}
                        />
                        { !isResendTimeout && (
                            <Button onClick={activeEmailHandler} size={ButtonSize.M}>
                                {t('Send active code to email')}
                            </Button>
                        ) }

                        <Button type="submit" size={ButtonSize.M}>
                            {t('Send confirm code')}
                        </Button>
                    </form>
                )}
        </div>

    );
});
export default ActiveEmailForm;
