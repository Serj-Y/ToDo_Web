import { lazy, FC } from 'react';
import { ChangeUserPasswordFormProps } from './ChangeUserPasswordForm';

export const ChangePasswordFormAsync = lazy<FC<ChangeUserPasswordFormProps>>(() => import('./ChangeUserPasswordForm'));
