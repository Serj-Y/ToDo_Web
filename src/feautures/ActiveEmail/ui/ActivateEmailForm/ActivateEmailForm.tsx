import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import { Button, ButtonSize } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import AuthCode from 'react-auth-code-input';
import cls from './ActivateEmailForm.module.scss';
import { emailActivate } from '../../module/services/activeEmail/emailActivate';
import { sendActiveEmailToken } from '../../module/services/sendActiveEmailToken/sendActiveEmailToken';

export interface ChangeUserNameFormProps {
    className?: string;
}

interface FormData {
    emailToken: string
}

const ActivateEmailForm = memo(({ className }: ChangeUserNameFormProps) => {
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
                        <Text text={t('Check spam mailbox')} align={TextAlign.CENTER} />
                        <Controller
                            name="emailToken"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
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
                            )}
                        />
                        { !isResendTimeout && (
                            <Button onClick={activeEmailHandler} size={ButtonSize.M}>
                                {t('Send activate code to email')}
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
export default ActivateEmailForm;
