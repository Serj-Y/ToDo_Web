import { lazy, FC } from 'react';
import { ChangeUserNameFormProps } from './ActivateEmailForm';

export const ActivateEmailFormAsync = lazy<FC<ChangeUserNameFormProps>>(() => import('./ActivateEmailForm'));
