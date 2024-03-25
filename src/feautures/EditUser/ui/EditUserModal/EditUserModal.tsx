import { Suspense } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import { Loader } from 'shared/ui/Loader/Loader';
import { ChangeUserNameFormAsync } from '../ChangeUserNameForm/ChangeUserNameForm.async';
import { ChangePasswordFormAsync } from '../ChangeUserPasswordForm/ChangePasswordForm.async';

interface EditUserNameModalProps {
    currentName: string
    isOpen: boolean;
    onClose: () => void;
    className?: string;
}
export const EditUserModal = ({
    className, onClose, isOpen, currentName,
}: EditUserNameModalProps) => (
    <Modal
        className={classNames('', {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <Suspense fallback={<Loader />}>
            <ChangeUserNameFormAsync currentName={currentName} />
            <ChangePasswordFormAsync currentName={currentName} />
        </Suspense>
    </Modal>
);
