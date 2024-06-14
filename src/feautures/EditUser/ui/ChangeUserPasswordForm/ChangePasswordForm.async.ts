import { lazy, FC } from 'react';

export const ChangePasswordFormAsync = lazy<FC>(() => import('./ChangeUserPasswordForm'));
