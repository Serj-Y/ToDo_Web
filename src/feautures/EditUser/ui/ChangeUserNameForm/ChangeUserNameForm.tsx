import { useTranslation } from 'react-i18next';
import React, { memo, useCallback } from 'react';
import Input from 'shared/ui/Input/Input';
import { Button, ButtonSize } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Controller, useForm } from 'react-hook-form';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import cls from './ChangeUserNameForm.module.scss';
import { changeUserName } from '../../model/services/changeUserName/changeUserName';

export interface ChangeUserNameFormProps {
    currentName: string
    className?: string;
}

interface FormData {
    userName: string
}

const ChangeUserNameForm = memo(({ className, currentName }: ChangeUserNameFormProps) => {
    const { t } = useTranslation();
    const { control, handleSubmit, reset } = useForm<FormData>();
    const dispatch = useAppDispatch();

    const onSubmit = useCallback((data: FormData) => {
        dispatch(changeUserName({ name: data.userName }));
        reset();
    }, [dispatch, reset]);
    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cls.ChangeUserNameForm}>
            <Text title={t('Change user name')} align={TextAlign.CENTER} />
            <div className={cls.currentName}>
                <Text text={t('Current user name')} />
                <Text text={currentName} />
            </div>
            <Controller
                name="userName"
                control={control}
                defaultValue=""
                rules={{ minLength: 2, maxLength: 50 }}
                render={({ field }) => (
                    <Input
                        {...field}
                        customPlaceholder={t('Enter new user name')}
                        placeholder={t('Enter new user name')}
                        onChange={(value) => field.onChange(value)}
                        className={cls.input}
                    />
                )}
            />
            <Button type="submit" size={ButtonSize.M}>
                {t('Save changes')}
            </Button>
        </form>
    );
});
export default ChangeUserNameForm;
