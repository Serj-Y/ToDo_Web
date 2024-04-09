import React, { Suspense } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import { Loader } from 'shared/ui/Loader/Loader';
import { ActivateEmailFormAsync } from '../ActivateEmailForm/ActivateEmailForm.async';

interface EditUserNameModalProps {
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}
export const ActivateEmailModal = ({
    className, onClose, isOpen,
}: EditUserNameModalProps) => (
    <Modal
        className={classNames('', {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <Suspense fallback={<Loader />}>
            <ActivateEmailFormAsync />
        </Suspense>
    </Modal>
);
