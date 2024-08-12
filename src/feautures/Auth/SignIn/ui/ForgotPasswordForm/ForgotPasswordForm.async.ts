import { lazy, FC } from 'react';
import { ForgotPasswordFormProps } from './ForgotPasswordForm';

export const ForgotPasswordFormAsync = lazy<FC<ForgotPasswordFormProps>>(() => import('./ForgotPasswordForm'));
