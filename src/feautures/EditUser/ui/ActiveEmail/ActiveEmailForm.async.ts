import { lazy, FC } from 'react';
import { ChangeUserNameFormProps } from './ActiveEmailForm';

export const ActiveEmailFormAsync = lazy<FC<ChangeUserNameFormProps>>(() => import('./ActiveEmailForm'));
