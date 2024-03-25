import { lazy, FC } from 'react';
import { ChangeUserNameFormProps } from './ChangeUserNameForm';

export const ChangeUserNameFormAsync = lazy<FC<ChangeUserNameFormProps>>(() => import('./ChangeUserNameForm'));
