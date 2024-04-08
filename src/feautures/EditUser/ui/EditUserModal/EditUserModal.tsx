import React, { Suspense } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import { Loader } from 'shared/ui/Loader/Loader';
import { ChangeUserNameFormAsync } from '../ChangeUserNameForm/ChangeUserNameForm.async';
import { ChangePasswordFormAsync } from '../ChangeUserPasswordForm/ChangePasswordForm.async';
import { ActiveEmailFormAsync } from '../ActiveEmail/ActiveEmailForm.async';

interface EditUserNameModalProps {
    currentName: string
    isOpen: boolean;
    isActiveEmail: boolean
    onClose: () => void;
    className?: string;
}
export const EditUserModal = ({
    className, onClose, isOpen, currentName, isActiveEmail,
}: EditUserNameModalProps) => (
    <Modal
        className={classNames('', {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <Suspense fallback={<Loader />}>
            {!isActiveEmail
            && <ActiveEmailFormAsync />}
            <ChangeUserNameFormAsync currentName={currentName} />
            <ChangePasswordFormAsync />
        </Suspense>
    </Modal>
);
